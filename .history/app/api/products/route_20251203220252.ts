// app/api/products/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Product } from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();

    return NextResponse.json(
      JSON.parse(JSON.stringify(products))
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}

