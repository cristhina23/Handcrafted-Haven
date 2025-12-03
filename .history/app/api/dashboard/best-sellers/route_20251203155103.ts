import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";
import { Product, IProduct } from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();

    // Explicitly type the result after populate + lean
    type PopulatedOrder = {
      items: (IOrderItem & { productId?: Pick<IProduct, "title"> })[];
    };

    const orders: PopulatedOrder[] = await Order.find()
      .populate<{ items: (IOrderItem & { productId?: IProduct })[] }>(
        "items.productId",
        "title"
      )
      .lean();

    const bestSellers: Record<string, number> = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        const productName = item.productId?.title || "Unknown Product";
        bestSellers[productName] = (bestSellers[productName] || 0) + item.quantity;
      });
    });

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
