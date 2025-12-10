// app/api/orders/route.ts
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { Seller } from "@/lib/models/Seller";
import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const seller = await Seller.findOne({ userId: user._id });
    if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    // Buscar órdenes que tengan items de este seller y popular producto y buyer
    const orders = await Order.find({ "items.sellerId": seller._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.productId",
        select: "title images",
      })
      .populate({
        path: "buyerId",
        select: "fullName image",
      })
      .lean();

    
    const filteredOrders = orders.map((order: any) => ({
      ...order,
      items: order.items.filter((item: any) => item.sellerId.toString() === seller._id.toString())
    }));

    return NextResponse.json({ orders: filteredOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
