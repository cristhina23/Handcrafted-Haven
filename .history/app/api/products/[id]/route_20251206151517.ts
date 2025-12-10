import { connectDB } from "@/lib/db/db";
import "@/lib/models/Product";
import "@/lib/models/Seller";
import "@/lib/models/Category";
import { Review } from "@/lib/models/Review";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("ID recieved:", id);
    console.log("ID converted:", new mongoose.Types.ObjectId(id));


    await connectDB();

    const product = await Product.findById(id)
      .populate("sellerId", "shopName country")
      .populate("categoryId", "name")
      .lean();

    if (!product) {
      return NextResponse.json({ message: "Product not found", id }, { status: 404 });
    }

    const reviews = await Review.find({
  productId: new mongoose.Types.ObjectId(id),
})
  .sort({ createdAt: -1 })
  .limit(3)
  .lean();
  console.log("Reviews fetched:", reviews);

    return NextResponse.json({ product, reviews });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params; 
    const id = resolvedParams.id;

    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    const seller = await Seller.findOne({ userId: user?._id });
    if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    if (product.sellerId.toString() !== seller._id.toString()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({
      message: "Product updated successfully",
      product: JSON.parse(JSON.stringify(updatedProduct)),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}




export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params; 
    const id = resolvedParams.id;

    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    const seller = await Seller.findOne({ userId: user?._id });
    if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    if (product.sellerId.toString() !== seller._id.toString()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}


