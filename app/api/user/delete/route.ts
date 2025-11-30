import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";

export async function DELETE(req: NextRequest) {
  try {
    const { clerkId } = await req.json();

    if (!clerkId) {
      return NextResponse.json(
        { success: false, message: "clerkId is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const deletedUser = await User.findOneAndDelete({ clerkId });

    if (deletedUser) {
      return NextResponse.json({
        success: true,
        message: "User deleted from database",
        user: deletedUser,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting user" },
      { status: 500 }
    );
  }
}
