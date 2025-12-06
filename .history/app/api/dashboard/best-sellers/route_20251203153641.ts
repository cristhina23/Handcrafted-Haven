import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();

    // Traemos todas las órdenes y hacemos populate de productId en los items
    const orders = await Order.find()
      .populate({ path: "items.productId", select: "title" })
      .lean();

    // Contamos cuántas veces se vendió cada producto
    const bestSellers: Record<string, number> = {};

    orders.forEach(order => {
      order.items.forEach(
        (item: IOrderItem & { productId?: { title?: string } }) => {
          const productName = item.productId?.title || "Unknown Product";
          bestSellers[productName] = (bestSellers[productName] || 0) + item.quantity;
        }
      );
    });

    // Ordenar de mayor a menor por defecto
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
