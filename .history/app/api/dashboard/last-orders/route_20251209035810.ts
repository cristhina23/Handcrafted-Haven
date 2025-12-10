import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function GET() {
  try {
    await connectDB();

    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ clerkId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const seller = await Seller.findOne({ userId: user._id });
    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    
    const sellerOrders = await Order.find({
      "items.sellerId": seller._id
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("items.productId", "title image")
      .populate("buyerId", "fullName image")
      .lean();

    return NextResponse.json(sellerOrders);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching seller last orders" },
      { status: 500 }
    );
  }
}
