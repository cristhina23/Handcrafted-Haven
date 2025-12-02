import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

interface Params {
  clerkId: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    await connectDB();

    const { clerkId } = params;
    if (!clerkId) {
      return NextResponse.json({ error: "clerkId required" }, { status: 400 });
    }

    const user = await User.findOne({ clerkId });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const seller = await Seller.findOne({ userId: user._id }).lean();
    if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    return NextResponse.json({ seller }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
