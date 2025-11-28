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
