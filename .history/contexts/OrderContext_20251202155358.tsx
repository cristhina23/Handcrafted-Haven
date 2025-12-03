// context/OrderContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
}

interface OrderContextType {
  stats: OrderStats | null;
  refreshStats: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<OrderStats | null>(null);

  const fetchStats = async () => {
    const res = await fetch("/api/dashboard/stats");
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <OrderContext.Provider value={{ stats, refreshStats: fetchStats }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrderContext must be used within an OrderProvider");
  return context;
};
