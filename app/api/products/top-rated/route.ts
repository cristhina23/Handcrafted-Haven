import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Product } from "@/lib/models/Product";

interface PopulatedProduct {
  _id: string;
  sellerId: { _id: string; shopName: string } | string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    await connectDB();

    // look for products with 5 stars
    const products = await Product.find({ rating: 5 })
      .populate("sellerId", "shopName")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    // Transform to include sellerName
    const productsWithSeller = products.map((product: PopulatedProduct) => ({
      ...product,
      sellerName:
        (typeof product.sellerId === "object" && product.sellerId?.shopName) ||
        "Unknown Seller",
      sellerId:
        (typeof product.sellerId === "object" && product.sellerId?._id) ||
        product.sellerId,
    }));

    return NextResponse.json(productsWithSeller);
  } catch (error) {
    console.error("Error fetching top-rated products:", error);
    return NextResponse.json(
      { error: "Failed to fetch top-rated products" },
      { status: 500 }
    );
  }
}
