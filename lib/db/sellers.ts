import { connectDB } from "./db";
import { User } from "../models/User";
import { Seller } from "../models/Seller";



/******************************************************
 * Retrieve All Seller
 *****************************************************/
export async function getSellers() {
    try {
        await connectDB();
        const ensureUserLoaded = User.modelName;
        let sellers = await Seller.find().populate("userId").sort({ _id: -1 }).limit(10)
        sellers = sellers.filter(seller => seller.userId !== null);
        if(!sellers || sellers.length === 0){
            throw new Error("No sellers found");
        }
        return sellers;
    } catch (error) {
        console.log("Get Sellers Error", error)
        throw new Error("Request Failed")
    }
}

/*******************************************************
 * Most Rated Artisans
 ******************************************************/
export async function mostRatedSeller() {
    try {
        await connectDB();
        //const ensureUserLoaded = User.modelName;
        const topThree = await Seller.aggregate([
            {
                $project: {
                    shopName: 1,
                    rating: 1,
                    specialties: 1,
                    userId: 1,
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userdetails"
                }
            },
            {
                $unwind: "$userdetails"
            },
            {
                $project: {
                    shopName: 1,
                    rating: 1,
                    fullName: "$userdetails.fullName",
                    image: "$userdetails.image"
                }
            },
            { $sort: { rating: -1, totalReviews: -1 } },
            { $limit: 3 }
        ]);

        if (!topThree || topThree.length === 0) throw new Error("Sellers not found");

        return topThree;
        
    } catch (error) {
        console.log("Most Rated Seller",error)
        throw new Error("Oops something went wrong!");
    }
}

/*******************************************
 * MostActiveSellers
********************************************/
export async function getActiveSellers() {
    try {
        await connectDB();
        //const ensureUserLoaded = User.modelName;
        const mostActiveSellers = await Seller.aggregate([
            {
                $project: {
                    shopName: 1,
                    userId: 1,
                    totalSales: 1
                }
            },
            {
                $lookup:{
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userdetails"
                }
            },
            {
                $unwind: "$userdetails",
            },
            {
                $project: {
                    shopName: 1,
                    fullName: "$userdetails.fullName",
                    image: "$userdetails.image",
                    totalSales: 1
                }
            }, { $sort: { totalSales: -1} },
            {$limit:4}
        ]);

        if (!mostActiveSellers || mostActiveSellers.length === 0) return [];

        return mostActiveSellers;

    } catch (error) {
        console.log('Error from Most active Sellers', error)
        throw new Error("Oops! Something went wrong");
    }
}

/******************************************
 *  Trending Artisans By Category
*******************************************/
export async function getTrendingArtisans(Category: string[]) {
    try {
        await connectDB();
        
        const topSellersByCategory = await Seller.aggregate([

            { $match: { specialties: { $in: Category } } },            

            { $unwind: "$specialties" },
            
            { $sort: {totalReviews: -1, rating: -1 } },
            
            { $group: {
                _id: "$specialties",
                sellerId: { $first: "$_id" },
                shopName: { $first: "$shopName" },
                rating: { $first: "$rating" },
                totalReviews: { $first: { $size: "$reviews" } },
                userId: { $first: "$userId" }
            }},
            
            { $project: {
                _id: "$sellerId",
                specialties: "$_id",
                shopName: 1,
                totalReviews: 1,
                userId: 1,
            }},

            { $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userdetails"
            }},
            
            { $unwind: "$userdetails" },
            
            { $project: {
                shopName: 1,
                totalReviews: 1,
                specialties: 1,
                fullName: "$userdetails.fullName",
                image: "$userdetails.image",
            }},

            { $limit: 5 }
        ]);

        if (!topSellersByCategory || topSellersByCategory.length === 0) return [];
        
        return topSellersByCategory;

    } catch (error) {
        console.log("Error from Get Trending Artisans", error);
        throw new Error("Oops! Something went wrong");
    }
}