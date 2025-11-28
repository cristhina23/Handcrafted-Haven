import { connectDB } from "./db";
import { Review } from "../models/Review";
import { User } from "../models/User";
import { Seller } from "../models/Seller";
import { Product } from "../models/Product";

export async function getReviews() {
    try {
        await connectDB();
        const ensureLoaded = [User.modelName, Product.modelName, Seller.modelName ];
        const reviews = await Review.find()
            .populate("userId")
            .populate("productId")
            .populate("sellerId")
            .sort({ rating: -1 }).limit(10)
        
        if (!reviews || reviews.length === 0) {
            throw new Error("No Reviews Found")
        }
        return reviews;
    } catch (error) {
        console.log("Gell all review", error);
        throw new Error("Request Failed!")
    }
}