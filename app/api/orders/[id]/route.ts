/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/orders/[id]/route.ts
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { Seller } from "@/lib/models/Seller";
import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;   // <-- sin await
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
    }

    const order = await Order.findById(id)
      .populate({
        path: "items.productId",
        select: "title images",
      })
      .lean();

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; 
    await connectDB();

    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await User.findOne({ clerkId: userId });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const seller = await Seller.findOne({ userId: user._id });
    if (!seller)
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    const { status } = await req.json();

    if (!status)
      return NextResponse.json({ error: "Status is required" }, { status: 400 });

    const order = await Order.findById(id);
    if (!order)
      return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const sellerHasItem = order.items.some(
      (item: any) => String(item.sellerId) === String(seller._id)
    );

    if (!sellerHasItem)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    order.status = status;
    await order.save();

    return NextResponse.json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // <-- sin await
    await connectDB();

    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await User.findOne({ clerkId: userId });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const seller = await Seller.findOne({ userId: user._id });
    if (!seller)
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    const order = await Order.findById(id);
    if (!order)
      return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const sellerHasItem = order.items.some(
      (item: any) => String(item.sellerId) === String(seller._id)
    );

    if (!sellerHasItem)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await Order.findByIdAndDelete(id);

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
