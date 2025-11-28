import { NextRequest, NextResponse } from "next/server";
import { getCategories } from "@/lib/getCategories";

export async function GET(req: NextRequest) {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load categories" }, { status: 500 });
  }
}
