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

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      sellerId,
      title,
      description,
      price,
      images,
      categoryId,
      quantity,
      country,
      variants,
      isCustomOrder,
      dimensions,
      shippingMethods,
    } = body;

    
    if (!sellerId) {
      return NextResponse.json(
        { error: "sellerId is required" },
        { status: 400 }
      );
    }

    if (!title || !description) {
      return NextResponse.json(
        { error: "title and description are required" },
        { status: 400 }
      );
    }

    if (!price || isNaN(price)) {
      return NextResponse.json(
        { error: "price must be a number" },
        { status: 400 }
      );
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: "categoryId is required" },
        { status: 400 }
      );
    }

    
    const newProduct = await Product.create({
      sellerId,
      title,
      description,
      price,
      images,
      categoryId,
      quantity: quantity ?? 0,
      country: country ?? "",
      variants: variants ?? [],
      isCustomOrder: isCustomOrder ?? false,
      dimensions: dimensions ?? "",
      shippingMethods: shippingMethods ?? [],
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

