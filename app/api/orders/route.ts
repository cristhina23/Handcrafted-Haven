/* eslint-disable @typescript-eslint/no-explicit-any */

import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { NextResponse } from "next/server";
import { getSellerFromAuth } from "@/lib/scripts/getSeller";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";


export async function GET(req: Request) {
  try {
    const { seller, error, status } = await getSellerFromAuth();
    if (error) return NextResponse.json({ error }, { status });

    await connectDB();
    const orders = await Order.find({ "items.sellerId": seller._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.productId",
        select: "title images variants",
      })
      .populate({
        path: "buyerId",
        select: "fullName image address email phone",
      })
      .lean();

    const filteredOrders = orders
      .map((order: any) => ({
        ...order,
        items: order.items.filter(
          (item: any) => String(item.sellerId) === String(seller._id)
        ),
      }))
      .filter((order: any) => order.items.length > 0);

    return NextResponse.json({ orders: filteredOrders });
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch seller orders" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    await connectDB();

    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ clerkId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { items, shippingInfo, shippingCost, total } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain items" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      buyerId: user._id, 
      items: items.map((item: any) => ({
        productId: item.productId,
        sellerId: item.sellerId,
        quantity: item.quantity,
        price: item.price,
        priceAtPurchase: item.price,
        subtotal: item.price * item.quantity,
      })),
      shippingInfo: shippingInfo || {},
      shippingCost: shippingCost || 0,
      total,
      status: "pending",
    });

    return NextResponse.json({ order }, { status: 201 });

  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
