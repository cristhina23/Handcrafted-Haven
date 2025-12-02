import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function GET(
  req: Request,
  { params }: { params: { clerkId: string } }
) {
  try {
    await connectDB();

    const { clerkId } = params;
    if (!clerkId) return NextResponse.json({ error: "clerkId required" }, { status: 400 });

    // lokk
    const user = await User.findOne({ clerkId });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 2️⃣ Buscar seller por userId
    const seller = await Seller.findOne({ userId: user._id }).lean();
    if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    return NextResponse.json({ seller });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
