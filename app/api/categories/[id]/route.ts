import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Category } from "@/lib/models/Category";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();
    const category = await Category.findById(id).lean();

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
