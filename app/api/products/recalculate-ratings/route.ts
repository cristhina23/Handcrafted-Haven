import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Product } from "@/lib/models/Product";
import { updateProductRating } from "@/lib/utils/updateProductRating";
import { auth } from "@clerk/nextjs/server";

/**
 * Recalculate ratings for all products
 * This endpoint should be called once to update all existing products
 */
export async function POST() {
  try {
    // Optional: Add authentication check if you want to protect this endpoint
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get all products
    const products = await Product.find({});

    const results = [];

    for (const product of products) {
      try {
        await updateProductRating(product._id);
        results.push({
          productId: product._id,
          title: product.title,
          status: "updated",
        });
      } catch (error) {
        results.push({
          productId: product._id,
          title: product.title,
          error: error instanceof Error ? error.message : "Unknown error",
          status: "failed",
        });
      }
    }

    return NextResponse.json({
      success: true,
      totalProcessed: products.length,
      results,
    });
  } catch (error) {
    console.error("Error recalculating ratings:", error);
    return NextResponse.json(
      { error: "Failed to recalculate ratings" },
      { status: 500 }
    );
  }
}
