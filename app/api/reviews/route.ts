import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Review } from "@/lib/models/Review";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import mongoose from "mongoose";
import { updateProductRating } from "@/lib/utils/updateProductRating";

// GET all reviews for a product
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const reviews = await Review.find({
      productId: new mongoose.Types.ObjectId(productId),
    })
      .populate("userId", "fullName image")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { message: "Error fetching reviews" },
      { status: 500 }
    );
  }
}

// POST create a new review
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    await connectDB();

    // Get user from database
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { productId, sellerId, rating, comment, images } = body;

    // Validations
    if (!productId || !sellerId || !rating || !comment) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Convert IDs to ObjectId (handle both string and object formats)
    const productObjectId =
      typeof productId === "string"
        ? new mongoose.Types.ObjectId(productId)
        : productId;

    const sellerObjectId =
      typeof sellerId === "string"
        ? new mongoose.Types.ObjectId(sellerId)
        : typeof sellerId === "object" && sellerId._id
        ? new mongoose.Types.ObjectId(sellerId._id)
        : sellerId;

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      productId: productObjectId,
      userId: user._id,
    });

    if (existingReview) {
      return NextResponse.json(
        { message: "You have already reviewed this product" },
        { status: 400 }
      );
    }

    // Create review
    const newReview = await Review.create({
      productId: productObjectId,
      userId: user._id,
      sellerId: sellerObjectId,
      rating,
      comment,
      images: images || [],
    });

    // Populate user data before sending response
    const review = await Review.findById(newReview._id)
      .populate("userId", "fullName image")
      .lean();

    // Update product rating
    await updateProductRating(productObjectId);

    return NextResponse.json(
      { message: "Review created successfully", review },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { message: "Error creating review" },
      { status: 500 }
    );
  }
}
