// app/api/seller/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("BODY FINAL:", body);

    const { shopName, bio, country, specialties, profileImage } = body;

    if (!shopName || !bio || !country || !specialties || !profileImage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json(
        { error: "User not found in DB" },
        { status: 404 }
      );
    }

    const existingSeller = await Seller.findOne({ userId: user._id });

    if (existingSeller) {
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
      { message: "Seller created successfully", seller },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Seller Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
