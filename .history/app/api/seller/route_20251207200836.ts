import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    console.log("BODY RECIBIDO:", req);


     const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { shopName, bio, country, specialties, profileImage } = body;

  
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }


    const existingSeller = await Seller.findOne({ userId: user._id });
    if (existingSeller) {
      return NextResponse.json(
        { error: "Seller profile already exists" },
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
    console.error("POST Seller Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}