import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { BlogPost } from "@/lib/models/BlogPost";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const published = searchParams.get("published");

    // Construir filtro
    const filter: Record<string, string | boolean> = {};
    if (category) filter.category = category;
    if (published) filter.published = published === "true";

    const posts = await BlogPost.find(filter)
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      content,
      image,
      category,
      author,
      tags,
      published,
    } = body;

    // Validaciones
    if (
      !title ||
      !description ||
      !content ||
      !image ||
      !category ||
      !author?.name
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const post = await BlogPost.create({
      title,
      description,
      content,
      image,
      category,
      author,
      tags: tags || [],
      published: published || false,
    });

    return NextResponse.json(
      { success: true, message: "Blog post created", post },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { success: false, message: "Error creating blog post" },
      { status: 500 }
    );
  }
}
