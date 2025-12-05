

import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";
import { Seller } from "@/lib/models/Seller";
import { User } from "@/lib/models/User";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const seller = await Seller.findOne({ userId: user._id });
    if (!seller) {
      return NextResponse.json(
        { error: "Seller profile not found" },
        { status: 404 }
      );
    }

    
    const products = await Product.find({ sellerId: seller._id }).lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

