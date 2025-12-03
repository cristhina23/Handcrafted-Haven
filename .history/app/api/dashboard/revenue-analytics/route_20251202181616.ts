import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find();

    if (orders.length === 0) {
      return NextResponse.json([]);
    }

    const now = new Date();

    // Últimos 3 meses
    const result = [];
    for (let i = 2; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const monthlyOrders = orders.filter(o => {
        const created = new Date(o.createdAt);
        return created >= start && created < end;
      });

      const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

      
      const lastWeekStart = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
      const weeklyOrders = monthlyOrders.filter(o => new Date(o.createdAt) >= lastWeekStart);
      const weeklyRevenue = weeklyOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

      result.push({
        period: start.toLocaleString("default", { month: "short", year: "numeric" }),
        weeklyRevenue,
        monthlyRevenue,
      });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error("Error fetching revenue analytics:", error);
    return NextResponse.json({ error: "Error fetching revenue analytics" }, { status: 500 });
  }
}
