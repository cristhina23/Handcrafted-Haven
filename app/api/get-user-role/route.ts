import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";

// /api/get-user-role?clerkId=123
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("clerkId");

  if (!clerkId) {
    return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ role: user.role }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
