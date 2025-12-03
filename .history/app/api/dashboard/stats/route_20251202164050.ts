import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find();

    // Stats generales
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.grandTotal || 0), 0);
    const totalCustomers = new Set(orders.map(order => order.buyerId?.toString() || "")).size;

    // Fechas
    const now = new Date();
    const startOfThisWeek = new Date();
    startOfThisWeek.setDate(now.getDate() - 7);
    const startOfLastWeek = new Date();
    startOfLastWeek.setDate(now.getDate() - 14);
    const startOfTwoWeeksAgo = new Date();
    startOfTwoWeeksAgo.setDate(now.getDate() - 21);
    const startOfThreeWeeksAgo = new Date();
    startOfThreeWeeksAgo.setDate(now.getDate() - 28);

    // Inicializar totales semanales
    const weeklyTotals = [0, 0, 0, 0]; // [3 semanas atrás, 2 semanas atrás, semana pasada, esta semana]

    orders.forEach(order => {
      const created = new Date(order.createdAt).getTime();

      if (created >= startOfThreeWeeksAgo.getTime() && created < startOfTwoWeeksAgo.getTime()) {
        weeklyTotals[0] += order.grandTotal || 0;
      } else if (created >= startOfTwoWeeksAgo.getTime() && created < startOfLastWeek.getTime()) {
        weeklyTotals[1] += order.grandTotal || 0;
      } else if (created >= startOfLastWeek.getTime() && created < startOfThisWeek.getTime()) {
        weeklyTotals[2] += order.grandTotal || 0;
      } else if (created >= startOfThisWeek.getTime()) {
        weeklyTotals[3] += order.grandTotal || 0;
      }
    });

    const [weekMinus3, weekMinus2, lastWeek, thisWeek] = weeklyTotals;

    // Calcular crecimiento (%)
    const avgPreviousWeeks = (weekMinus3 + weekMinus2 + lastWeek) / 3;
    const growthPercent = avgPreviousWeeks > 0
      ? ((thisWeek - avgPreviousWeeks) / avgPreviousWeeks) * 100
      : 0;

    const stats = {
      totalOrders,
      totalRevenue,
      totalCustomers,
      weeklyRevenue: thisWeek,
      growthPercent: parseFloat(growthPercent.toFixed(2)), // dos decimales
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Error fetching stats" }, { status: 500 });
  }
}
