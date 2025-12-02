import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { BlogPost } from "@/lib/models/BlogPost";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const post = await BlogPost.findById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching blog post" },
      { status: 500 }
    );
  }
}
