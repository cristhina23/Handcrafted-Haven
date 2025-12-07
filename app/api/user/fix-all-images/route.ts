import { auth, clerkClient } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";

// Function to decode Clerk proxy URL
function decodeClerkImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  try {
    if (url.includes("img.clerk.com/eyJ")) {
      const base64Part = url.split("/").pop();
      if (base64Part) {
        // Use Buffer for Node.js environment
        const decoded = Buffer.from(base64Part, "base64").toString("utf-8");
        const parsed = JSON.parse(decoded);
        return parsed.src || url;
      }
    }
    return url;
  } catch (error) {
    console.error("Error decoding Clerk URL:", error);
    return url;
  }
}

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get all users with potentially broken image URLs
    const users = await User.find({
      $or: [
        { image: { $regex: "img\\.clerk\\.com/eyJ" } },
        { image: { $exists: false } },
        { image: null },
      ],
    });

    const clerk = await clerkClient();
    const results = [];

    for (const user of users) {
      try {
        // Get fresh data from Clerk
        const clerkUser = await clerk.users.getUser(user.clerkId);

        // Decode the Clerk image URL
        const decodedUrl = decodeClerkImageUrl(clerkUser.imageUrl);

        // Update the user with the decoded URL
        await User.findOneAndUpdate(
          { clerkId: user.clerkId },
          {
            image: decodedUrl,
            fullName:
              `${clerkUser.firstName || ""} ${
                clerkUser.lastName || ""
              }`.trim() ||
              clerkUser.username ||
              "Anonymous",
          }
        );

        results.push({
          clerkId: user.clerkId,
          oldUrl: user.image,
          newUrl: decodedUrl,
          status: "updated",
        });
      } catch (error) {
        results.push({
          clerkId: user.clerkId,
          error: error instanceof Error ? error.message : "Unknown error",
          status: "failed",
        });
      }
    }

    return NextResponse.json({
      success: true,
      totalProcessed: users.length,
      results,
    });
  } catch (error) {
    console.error("Error fixing all images:", error);
    return NextResponse.json(
      { error: "Failed to fix images" },
      { status: 500 }
    );
  }
}
