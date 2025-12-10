import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Seller } from "@/lib/models/Seller";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    await connectDB();

    const seller = await Seller.findOne({ userId });

    return NextResponse.json({ isSeller: !!seller });
  } catch (err) {
    console.error("Error checking seller:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
