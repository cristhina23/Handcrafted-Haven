"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// ---------------------------
// TYPES
// ---------------------------
interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  weeklyRevenue?: number;
  pastWeekRevenue?: number;
  todayEarnings?: number;
}

interface WeeklyRevenue {
  start: string;
  end: string;
  revenue: number;
}

interface MonthlyRevenue {
  period: string;
  revenue: number;
}

interface RevenueAnalytics {
  weeklyAnalytics: WeeklyRevenue[];
  monthlyAnalytics: MonthlyRevenue[];
}

export interface RevenueByCountry {
  [country: string]: number;
}

export interface BestSellers {
  [productName: string]: number;
}

interface OrderContextType {
  stats: OrderStats | null;
  analytics: RevenueAnalytics | null;
  revenueByCountry: RevenueByCountry;
  bestSellers: BestSellers;

  refreshStats: () => Promise<void>;
  refreshAnalytics: () => Promise<void>;
  refreshRevenueByCountry: () => Promise<void>;
  refreshBestSellers: () => Promise<void>;
}

// ---------------------------
// CONTEXT
// ---------------------------
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// ---------------------------
// PROVIDER
// ---------------------------
export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [analytics, setAnalytics] = useState<RevenueAnalytics | null>(null);
  const [revenueByCountry, setRevenueByCountry] = useState<RevenueByCountry>({});
  const [bestSellers, setBestSellers] = useState<BestSellers>({});

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) throw new Error("Stats fetch failed");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/dashboard/revenue-analytics");
      if (!res.ok) throw new Error("Analytics fetch failed");
      const data = await res.json();

      setAnalytics({
        weeklyAnalytics: data.weeklyAnalytics ?? [],
        monthlyAnalytics: data.monthlyAnalytics ?? [],
      });
    } catch (err) {
      console.error("Error fetching analytics:", err);
    }
  };

  const fetchRevenueByCountry = async () => {
    try {
      const res = await fetch("/api/dashboard/revenue-by-country");
      if (!res.ok) throw new Error("Revenue by country fetch failed");
      const data = await res.json();

      setRevenueByCountry(data ?? {});
    } catch (err) {
      console.error("Error fetching revenue by country:", err);
    }
  };

  const fetchBestSellers = async () => {
    try {
      const res = await fetch("/api/dashboard/best-sellers");
      if (!res.ok) throw new Error("Best sellers fetch failed");
      const data = await res.json();

  // Auto load all on mount
  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([
        fetchStats(),
        fetchAnalytics(),
        fetchRevenueByCountry(),
      ]);
    };
    loadAll();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        stats,
        analytics,
        revenueByCountry,
        refreshStats: fetchStats,
        refreshAnalytics: fetchAnalytics,
        refreshRevenueByCountry: fetchRevenueByCountry,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};


export const useOrderContext = () => {
  const ctx = useContext(OrderContext);
  if (!ctx)
    throw new Error(
      "useOrderContext must be used inside an <OrderProvider>"
    );
  return ctx;
};
