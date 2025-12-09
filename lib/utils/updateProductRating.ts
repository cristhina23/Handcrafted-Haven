import mongoose from "mongoose";
import { Review } from "@/lib/models/Review";
import { Product } from "@/lib/models/Product";

/**
 * Update product rating and rating count based on all reviews
 * @param productId - The product ID to update
 */
export async function updateProductRating(
  productId: string | mongoose.Types.ObjectId
): Promise<void> {
  try {
    const productObjectId =
      typeof productId === "string"
        ? new mongoose.Types.ObjectId(productId)
        : productId;

    // Get all reviews for this product
    const reviews = await Review.find({ productId: productObjectId });

    // Calculate average rating
    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

    // Round to 1 decimal place
    const roundedRating = Math.round(averageRating * 10) / 10;

    // Update product with new rating and count
    await Product.findByIdAndUpdate(productObjectId, {
      rating: roundedRating,
      ratingCount: totalReviews,
    });

    console.log(
      `Product ${productId} rating updated: ${roundedRating} (${totalReviews} reviews)`
    );
  } catch (error) {
    console.error("Error updating product rating:", error);
    throw error;
  }
}
