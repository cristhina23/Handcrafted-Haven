import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return Response.json(
        { message: "User not found in database" },
        { status: 404 }
      );
    }

    // Retornar todos los datos del usuario
    return Response.json(
      {
        success: true,
        user: {
          _id: user._id,
          clerkId: user.clerkId,
          email: user.email,
          fullName: user.fullName,
          username: user.username,
          phone: user.phone,
          image: user.image,
          address: user.address,
          profileCompleted: user.profileCompleted,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return Response.json(
      { message: "Error fetching user data" },
      { status: 500 }
    );
  }
}
