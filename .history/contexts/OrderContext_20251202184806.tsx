"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
}

interface WeeklyRevenue {
  start: string; // date of start of the week
  end: string;   // date of end of the week
  revenue: number;
}

interface MonthlyRevenue {
  period: string; 
  revenue: number;
}

interface RevenueAnalytics {
  weeklyAnalytics: WeeklyRevenue[]; // all the weeks of the last 3 months
  monthlyAnalytics: MonthlyRevenue[]; //last 3 monts
}

interface OrderContextType {
  stats: OrderStats | null;
  analytics: RevenueAnalytics | null;  
  refreshStats: () => void;
  refreshAnalytics: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [analytics, setAnalytics] = useState<RevenueAnalytics | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data); 
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/dashboard/revenue-analytics");
      const data = await res.json();

      // make sure to handle the case where data is null
      setAnalytics({
        weeklyAnalytics: data.weeklyAnalytics || [],
        monthlyAnalytics: data.monthlyAnalytics || [],
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      await fetchStats();
      await fetchAnalytics();
    };
    loadStats();
  }, []); 

  return (
    <OrderContext.Provider value={{ stats, refreshStats: fetchStats, analytics, refreshAnalytics: fetchAnalytics }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrderContext must be used within an OrderProvider");
  return context;
};
