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

    // Buscar órdenes que tengan items de este seller y popular producto y buyer
    const orders = await Order.find({ "items.sellerId": seller._id })
  .sort({ createdAt: -1 })
  .lean(); // Primero obtienes el documento puro

// Filtra items del seller
const filteredOrders = orders.map((order: any) => {
  const sellerItems = order.items.filter(
    (item: any) => String(item.sellerId) === String(seller._id)
  );

  return {
    ...order,
    items: sellerItems,
  };
});

// Ahora sí, popula manualmente los productos y compradores
for (const order of filteredOrders) {
  for (const item of order.items) {
    const product = await Product.findById(item.productId).select("title images").lean();
    item.productId = product;
  }

  const buyer = await User.findById(order.buyerId).select("fullName image").lean();
  order.buyerId = buyer;
}

    return NextResponse.json({ orders: filteredOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
