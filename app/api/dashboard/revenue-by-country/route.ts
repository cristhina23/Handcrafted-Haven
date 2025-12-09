import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";
import { getSellerFromAuth } from "@/lib/scripts/getSeller";

export async function GET() {
  try {
    await connectDB();

    const { seller, error, status } = await getSellerFromAuth();
    if (error) return NextResponse.json({ error }, { status });

    const orders = await Order.find().populate("buyerId", "address").lean();

    const revenueByCountry: { [key: string]: number } = {};

    orders.forEach(order => {
      order.items.forEach((item: IOrderItem) => {
        if (item.sellerId.toString() === seller._id.toString()) {
          const country = order.buyerId?.address?.country || "Unknown";
          revenueByCountry[country] = (revenueByCountry[country] || 0) + (item.subtotal || 0);
        }
      });
    });
    /* console.log('This is the revenueByCountry: ', revenueByCountry); */

    return NextResponse.json(revenueByCountry);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching revenue by country" },
      { status: 500 }
    );
  }
}
