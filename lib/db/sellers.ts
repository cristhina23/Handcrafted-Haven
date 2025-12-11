import { connectDB } from "./db";
import { User } from "../models/User";
import { Seller } from "../models/Seller";

/******************************************************
 * Retrieve All Seller
 *****************************************************/
export async function getSellers() {
  try {
    await connectDB();
    // Only return sellers who have at least one product
    const sellersWithProducts = await Seller.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "sellerId",
          as: "products",
        },
      },
      {
        $match: {
          "products.0": { $exists: true },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $addFields: {
          userId: "$userInfo"
        }
      },
      {
        $sort: { _id: 1, rating: -1 },
      },
      {
        $limit: 10,
      },
    ]);
    if (!sellersWithProducts || sellersWithProducts.length === 0) {
      throw new Error("No sellers with products found");
    }
    return sellersWithProducts;
  } catch (error) {
    console.log("Get Sellers Error", error);
    throw new Error("Request Failed");
  }
}

/***********************************************
 *  Retrieve Seller's Details
 ************************************************/
export async function getSellerById(id: string) {
  try {
    await connectDB();

    const sellerInfo = await Seller.findById(id).populate({
      path: "userId",
      select: "fullName image",
    });

    if (!sellerInfo) {
      throw new Error("Seller not found!");
    }

    return sellerInfo;
  } catch (error) {
    console.log("Seller By ID Error: ", error);
    throw new Error("Oops! something went wrong");
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
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userdetails",
        },
      },
      {
        $unwind: "$userdetails",
      },
      {
        $project: {
          shopName: 1,
          rating: 1,
          fullName: "$userdetails.fullName",
          image: "$userdetails.image",
        },
      },
      { $sort: { rating: -1, totalReviews: -1 } },
      { $limit: 3 },
    ]);

    if (!topThree || topThree.length === 0)
      throw new Error("Sellers not found");

    return topThree;
  } catch (error) {
    console.log("Most Rated Seller", error);
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
          totalSales: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userdetails",
        },
      },
      {
        $unwind: "$userdetails",
      },
      {
        $project: {
          shopName: 1,
          fullName: "$userdetails.fullName",
          image: "$userdetails.image",
          totalSales: 1,
        },
      },
      { $sort: { totalSales: -1 } },
      { $limit: 4 },
    ]);

    if (!mostActiveSellers || mostActiveSellers.length === 0) return [];

    return mostActiveSellers;
  } catch (error) {
    console.log("Error from Most active Sellers", error);
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

      { $sort: { totalReviews: -1, rating: -1 } },

      {
        $group: {
          _id: "$specialties",
          sellerId: { $first: "$_id" },
          shopName: { $first: "$shopName" },
          rating: { $first: "$rating" },
          totalReviews: { $first: { $size: "$reviews" } },
          userId: { $first: "$userId" },
        },
      },

      {
        $project: {
          _id: "$sellerId",
          specialties: "$_id",
          shopName: 1,
          totalReviews: 1,
          userId: 1,
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userdetails",
        },
      },

      { $unwind: "$userdetails" },

      {
        $project: {
          shopName: 1,
          specialties: 1,
          fullName: "$userdetails.fullName",
          image: "$userdetails.image",
        },
      },

      { $limit: 5 },
    ]);

    if (!topSellersByCategory || topSellersByCategory.length === 0) return [];

    return topSellersByCategory;
  } catch (error) {
    console.log("Error from Get Trending Artisans", error);
    throw new Error("Oops! Something went wrong");
  }
}

/***************************************************
 * Craftmanship Spotlight (Best Craftman overall)
 ***************************************************/
export async function getBestCraftman() {
  try {
    await connectDB();

    const bestCraftMan = await Seller.aggregate([
      {
        $lookup: {
          from: "orders",
          let: { seller_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$$seller_id", "$items.sellerId"],
                },
                status: "delivered",
              },
            },
            { $unwind: "$items" },
            {
              $match: {
                $expr: { $eq: ["$items.sellerId", "$$seller_id"] },
              },
            },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$items.subtotal" },
                totalItemsSold: { $sum: "$items.quantity" },
              },
            },
          ],
          as: "salesMetrics",
        },
      },
      { $unwind: { path: "$salesMetrics", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "sellerId",
          as: "reviews",
        },
      },

      {
        $project: {
          shopName: 1,
          profileImage: 1,
          userId: 1,
          totalRevenue: { $ifNull: ["$salesMetrics.totalRevenue", 0] },
          totalItemsSold: { $ifNull: ["$salesMetrics.totalItemsSold", 0] },
          totalReviews: { $size: "$reviews" },
          avgRating: { $avg: "$reviews.rating" },
        },
      },

      {
        $project: {
          shopName: 1,
          profileImage: 1,
          userId: 1,
          craftmanScore: {
            $add: [
              { $multiply: [{ $ifNull: ["$avgRating", 0] }, 100] },
              "$totalItemsSold",
              "$totalReviews",
            ],
          },
        },
      },

      { $sort: { craftmanScore: -1 } },
      { $limit: 1 },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userdetails",
        },
      },
      { $unwind: "$userdetails" },
      {
        $project: {
          _id: 1,
          sellerName: "$userdetails.fullName",
          storeImage: "$profileImage",
          storeName: "$shopName",
          craftmanScore: 1,
        },
      },
    ]);

    const seller = bestCraftMan[0];
    console.log("Best Craftsman Result:", seller._id);

    return bestCraftMan.length > 0 ? bestCraftMan[0] : null;
  } catch (error) {
    console.error("Error from Get Best CraftMan:", error);
    throw new Error("Oops! Something went wrong.");
  }
}

/**************************************************
 *  New Arrivals (Retrieve New Sellers)
 **************************************************/
export async function getNewArrivals() {
  try {
    await connectDB();
    const newSellers = await Seller.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          id: 1,
          fullName: "$userInfo.fullName",
          image: "$userInfo.image",
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
    ]);

    return newSellers.length > 0 ? newSellers : null;
  } catch (error) {
    console.log("Error From Get New Arrivals", error);
    throw new Error("Oops! something went wrong.");
  }
}
