import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";
import mongoose from "mongoose";

// ======================
//   GET - GET SELLER
// ======================
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    const seller = await Seller.findById(id).lean();

    if (!seller) {
      return NextResponse.json(
        { error: "Seller not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ seller });
  } catch (error) {
    console.error("GET Seller Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// ======================
//   POST - CREATE SELLER
// ======================
export async function POST(req: Request) {
  try {
    await connectDB();

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { shopName, bio, country, specialties, profileImage } = body;

    // VALIDACIÓN: Usuario en DB
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // VALIDACIÓN: Ya es seller
    const existingSeller = await Seller.findOne({ userId: user._id });
    if (existingSeller) {
      return NextResponse.json(
        { error: "Seller profile already exists" },
        { status: 400 }
      );
    }

    // CREAR SELLER
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

// ======================
//   PUT - UPDATE SELLER
// ======================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const seller = await Seller.findById(id);
    if (!seller) {
      return NextResponse.json(
        { error: "Seller not found" },
        { status: 404 }
      );
    }

    // VALIDACIÓN: Solo el dueño puede editar su Seller
    if (seller.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const updatedSeller = await Seller.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json({
      message: "Seller updated successfully",
      seller: JSON.parse(JSON.stringify(updatedSeller)),
    });
  } catch (error) {
    console.error("PUT Seller Error:", error);
    return NextResponse.json(
      { error: "Failed to update seller" },
      { status: 500 }
    );
  }
}

// ======================
//   DELETE - REMOVE SELLER
// ======================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const seller = await Seller.findById(id);
    if (!seller) {
      return NextResponse.json(
        { error: "Seller not found" },
        { status: 404 }
      );
    }

    // Validación de dueño
    if (seller.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    await Seller.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Seller deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Seller Error:", error);
    return NextResponse.json(
      { error: "Failed to delete seller" },
      { status: 500 }
    );
  }
}
