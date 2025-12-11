import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const order = await Order.findOne({
      _id: id,
      buyerId: user._id,
    })
      .populate({
        path: "items.productId",
        select: "title images",
      })
      .lean();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order });

  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
