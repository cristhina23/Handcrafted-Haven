import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";

export async function GET() {
  try {
    await connectDB();

    const lastOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("items.productId", "title")
      .lean();

    return NextResponse.json(lastOrders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching last orders" },
      { status: 500 }
    );
  }
}