import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Product } from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();

    // look for products with 5 stars
    const products = await Product.find({ rating: 5 })
      .sort({ createdAt: -1 }) 
      .limit(6)
      .lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching top-rated products:", error);
    return NextResponse.json(
      { error: "Failed to fetch top-rated products" },
      { status: 500 }
    );
  }
}
