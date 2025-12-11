import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";
import mongoose from "mongoose";


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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
