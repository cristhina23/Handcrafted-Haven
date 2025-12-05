import { connectDB } from './db';
import { Order } from '../models/Order';


export async function getBestSellerByMonth() {
    try {
        await connectDB();
        const iniDate = new Date();
        const thirtyDaysAgo = new Date(iniDate.setDate(iniDate.getDate() - 30));
        console.log("30 days",thirtyDaysAgo)
        const bestSeller = await Order.aggregate([
            {
                $match: {
                    status: "delivered",
                    /*createdAt*/ //: //{ //$gte: //thirtyDaysAgo }
                }
            },
            {
                $project: {
                    items: 1,
                    createdAt:1
                }
            },
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.sellerId",
                    totalRevenue: { $sum: "$items.subtotal" }
                }
            },
            {
                $sort: {
                    totalRevenue: -1
                }
            }, { $limit: 1 },
            {
                $lookup: {
                    from: "sellers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "sellerdetails"
                }
            },
            {
                $unwind: "$sellerdetails"
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    storeName: "$sellerdetails.shopName",
                    storeBanner: "$sellerdetails.profileImage"
                }
            }
        ]);

        //console.log("Best Seller", bestSeller)
        if (!bestSeller || bestSeller.length === 0) return "No best seller for this month";

        return bestSeller[0];
    } catch (error) {
        console.log("Error from Get Best Seller By Month",error);
        throw new Error("Oops! Something went wrong.")
    }
}