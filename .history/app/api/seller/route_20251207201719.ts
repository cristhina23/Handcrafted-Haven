import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function POST(req: Request) {
  try {
    await connectDB();

    // Clerk Auth
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Leer JSON correctamente
    const body = await req.json();
    console.log("BODY FINAL:", body);

     if (!body.shopName || !body.bio || !body.country || !body.specialties) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    } */

    const { shopName, bio, country, specialties, profileImage } = body;

    // Obtener usuario
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Revisar si ya existe
    const existingSeller = await Seller.findOne({ userId: user._id });

    if (existingSeller) {
      return NextResponse.json(
        { error: "Seller profile already exists" },
        { status: 400 }
      );
    }

    // Crear seller
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
