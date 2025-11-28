// app/api/products/random/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Product } from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();

    // Trae todos los productos
    let products = await Product.find().lean();

    // Mezcla los productos (pure shuffle)
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }

    // Toma solo los primeros 3
    products = products.slice(0, 3);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching random products:", error);
    return NextResponse.json(
      { error: "Failed to load random products" },
      { status: 500 }
    );
  }
}
