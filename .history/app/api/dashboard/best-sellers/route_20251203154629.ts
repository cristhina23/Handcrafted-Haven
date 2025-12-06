import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";
import { Product, IProduct } from "@/lib/models/Product";

export async function GET() {
  try {
    // Connect to DB
    await connectDB();

    // Fetch orders and populate productId to get product title
    const orders = await Order.find()
      .populate<{ items: (IOrderItem & { productId: IProduct })[] }>(
        "items.productId",
        "title"
      )
      .lean();

    // Count quantity sold for each product
    const bestSellers: Record<string, number> = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        const productName = item.productId?.title || "Unknown Product";
        bestSellers[productName] = (bestSellers[productName] || 0) + item.quantity;
      });
    });

    // Sort by quantity descending
    const sortedBestSellers = Object.fromEntries(
      Object.entries(bestSellers).sort(([, a], [, b]) => b - a)
    );

    return NextResponse.json(sortedBestSellers);
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return NextResponse.json(
      { error: "Error fetching best sellers" },
      { status: 500 }
    );
  }
}
