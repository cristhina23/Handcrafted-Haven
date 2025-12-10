import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { Seller } from "@/lib/models/Seller";
import { User } from "@/lib/models/User";

export async function GET() {
  try {
    await connectDB();

    const { seller, error, status } = await getSellerFromAuth();
      if (error) return NextResponse.json({ error }, { status });
    
    const orders = await Order.find().lean();

   
    const sellerOrdersItems: {
      orderId: string;
      buyerId: string;
      grandTotal: number;
      createdAt: Date;
    }[] = [];

    orders.forEach(order => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      order.items.forEach((item: { sellerId: { toString: () => any; }; subtotal: any; }) => {
        if (item.sellerId.toString() === seller._id.toString()) {
          sellerOrdersItems.push({
            orderId: order._id.toString(),
            buyerId: order.buyerId.toString(),
            grandTotal: item.subtotal,
            createdAt: order.createdAt,
          });
        }
      });
    });

    if (sellerOrdersItems.length === 0) {
      return NextResponse.json({
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        weeklyRevenue: 0,
        growthPercent: 0,
      });
    }

    // Estadísticas
    const totalOrders = new Set(sellerOrdersItems.map(i => i.orderId)).size;
    const totalRevenue = sellerOrdersItems.reduce((sum, i) => sum + i.grandTotal, 0);
    const totalCustomers = new Set(sellerOrdersItems.map(i => i.buyerId)).size;

    // Fechas para semanas
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - 7);
    const startOfLastWeek = new Date(now);
    startOfLastWeek.setDate(now.getDate() - 14);
    const startOfTwoWeeksAgo = new Date(now);
    startOfTwoWeeksAgo.setDate(now.getDate() - 21);
    const startOfThreeWeeksAgo = new Date(now);
    startOfThreeWeeksAgo.setDate(now.getDate() - 28);

    const weeklyTotals = [0, 0, 0, 0];

    sellerOrdersItems.forEach(item => {
      const created = new Date(item.createdAt).getTime();
      if (created >= startOfThreeWeeksAgo.getTime() && created < startOfTwoWeeksAgo.getTime()) {
        weeklyTotals[0] += item.grandTotal;
      } else if (created >= startOfTwoWeeksAgo.getTime() && created < startOfLastWeek.getTime()) {
        weeklyTotals[1] += item.grandTotal;
      } else if (created >= startOfLastWeek.getTime() && created < startOfThisWeek.getTime()) {
        weeklyTotals[2] += item.grandTotal;
      } else if (created >= startOfThisWeek.getTime()) {
        weeklyTotals[3] += item.grandTotal;
      }
    });

    const [weekMinus3, weekMinus2, lastWeek, thisWeek] = weeklyTotals;
    const avgPreviousWeeks = (weekMinus3 + weekMinus2 + lastWeek) / 3;
    const growthPercent = avgPreviousWeeks > 0
      ? ((thisWeek - avgPreviousWeeks) / avgPreviousWeeks) * 100
      : 0;

    const stats = {
      totalOrders,
      totalRevenue,
      totalCustomers,
      weeklyRevenue: thisWeek,
      growthPercent: parseFloat(growthPercent.toFixed(2)),
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Error fetching stats" }, { status: 500 });
  }
}
