import { NextResponse } from "next/server";
import { Review } from "@/lib/models/Review";
import mongoose from "mongoose";

// Helper to connect to DB (assume handled by middleware or add here if needed)
import dbConnect from "@/lib/dbConnect";

export async function GET(
  req: Request,
  { params }: { params: { sellerId: string } }
) {
  await dbConnect();
  const { sellerId } = params;
  if (!mongoose.Types.ObjectId.isValid(sellerId)) {
    return NextResponse.json({ error: "Invalid sellerId" }, { status: 400 });
  }
  try {
    const reviews = await Review.find({ sellerId }).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
