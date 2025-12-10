/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/orders/[id]/route.ts
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { Seller } from "@/lib/models/Seller";
import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { Product } from "@/lib/models/Product";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await connectDB();

    const product = await Product.findById(id)
      .populate("sellerId", "shopName")
      .populate("categoryId", "name");

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


    const user = await User.findOne({ clerkId: userId });
    const seller = await Seller.findOne({ userId: user?._id });
    if (!seller)
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    const order = await Order.findById(id);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    if ((order as any).sellerId?.toString() !== seller._id.toString()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({
      message: "Order updated successfully",
      order: JSON.parse(JSON.stringify(updatedOrder)),
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// --- DELETE: Eliminar una orden ---
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    const seller = await Seller.findOne({ userId: user?._id });
    if (!seller)
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    const order = await Order.findById(id);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    if ((order as any).sellerId?.toString() !== seller._id.toString()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Order.findByIdAndDelete(id);

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
