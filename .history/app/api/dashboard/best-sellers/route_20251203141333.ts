import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";

export async function GET() {
  try {
    await connectDB();

   // get all orders
    const orders = await Order.find().populate("items.productId", "name");

    
    const soldByProduct: Record<string, number> = {};

    orders.forEach(order => {
      order.items.forEach((item: IOrderItem & { productId?: { name?: string } }) => {
        const productName = item.productId?.name || "Unknown Product";
        soldByProduct[productName] = (soldByProduct[productName] || 0) + item.quantity;
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
