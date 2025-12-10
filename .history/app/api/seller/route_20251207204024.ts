import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";

export async function POST(req: Request) {
  try {
    await connectDB();

    // Obtener userId de Clerk
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Buscar usuario en tu DB usando clerkId
    const user = await User.findOne({ clerkId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // Obtener body del formulario JSON
    const body = await req.json();
    console.log(" body received:", body);
    const { shopName, bio, country, specialties, profileImage } = body;

    if (!shopName || !country || !specialties) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verificar si el seller ya existe
    const existing = await Seller.findOne({ userId: user._id });
    if (existing) {
      return NextResponse.json(
        { error: "Seller already exists" },
        { status: 400 }
      );
    }

    // Crear el seller usando user._id (ObjectId real)
    const seller = await Seller.create({
      userId: user._id, // <-- ESTE ES EL CORRECTO
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
