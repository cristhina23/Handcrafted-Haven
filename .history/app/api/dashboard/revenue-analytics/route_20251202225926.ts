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

    // helper function to get the start of the week
    const getStartOfWeek = (date: Date) => {
      const day = date.getDay();
      const diff = day === 0 ? -6 : 1 - day; // Monday 
      const start = new Date(date);
      start.setDate(date.getDate() + diff);
      start.setHours(0, 0, 0, 0);
      return start;
    };

    // calculate weekly revenue
    const startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1); // hace 3 meses
    const weeks: { start: Date; end: Date; revenue: number }[] = [];
    let current = getStartOfWeek(startDate);

    while (current <= now) {
      const end = new Date(current);
      end.setDate(current.getDate() + 7);

      const weekOrders = orders.filter(o => {
        const created = new Date(o.createdAt);
        return created >= current && created < end;
      });

      const revenue = weekOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

      weeks.push({ start: new Date(current), end, revenue });
      current = end;
    }

    // the last 3 months
    const months = [];
    for (let i = 2; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const monthlyOrders = orders.filter(o => {
        const created = new Date(o.createdAt);
        return created >= start && created < end;
      });

      const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

      months.push({
        period: start.toLocaleString("default", { month: "short", year: "numeric" }),
        revenue: monthlyRevenue,
      });
    }

    return NextResponse.json({
      weeklyAnalytics: weeks.map(w => ({
        start: w.start.toISOString().split("T")[0],
        end: w.end.toISOString().split("T")[0],
        revenue: w.revenue,
      })),
      monthlyAnalytics: months,
    });

  } catch (error) {
    console.error("Error fetching revenue analytics:", error);
    return NextResponse.json({ error: "Error fetching revenue analytics" }, { status: 500 });
  }
}
