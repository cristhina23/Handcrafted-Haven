import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";

export async function GET() {
  try {
    await connectDB();

    const { userId: clerkId } = await auth();

    if (!clerkId) {
      
    }

    // populate buyerId (que referencia a User)
    const orders = await Order.find().populate("buyerId", "address");
    
    const revenueByCountry: { [key: string]: number } = {};

    orders.forEach(order => {
      const country = order.buyerId?.address?.country || "Unknown";
      revenueByCountry[country] =
        (revenueByCountry[country] || 0) + (order.grandTotal || 0);
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
