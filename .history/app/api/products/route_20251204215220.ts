// app/api/products/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Product } from "@/lib/models/Product";
import { auth, Session } from "@clerk/nextjs/server";
import { Seller } from "@/lib/models/Seller";
import { User } from "@/lib/models/User";

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
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();

    const {
      title,
      description,
      price,
      images,
      categoryId,
      quantity,
      variants,
      isCustomOrder,
      dimensions,
      shippingMethods,
    } = body;

    
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

    
    const clerkId = userId;
    const user = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    
    const seller = await Seller.findOne({ userId: user._id });

    if (!seller) {
      return NextResponse.json(
        { error: "Seller profile not found for this user" },
        { status: 404 }
      );
    }

    const storeId = seller._id.toString();
    const sellerCountry = seller.country || "";

    // Crear producto
    const newProduct = await Product.create({
      sellerId: storeId,
      title,
      description,
      price,
      images,
      categoryId,
      quantity: quantity ?? 1,
      country: sellerCountry,
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


