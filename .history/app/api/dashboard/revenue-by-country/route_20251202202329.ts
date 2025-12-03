import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";

export async function GET() {
  try {
    await connectDB();

    // get all orders and populate the user country
    const orders = await Order.find().populate("userId", "address");

    const revenueByCountry: { [key: string]: number } = {};

    orders.forEach(order => {
      // order.userId now is a object
      const country = order.userId?.address?.country || "Unknown";
      revenueByCountry[country] = (revenueByCountry[country] || 0) + (order.grandTotal || 0);
    });

    return NextResponse.json(revenueByCountry);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching revenue by country" }, { status: 500 });
  }
}
