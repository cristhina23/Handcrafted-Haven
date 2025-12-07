import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";

// Function to decode Clerk proxy URL and get the real image URL
function decodeClerkImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  
  try {
    // Check if it's a Clerk proxy URL
    if (url.includes('img.clerk.com/eyJ')) {
      // Extract the base64 part after the last /
      const base64Part = url.split('/').pop();
      if (base64Part) {
        // Use Buffer for Node.js environment
        const decoded = Buffer.from(base64Part, 'base64').toString('utf-8');
        const parsed = JSON.parse(decoded);
        // Return the actual source URL
        return parsed.src || url;
      }
    }
    return url;
  } catch (error) {
    console.error('Error decoding Clerk URL:', error);
    return url;
  }
}

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

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error: Verification failed", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.deleted") {
    await connectDB();
    const { id } = evt.data;

    // Delete user from MongoDB
    const deletedUser = await User.findOneAndDelete({ clerkId: id });

    if (deletedUser) {
      console.log(`✅ User deleted from MongoDB: ${deletedUser.email}`);
    } else {
      console.log(`⚠️ User not found in MongoDB: ${id}`);
    }

    return new Response("User deleted from database", { status: 200 });
  }

  if (eventType === "user.created") {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // Decode Clerk image URL to get the real URL
    const decodedImageUrl = decodeClerkImageUrl(image_url);

    // Create user in MongoDB
    await User.create({
      clerkId: id,
      email: email_addresses[0].email_address,
      fullName: `${first_name || ""} ${last_name || ""}`.trim(),
      image: decodedImageUrl,
      profileCompleted: false,
    });

    console.log(
      `✅ User created in MongoDB: ${email_addresses[0].email_address}`
    );
    return new Response("User created in database", { status: 200 });
  }

  if (eventType === "user.updated") {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // Decode Clerk image URL to get the real URL
    const decodedImageUrl = decodeClerkImageUrl(image_url);

    // Update user in MongoDB
    await User.findOneAndUpdate(
      { clerkId: id },
      {
        email: email_addresses[0].email_address,
        fullName: `${first_name || ""} ${last_name || ""}`.trim(),
        image: decodedImageUrl,
      }
    );

    console.log(
      `✅ User updated in MongoDB: ${email_addresses[0].email_address}`
    );
    return new Response("User updated in database", { status: 200 });
  }

  return new Response("Webhook received", { status: 200 });
}
