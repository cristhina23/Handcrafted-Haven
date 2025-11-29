import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET to .env.local");
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // Conectar a MongoDB
    await connectDB();

    try {
      // Crear usuario en tu base de datos
      const newUser = await User.create({
        clerkId: id, // ID de Clerk para referencia
        email: email_addresses[0].email_address,
        fullName: `${first_name || ""} ${last_name || ""}`.trim(),
        image: image_url || "",
      });

      console.log("Usuario creado en MongoDB:", newUser);

      return new Response(
        JSON.stringify({ message: "User created", user: newUser }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error creando usuario:", error);
      return new Response("Error creating user in database", {
        status: 500,
      });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    await connectDB();

    try {
      // Actualizar usuario en tu base de datos
      const updatedUser = await User.findOneAndUpdate(
        { clerkId: id },
        {
          email: email_addresses[0].email_address,
          fullName: `${first_name || ""} ${last_name || ""}`.trim(),
          image: image_url || "",
        },
        { new: true }
      );

      console.log("Usuario actualizado en MongoDB:", updatedUser);

      return new Response(
        JSON.stringify({ message: "User updated", user: updatedUser }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      return new Response("Error updating user in database", {
        status: 500,
      });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    await connectDB();

    try {
      // Eliminar usuario de tu base de datos
      const deletedUser = await User.findOneAndDelete({ clerkId: id });

      console.log("Usuario eliminado de MongoDB:", deletedUser);

      return new Response(JSON.stringify({ message: "User deleted" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      return new Response("Error deleting user from database", {
        status: 500,
      });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
