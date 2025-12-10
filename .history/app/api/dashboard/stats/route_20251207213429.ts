import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { Seller } from "@/lib/models/Seller";
import { User } from "@/lib/models/User";

export async function GET() {
  try {
    await connectDB();

     const { userId: clerkId } = await auth();

      if (!clerkId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    console.log("clerkId:", clerkId);
    console.log("user:", user);
    const seller = await Seller.findOne({ userId: user._id });
    console.log("seller:", seller);


    if (!seller) {
      return NextResponse.json(
        { error: "Seller not found" },
        { status: 404 }
      );
    }

    const orders = await Order.find().lean(); 


    const sellerOrdersItems = [];

    orders.forEach(order => {
      order.items.forEach(item: any => {
        if (item.sellerId.toString() === seller._id.toString()) {
          sellerOrdersItems.push({
            orderId: order._id,
            buyerId: order.buyerId,
            grandTotal: item.subtotal, 
            createdAt: order.createdAt,
          });
        }
      });
  });

    if (orders.length === 0) {
      // this is for a new seller
      return NextResponse.json({
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        weeklyRevenue: 0,
        growthPercent: 0,
      });
    }


    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.grandTotal || 0), 0);
    const totalCustomers = new Set(orders.map(order => order.buyerId?.toString() || "")).size;

  
    const now = new Date();
    const startOfThisWeek = new Date();
    startOfThisWeek.setDate(now.getDate() - 7);
    const startOfLastWeek = new Date();
    startOfLastWeek.setDate(now.getDate() - 14);
    const startOfTwoWeeksAgo = new Date();
    startOfTwoWeeksAgo.setDate(now.getDate() - 21);
    const startOfThreeWeeksAgo = new Date();
    startOfThreeWeeksAgo.setDate(now.getDate() - 28);

   
    const weeklyTotals = [0, 0, 0, 0]; 

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
