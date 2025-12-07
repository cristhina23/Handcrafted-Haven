import { auth, clerkClient } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";

// Function to decode Clerk proxy URL
function decodeClerkImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  
  try {
    if (url.includes('img.clerk.com/eyJ')) {
      const base64Part = url.split('/').pop();
      if (base64Part) {
        // Use Buffer for Node.js environment
        const decoded = Buffer.from(base64Part, 'base64').toString('utf-8');
        const parsed = JSON.parse(decoded);
        return parsed.src || url;
      }
    }
    return url;
  } catch (error) {
    console.error('Error decoding Clerk URL:', error);
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
    
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get fresh data from Clerk
    const clerk = await clerkClient();
    const clerkUser = await clerk.users.getUser(userId);
    
    // Decode the Clerk image URL
    const decodedUrl = decodeClerkImageUrl(clerkUser.imageUrl);
    
    // Update the user with the decoded URL
    await User.findOneAndUpdate(
      { clerkId: userId },
      { image: decodedUrl }
    );

    return NextResponse.json({ 
      success: true,
      oldUrl: user.image,
      newUrl: decodedUrl,
      clerkUrl: clerkUser.imageUrl
    });
  } catch (error) {
    console.error("Error fixing image:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
