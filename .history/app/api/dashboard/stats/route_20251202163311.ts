import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.grandTotal || 0), 0);
    const totalCustomers = new Set(orders.map(order => order.buyerId?.toString() || "")).size;

    // Filtrar órdenes de los últimos 7 días
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyRevenue = orders
      .filter(order => new Date(order.createdAt) >= oneWeekAgo)
      .reduce((sum, order) => sum + (order.grandTotal || 0), 0);

    const stats = {
      totalOrders,
      totalRevenue,
      totalCustomers,
      weeklyRevenue, 
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Error fetching stats" }, { status: 500 });
  }
}
