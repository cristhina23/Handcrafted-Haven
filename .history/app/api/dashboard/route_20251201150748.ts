import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("clerkId");

  if (!clerkId) return NextResponse.json({ error: "clerkId required" }, { status: 400 });

  // 1 look for user by clerkId
  const user = await User.findOne({ clerkId });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // 2 look for userId
  const seller = await Seller.findOne({ userId: user._id });
  if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

  return NextResponse.json({ seller });
}
