import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clerkId } = await params;

    if (!clerkId) {
      return Response.json({ message: "User ID is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(
      {
        _id: user._id.toString(),
        clerkId: user.clerkId,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        phone: user.phone,
        image: user.image,
        address: user.address,
        role: user.role,
        profileCompleted: user.profileCompleted,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json(
      { message: "Error fetching user data" },
      { status: 500 }
    );
  }
}
