// app/api/dashboard/best-sellers/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";
import { IProduct } from "@/lib/models/Product";

// Type for a populated item
interface PopulatedOrderItem extends IOrderItem {
  productId?: Pick<IProduct, "title">;
}

// Type for a populated order
interface PopulatedOrder {
  items: PopulatedOrderItem[];
}

export async function GET() {
  try {
    await connectDB();

    // Fetch last orders with populated product titles
    const orders = await Order.find()
      .populate<{ items: PopulatedOrderItem[] }>("items.productId", "title")
      .lean();

    // Initialize best sellers map
    const bestSellers: Record<string, number> = {};

    // Loop through orders safely
    orders.forEach((order: PopulatedOrder) => {
      order.items.forEach(item => {
        const productName = item.productId?.title || "Unknown Product";
        bestSellers[productName] = (bestSellers[productName] || 0) + item.quantity;
      });
    });

    return NextResponse.json(bestSellers);
  } catch (erro
