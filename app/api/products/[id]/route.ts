import { connectDB } from "@/lib/db/db";
import "@/lib/models/Product";
import "@/lib/models/Seller";
import "@/lib/models/Category";
import { Review } from "@/lib/models/Review";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    console.log("ID recieved:", id);
    console.log("ID converted:", new mongoose.Types.ObjectId(id));


    await connectDB();

    const product = await Product.findById(id)
      .populate("sellerId", "shopName country")
      .populate("categoryId", "name")
      .lean();

    if (!product) {
      return NextResponse.json({ message: "Product not found", id }, { status: 404 });
    }

    const reviews = await Review.find({
  productId: new mongoose.Types.ObjectId(id),
})
  .sort({ createdAt: -1 })
  .limit(3)
  .lean();
  console.log("Reviews fetched:", reviews);

    return NextResponse.json({ product, reviews });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
