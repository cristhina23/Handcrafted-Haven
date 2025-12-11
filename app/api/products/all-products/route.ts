
import { NextResponse } from "next/server";
import { Product } from "@/lib/models/Product"; 
import { connectDB } from "@/lib/db/db";


export async function GET() {
  await connectDB();

  try {
    const products = await Product.find({}).limit(12); 
    return NextResponse.json({ products });
  } catch (err) {
    console.log("Get All product Api error", err)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
