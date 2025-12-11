import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Review } from "@/lib/models/Review";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import { updateProductRating } from "@/lib/utils/updateProductRating";

// PUT update a review
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const { id: reviewId } = await context.params;

    await connectDB();

    // Get user from database
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find review
    const review = await Review.findById(reviewId);
    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    // Check if user owns this review
    if (review.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { message: "You can only edit your own reviews" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { rating, comment, images } = body;

    // Validations
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Update review
    if (rating !== undefined) review.rating = rating;
    if (comment) review.comment = comment;
    if (images !== undefined) review.images = images;

    await review.save();

    // Populate user data before sending response
    const updatedReview = await Review.findById(review._id)
      .populate("userId", "fullName image")
      .lean();

    // Update product rating
    await updateProductRating(review.productId);

    return NextResponse.json(
      { message: "Review updated successfully", review: updatedReview },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { message: "Error updating review" },
      { status: 500 }
    );
  }
}

// DELETE a review
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const { id: reviewId } = await context.params;

    await connectDB();

    // Get user from database
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find review
    const review = await Review.findById(reviewId);
    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    // Check if user owns this review
    if (review.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { message: "You can only delete your own reviews" },
        { status: 403 }
      );
    }

    // Store productId before deleting
    const productId = review.productId;

    await Review.findByIdAndDelete(reviewId);

    // Update product rating
    await updateProductRating(productId);

    return NextResponse.json(
      { message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { message: "Error deleting review" },
      { status: 500 }
    );
  }
}
