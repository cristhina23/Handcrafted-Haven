import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function GET() {
  try {
    await connectDB();

    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ clerkId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const seller = await Seller.findOne({ userId: user._id });
    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    // Traemos todas las órdenes con el producto populado
    const orders = await Order.find().populate("items.productId", "title");

    // Acá guardaremos los más vendidos del seller autenticado
    const bestSellers: Record<string, number> = {};

    orders.forEach(order => {
      order.items.forEach(
        (item: IOrderItem & { productId?: { title?: string } }) => {
          
          // 🔥 Filtrar SOLO items del seller autenticado
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
