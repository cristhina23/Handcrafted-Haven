import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function POST(req: Request) {
  try {
    await connectDB();

    
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

   
    const body = await req.json();
    console.log(" body received:", body);
    const { shopName, bio, country, specialties, profileImage } = body;

    if (!shopName || !country || !specialties) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    
    const existing = await Seller.findOne({ userId: user._id });
    if (existing) {
      return NextResponse.json(
        { error: "Seller already exists" },
        { status: 400 }
      );
    }

   
    const seller = await Seller.create({
      userId: user._id,
      shopName,
      bio,
      country,
      specialties,
      profileImage,
    });

    return NextResponse.json(
      { message: "Seller created", seller },
      { status: 201 }
    );
  } catch (error) {
    
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
