

import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const seller = await Seller.findOne({ userId: user._id });
    if (!seller) {
      return NextResponse.json(
        { error: "Seller profile not found" },
        { status: 404 }
      );
    }

    const products = await Product.find({ sellerId: userId }).lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
