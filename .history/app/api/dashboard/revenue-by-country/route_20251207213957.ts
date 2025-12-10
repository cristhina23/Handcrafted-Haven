import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { Seller } from "@/lib/models/Seller";
import { User } from "@/lib/models/User";

export async function GET() {
  try {
    await connectDB();

    // Obtener vendedor autenticado
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

    // Traemos todas las órdenes con buyerId poblado
    const orders = await Order.find().populate("buyerId", "address").lean();

    const revenueByCountry: { [key: string]: number } = {};

    // Iteramos solo los items de este vendedor
    orders.forEach(order => {
      order.items.forEach((item: { sellerId: { toString: () => any; }; subtotal: any; }) => {
        if (item.sellerId.toString() === seller._id.toString()) {
          const country = order.buyerId?.address?.country || "Unknown";
          revenueByCountry[country] = (revenueByCountry[country] || 0) + (item.subtotal || 0);
        }
      });
    });

    return NextResponse.json(revenueByCountry);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching revenue by country" },
      { status: 500 }
    );
  }
}
