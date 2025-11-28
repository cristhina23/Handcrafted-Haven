import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Review } from "@/lib/models/Review";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    await connectDB();

    const reviews = await Review.find({ productId: params.productId })
      .sort({ createdAt: -1 }) 
      .limit(3)
      .lean();

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
