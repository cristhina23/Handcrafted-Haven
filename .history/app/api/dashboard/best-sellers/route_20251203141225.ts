import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";

export async function GET() {
  try {
    await connectDB();

    // Traemos todas las órdenes con los productos poblados
    const orders = await Order.find().populate("items.productId", "name");

    // Objeto para acumular la cantidad vendida por producto
    const soldByProduct: { [key: string]: number } = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        const productName = item.productId?.name || "Unknown Product";
        soldByProduct[productName] =
          (soldByProduct[productName] || 0) + (item.quantity || 0);
      });
    });

    return NextResponse.json(soldByProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching sold products" },
      { status: 500 }
    );
  }
}
