import { Product } from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import "@/lib/models/Product";  

export async function GET(req: NextRequest) {
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

    const orders = await Order.find({ buyerId: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.productId",
        select: "title images",
      })
      .lean();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch user orders" },
      { status: 500 }
    );
  }
}
