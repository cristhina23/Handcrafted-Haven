import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";


export async function GET() {
  try {
    await connectDB();

   // get all orders and populate productId to get product name
    const orders = await Order.find().populate("items.productId", "title");

    // Here we count how many times each product was sold
    const bestSellers: Record<string, number> = {};

      // Loop through the orders 
    orders.forEach(order => {
      // Loop through the items
      order.items.forEach((item: IOrderItem & { productId?: { title?: string } }) => {
        const productName = item.productId?.title || "Unknown Product";
        bestSellers[productName] = (bestSellers[productName] || 0) + item.quantity;
      });
    });
     console.log(bestSellers);
    return NextResponse.json(bestSellers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching sold products" },
      { status: 500 }
    );
  }
}
