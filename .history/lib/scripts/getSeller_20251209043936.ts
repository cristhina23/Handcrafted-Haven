import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function getSellerFromAuth() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return { error: "Not authenticated", status: 401 };
  }

  const user = await User.findOne({ clerkId });
  if (!user) {
    return { error: "User not found", status: 404 };
  }

  const seller = await Seller.findOne({ userId: user._id });
  if (!seller) {
    return { error: "Seller not found", status: 404 };
  }

  return { seller };
}
