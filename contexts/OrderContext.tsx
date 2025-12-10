"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  weeklyRevenue?: number;
  pastWeekRevenue?: number;
  todayEarnings?: number;
  growthPercent?: number;
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

interface OrderContextType {
  loading: boolean;
  stats: OrderStats | null;
  analytics: RevenueAnalytics | null;
  bestSellers: Record<string, number>;
  revenueByCountry: Record<string, number>;
  refreshStats: () => void;
  refreshAnalytics: () => void;
  refreshBestSellers: () => void;
  refreshRevenueByCountry: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [analytics, setAnalytics] = useState<RevenueAnalytics | null>(null);
  const [bestSellers, setBestSellers] = useState<Record<string, number>>({});
  const [revenueByCountry, setRevenueByCountry] = useState<
    Record<string, number>
  >({});

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dashboard/revenue-analytics");
      const data = await res.json();

      
      setAnalytics({
        weeklyAnalytics: data.weeklyAnalytics || [],
        monthlyAnalytics: data.monthlyAnalytics || [],
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBestSellers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dashboard/best-sellers");
      const data = await res.json();
      setBestSellers(data || {});
    } catch (error) {
      console.error("Error fetching best sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenueByCountry = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dashboard/revenue-by-country");
      const data = await res.json();
      setRevenueByCountry(data || {});
    } catch (error) {
      console.error("Error fetching revenue by country:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      await fetchStats();
      await fetchAnalytics();
      await fetchBestSellers();
      await fetchRevenueByCountry();
    };
    loadStats();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        loading,
        stats,
        refreshStats: fetchStats,
        analytics,
        refreshAnalytics: fetchAnalytics,
        bestSellers,
        refreshBestSellers: fetchBestSellers,
        revenueByCountry,
        refreshRevenueByCountry: fetchRevenueByCountry,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error("useOrderContext must be used within an OrderProvider");
  return context;
};
