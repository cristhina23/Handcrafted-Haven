/* eslint-disable @typescript-eslint/no-explicit-any */

import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { Seller } from "@/lib/models/Seller";
import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { seller, error, status } = await getSellerFromAuth();
      if (error) return NextResponse.json({ error }, { status });

    // Buscar órdenes que tengan items de este seller y popular producto y buyer
    const orders = await Order.find({ "items.sellerId": seller._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.productId",
        select: "title images variants",
      })
      .populate({
        path: "buyerId",
        select: "fullName image address email phone ",
      })
      .lean();

    /* console.log("All fetched orders:", orders.map(o => ({ _id: o._id, items: o.items.length }))); */
    const filteredOrders = orders
    .map((order: any) => ({
      ...order,
      items: order.items.filter((item: any) => String(item.sellerId) === String(seller._id)),
    }))
    .filter((order: any) => order.items.length > 0);

    return NextResponse.json({ orders: filteredOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
