import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Review } from "@/lib/models/Review";

// GET featured/random reviews for testimonials
export async function GET() {
  try {
    await connectDB();

    // Get random reviews with good ratings (4-5 stars) for testimonials
    const reviews = await Review.aggregate([
      { $match: { rating: { $gte: 4 } } }, // Only 4-5 star reviews
      { $sample: { size: 10 } }, // Get 10 random reviews
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          comment: 1,
          rating: 1,
          createdAt: 1,
          "userId.fullName": 1,
        },
      },
    ]);

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured reviews:", error);
    return NextResponse.json(
      { message: "Error fetching reviews" },
      { status: 500 }
    );
  }
}
