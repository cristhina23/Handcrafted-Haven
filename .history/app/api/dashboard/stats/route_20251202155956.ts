import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db"; // tu función para conectar MongoDB
import { Order } from "@/lib/models/Order"; // tu modelo de órdenes

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find(); // traer todas las órdenes

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0); // totalAmount es el monto de cada orden
    const totalCustomers = new Set(orders.map(order => order.customerId.toString())).size; 

    const stats = {
      totalOrders,
      totalRevenue,
      totalCustomers,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching stats" }, { status: 500 });
  }
}
