import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();

    // Get all orders and populate productId to get product title
    const orders = await Order.find()
      .populate({ path: "items.productId", select: "title" })
      .lean();

    // Count how many times each product was sold
    const bestSellers: Record<string, number> = {};

    orders.forEach(order => {
      order.items.forEach(
        (item: IOrderItem & { productId?: { title?: string } }) => {
          const productTitle = item.productId?.title || "Unknown Product";
          bestSellers[productTitle] = (bestSellers[productTitle] || 0) + item.quantity;
        }
      );
    });

    // Sort by quantity descending by default
    const sortedBestSellers = Object.fromEntries(
      Object.entries(bestSellers).sort(([, a], [, b]) => b - a)
    );

    return NextResponse.json(sortedBestSellers);
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return NextResponse.json(
      { error: "Error fetching sold products" },
      { status: 500 }
    );
  }
}
