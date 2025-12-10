// app/api/orders/route.ts
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { Seller } from "@/lib/models/Seller";
import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const seller = await Seller.findOne({ userId: user._id });
    if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    // Obtener todas las órdenes que tengan al menos un item de este seller
    const orders = await Order.find({ "items.sellerId": seller._id })
      .sort({ createdAt: -1 })
      .lean();

    // Filtrar items y popular productos y buyer en paralelo
    const filteredOrders = await Promise.all(
      orders.map(async (order: any) => {
        const sellerItems = order.items.filter(
          (item: any) => String(item.sellerId) === String(seller._id)
        );

        // Popular productos en paralelo
        const populatedItems = await Promise.all(
          sellerItems.map(async (item: any) => {
            const product = await Product.findById(item.productId)
              .select("title images")
              .lean();
            return { ...item, productId: product };
          })
        );

        // Popular buyer
        const buyer = await User.findById(order.buyerId)
          .select("fullName image")
          .lean();

        return {
          ...order,
          items: populatedItems,
          buyerId: buyer,
        };
      })
    );

    return NextResponse.json({ orders: filteredOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
