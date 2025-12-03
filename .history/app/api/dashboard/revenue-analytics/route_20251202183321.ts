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

    // 🔹 Calcular inicio de esta semana (ejemplo: lunes)
    const dayOfWeek = now.getDay(); // 0=domingo, 1=lunes...
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - dayOfWeek);
    startOfThisWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

    // 
    const thisWeekOrders = orders.filter(o => {
      const created = new Date(o.createdAt);
      return created >= startOfThisWeek;
    });
    const weeklyRevenue = thisWeekOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

    const pastWeekOrders = orders.filter(o => {
      const created = new Date(o.createdAt);
      return created >= startOfLastWeek && created < startOfThisWeek;
    });
    const pastWeekRevenue = pastWeekOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

    // earnings for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayOrders = orders.filter(o => {
      const created = new Date(o.createdAt);
      return created >= today && created < tomorrow;
    });
    const todayEarnings = todayOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

    // the last 3 months
    const result = [];
    for (let i = 2; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const monthlyOrders = orders.filter(o => {
        const created = new Date(o.createdAt);
        return created >= start && created < end;
      });

      const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

      result.push({
        period: start.toLocaleString("default", { month: "short", year: "numeric" }),
        monthlyRevenue,
      });
    }

   
    return NextResponse.json({
      weeklyRevenue,
      pastWeekRevenue,
      todayEarnings,
      monthlyAnalytics: result,
    });

  } catch (error) {
    console.error("Error fetching revenue analytics:", error);
    return NextResponse.json({ error: "Error fetching revenue analytics" }, { status: 500 });
  }
}
