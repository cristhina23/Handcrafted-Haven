import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const orders = await Order.find({ buyerId: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.productId",
        select: "title images variants",
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
