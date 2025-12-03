"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  weeklyRevenue: number;
  growthPercent: number;
}

interface RevenueAnalytics {
  period: string;
  weeklyRevenue: number;
  monthlyRevenue: number;
}

interface OrderContextType {
  stats: OrderStats | null;
  analytics: RevenueAnalytics[];  
  refreshStats: () => void;
  refreshAnalytics: () => void;
}



const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [analytics, setAnalytics] = useState<RevenueAnalytics[]>([]);

  // Functions to get the Statistics
  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data); //  setState is executed after we recieve the data
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

   const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/dashboard/revenue-analytics");
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  // useEffect calls the fetchStats function
  useEffect(() => {
    const loadStats = async () => {
      await fetchStats();
    };
    loadStats();
     fetchAnalytics();
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
