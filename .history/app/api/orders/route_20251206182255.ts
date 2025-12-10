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

    const seller = await Seller.findOne({ userId: userId }); // tu Clerk userId
    if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    // Buscar órdenes que tengan items de este seller y popular producto y buyer
    const orders = await Order.find({ "items.sellerId": seller._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.productId",
        select: "title images price",
      })
      .populate({
        path: "buyerId",
        select: "fullname",
      })
      .lean();

    // Mapear solo items del vendedor logueado
    const filteredOrders = orders.map((order: any) => {
      const sellerItems = order.items
        .filter((item: any) => item.sellerId.toString() === seller._id.toString())
        .map((item: any) => ({
          productTitle: item.productId?.title || "No title",
          productImage: item.productId?.images?.[0] || "",
          price: item.priceAtPurchase,
          quantity: item.quantity,
          subtotal: item.subtotal,
        }));

      const total = sellerItems.reduce((sum: any, item: { subtotal: any; }) => sum + item.subtotal, 0);

      return {
        _id: order._id,
        buyerName: order.buyerId?.fullname || "No name",
        items: sellerItems,
        total,
        status: order.status,
        createdAt: order.createdAt,
      };
    });

    return NextResponse.json({ orders: filteredOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
