/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/orders/[id]/route.ts
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { Seller } from "@/lib/models/Seller";
import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("ID received:", id);
    console.log("ID converted:", new mongoose.Types.ObjectId(id));

    await connectDB();

    const order = await Order.findById(id).lean();
    if (!order) {
      return NextResponse.json({ message: "Order not found", id }, { status: 404 });
    }

    return NextResponse.json({ order });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
   

    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


    const user = await User.findOne({ clerkId: userId });
    const seller = await Seller.findOne({ userId: user?._id });
    if (!seller)
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    const order = await Order.findById(id);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    if ((order as any).sellerId?.toString() !== seller._id.toString()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({
      message: "Order updated successfully",
      order: JSON.parse(JSON.stringify(updatedOrder)),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}




export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    const seller = await Seller.findOne({ userId: user?._id });
    if (!seller)
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    if ((order as any).sellerId?.toString() !== seller._id.toString()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Order.findByIdAndDelete(id);

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
