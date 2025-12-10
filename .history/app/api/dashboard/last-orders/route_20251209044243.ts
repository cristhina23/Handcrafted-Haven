import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function GET() {
  try {
    await connectDB();

    const { seller, error, status } = await getSellerFromAuth();
    if (error) return NextResponse.json({ error }, { status });

    
    const sellerOrders = await Order.find({
      "items.sellerId": seller._id
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("items.productId", "title image")
      .populate("buyerId", "fullName image")
      .lean();

    return NextResponse.json(sellerOrders);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching seller last orders" },
      { status: 500 }
    );
  }
}
