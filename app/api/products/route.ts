// app/api/products/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Product } from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().populate("sellerId", "shopName");

    // Transform products to include sellerName at root level
    const productsWithSeller = products.map((product) => {
      const productObj = product.toObject();
      return {
        ...productObj,
        sellerName: productObj.sellerId?.shopName || "Unknown Seller",
        sellerId: productObj.sellerId?._id || productObj.sellerId,
      };
    });

    return NextResponse.json(JSON.parse(JSON.stringify(productsWithSeller)));
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
