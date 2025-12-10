import { connectDB } from "./db";
import { User } from "../models/User";
import { Seller } from "../models/Seller";

export async function getSellers() {
  try {
    await connectDB();

    const ensureUserLoaded = User.modelName;

    let sellers = await Seller.find()
      .sort({ _id: -1 })
      .limit(10)
      .lean();

    if (!sellers || sellers.length === 0) {
      return []; 
    }


    sellers = sellers.filter((seller: any) => seller.userId);

    return sellers;
  } catch (error) {
    console.error("Get Sellers Error", error);
    return []; 
  }
}
