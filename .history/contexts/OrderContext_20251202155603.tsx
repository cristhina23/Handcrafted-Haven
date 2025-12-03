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

  // Función que obtiene las estadísticas
  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data); // ✅ setState se ejecuta después de recibir los datos
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // useEffect que llama a la función asíncrona
  useEffect(() => {
    const loadStats = async () => {
      await fetchStats();
    };
    loadStats();
  }, []); // execute only once

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
