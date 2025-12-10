import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Order, IOrderItem } from "@/lib/models/Order";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/lib/models/User";
import { Seller } from "@/lib/models/Seller";
import { OrderType } from "@/types";

interface SellerOrderItem {
  orderId: string;         
  buyerId: string;         
  subtotal: number;
  createdAt: Date;
}

interface WeekRevenue {
  start: Date;
  end: Date;
  revenue: number;
}

interface MonthRevenue {
  period: string;
  revenue: number;
}

export async function GET() {
  try {
    await connectDB();

    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const user = await User.findOne({ clerkId });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const seller = await Seller.findOne({ userId: user._id });
    if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

 
    const orders = await Order.find().lean();

   
    const sellerOrdersItems: SellerOrderItem[] = [];
    orders.forEach(order => {
      order.items.forEach((item: IOrderItem) => {
        if (item.sellerId.toString() === seller._id.toString()) {
          sellerOrdersItems.push({
            orderId: order._id.toString(),
            buyerId: order.buyerId.toString(),
            subtotal: item.subtotal,
            createdAt: order.createdAt,
          });
        }
      });
    });

    if (sellerOrdersItems.length === 0) {
      return NextResponse.json({ weeklyAnalytics: [], monthlyAnalytics: [] });
    }

    const now = new Date();

    
    const getStartOfWeek = (date: Date) => {
      const day = date.getDay();
      const diff = day === 0 ? -6 : 1 - day; 
      const start = new Date(date);
      start.setDate(date.getDate() + diff);
      start.setHours(0, 0, 0, 0);
      return start;
    };

 
    const startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1); 
    const weeks: WeekRevenue[] = [];
    let current = getStartOfWeek(startDate);

    while (current <= now) {
      const end = new Date(current);
      end.setDate(current.getDate() + 7);

      const weekItems = sellerOrdersItems.filter(item => {
        const created = new Date(item.createdAt);
        return created >= current && created < end;
      });

      const revenue = weekItems.reduce((sum, item) => sum + item.subtotal, 0);
      weeks.push({ start: new Date(current), end, revenue });
      current = end;
    }

    
    const months: MonthRevenue[] = [];
    for (let i = 2; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const monthItems = sellerOrdersItems.filter(item => {
        const created = new Date(item.createdAt);
        return created >= start && created < end;
      });

      const monthlyRevenue = monthItems.reduce((sum, item) => sum + item.subtotal, 0);
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
