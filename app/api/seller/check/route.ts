import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user) return NextResponse.json({ isSeller: false });

    const seller = await Seller.findOne({ userId: user._id });
    return NextResponse.json({ isSeller: !!seller });
  } catch (error) {
    console.error("GET check seller Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
