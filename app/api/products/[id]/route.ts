// app/api/products/[id]/route.ts
import { connectDB } from "@/lib/db/db";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // params es un Promise
) {
  try {
    const resolvedParams = await params; // ⬅️ desenlazamos el Promise
    const { id } = resolvedParams;

    await connectDB();
    const product = await Product.findById(id).lean();

    if (!product) { return NextResponse.json( { message: "Product not found", id }, { status: 404 } ); } 
    
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
