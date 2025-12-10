import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function GET() {
  try {
    await connectDB();

    const { seller, error, status } = await getSellerFromAuth();
      if (error) return NextResponse.json({ error }, { status });

    
    const orders = await Order.find().populate("items.productId", "title");

    
    const bestSellers: Record<string, number> = {};

    orders.forEach(order => {
      order.items.forEach(
        (item: IOrderItem & { productId?: { title?: string } }) => {
          
          
          if (item.sellerId?.toString() !== seller._id.toString()) return;

          const productName = item.productId?.title || "Unknown Product";

          bestSellers[productName] =
            (bestSellers[productName] || 0) + (item.quantity || 0);
        }
      );
    });

    return NextResponse.json(bestSellers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching sold products" },
      { status: 500 }
    );
  }
}
