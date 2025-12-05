import { connectDB } from "./db";
import { Product } from "../models/Product";


export async function getBestMakerByproducts() {
    try {
        await connectDB();

        const initDate = new Date();
        const thirtyDay = new Date(initDate.setDate(initDate.getDate() - 30))
        console.log("30 Days: ", thirtyDay)
        const bestMaker = await Product.aggregate([
            {
                $project: {
                    sellerId: 1,
                    totalProductScore: { $multiply: ["$rating", "$ratingCount"] },
                    ratingCount: 1,
                    quantity: 1
                }
            }, {
                $group: {
                    _id: "$sellerId",
                    totalReviews: { $sum: "$ratingCount" },
                    totalScoreSum: { $sum: "$totalProductScore" },
                    totalProduct: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" }
                }
            }, {
                $project: {
                    sellerId: "$_id",
                    _id: 0,
                    totalReviews: 1,
                    totalProduct: 1,
                    totalQuantity: 1,
                    averageSellerRating: {
                        $cond: {
                            if: { $eq: ["$totalReviews", 0] },
                            then: 0,
                            else: { $divide: ["$totalScoreSum", "$totalReviews"] }
                        }
                    }
                }
            }, {
                $sort: { averageSellerRating: -1, totalReviews: -1 }
            }, { $limit: 1 },
            {
                $lookup: {
                    from: "sellers",
                    localField: "sellerId",
                    foreignField: "_id",
                    as: "sellerdetails"
                }
            },
            { $unwind: "$sellerdetails" },
            {
                $project: {
                    brandName: "$sellerdetails.shopName",
                    brandBanner: "$sellerdetails.profileImage",
                    totalProduct:1
                }
            }
        ]);
        //console.log("Best Maker: ", bestMaker)
        if (!bestMaker || bestMaker.length === 0) return [];

        return bestMaker[0];
    } catch (error) {
        console.log("Error from Best Maker by Products: ", error)
        throw new Error("Oops! something went wrong.")
    }
}