import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";


export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone || "",
      username: user.username,
      image: user.image || "",
      address: {
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zipCode: user.address?.zipCode || "",
        country: user.address?.country || "United States",
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();

    const allowedUpdates: any = {};

    if (body.fullName !== undefined) allowedUpdates.fullName = body.fullName;
    if (body.username !== undefined) allowedUpdates.username = body.username;
    if (body.phone !== undefined) allowedUpdates.phone = body.phone;
    if (body.image !== undefined) allowedUpdates.image = body.image;

    if (body.address) {
      allowedUpdates.address = {
        street: body.address.street,
        city: body.address.city,
        state: body.address.state,
        zipCode: body.address.zipCode,
        country: body.address.country,
      };
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { $set: allowedUpdates },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
