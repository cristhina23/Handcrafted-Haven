import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().populate({
      path: "buyerId",
      select: "address",
    });

    const revenueByCountry: Record<string, number> = {};

    for (const order of orders) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user = order.buyerId as any;

      const country =
        user?.address?.country && typeof user.address.country === "string"
          ? user.address.country
          : "Unknown";

      const revenue = Number(order.grandTotal) || 0;

      revenueByCountry[country] =
        (revenueByCountry[country] ?? 0) + revenue;
    }

    return NextResponse.json(revenueByCountry);
  } catch (err) {
    console.error("Error in /revenue-by-country:", err);
    return NextResponse.json(
      { error: "Error fetching revenue by country" },
      { status: 500 }
    );
  }
}
