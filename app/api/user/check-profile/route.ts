import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("clerkId");

    if (!clerkId) {
      return Response.json({ message: "clerkId is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId });

    if (!user) {
      return Response.json(
        { exists: false, profileCompleted: false },
        { status: 200 }
      );
    }

    return Response.json(
      {
        exists: true,
        profileCompleted: user.profileCompleted || false,
        user: {
          username: user.username,
          email: user.email,
          fullName: user.fullName,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking profile:", error);
    return Response.json(
      { message: "Error checking profile" },
      { status: 500 }
    );
  }
}
