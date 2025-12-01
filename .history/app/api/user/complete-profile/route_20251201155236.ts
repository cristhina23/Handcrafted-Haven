import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerkId, email, fullName, image, username, phone, address } = body;

    // Validaciones básicas
    if (!clerkId || !email || !username) {
      return Response.json(
        { message: "Missing required fields: clerkId, email, username" },
        { status: 400 }
      );
    }

    // Validar formato de username
    if (username.length < 3 || username.length > 30) {
      return Response.json(
        { message: "Username must be between 3 and 30 characters" },
        { status: 400 }
      );
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return Response.json(
        {
          message:
            "Username can only contain letters, numbers, hyphens, and underscores",
        },
        { status: 400 }
      );
    }

    // Validar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validar teléfono si existe
    if (phone && !/^[\+]?[0-9\s\-()]+$/.test(phone)) {
      return Response.json(
        { message: "Invalid phone number format" },
        { status: 400 }
      );
    }

    await connectDB();

    // Verificar si el username ya existe (pero no es el mismo usuario)
    const existingUsername = await User.findOne({
      username,
      clerkId: { $ne: clerkId },
    });
    if (existingUsername) {
      return Response.json(
        { message: "Username already taken" },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe (por clerkId o email)
    let user = await User.findOne({ $or: [{ clerkId }, { email }] });

    if (user) {
      // Actualizar usuario existente
      user.username = username;
      user.phone = phone;
      user.address = address;
      user.profileCompleted = true;
      await user.save();
    } else {
      // Crear nuevo usuario
      user = await User.create({
        clerkId,
        email,
        fullName,
        image,
        username,
        phone,
        address,
        profileCompleted: true,
        
      });
    }

    return Response.json(
      { message: "Profile completed successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error completing profile:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { message: "Error completing profile", error: errorMessage },
      { status: 500 }
    );
  }
}
