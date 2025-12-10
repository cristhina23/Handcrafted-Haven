// contexts/SellerOrdersContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { iOrder } from "@/types";

interface SellerOrdersContextType {
  orders: Order[];
  loading: boolean;
  refreshOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
}

const SellerOrdersContext = createContext<SellerOrdersContextType | undefined>(undefined);

export const SellerOrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders"); 
      const data: Order[] = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshOrders = async () => {
    await fetchOrders();
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      await refreshOrders();
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });
      await refreshOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <SellerOrdersContext.Provider value={{ orders, loading, refreshOrders, updateOrderStatus, deleteOrder }}>
      {children}
    </SellerOrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(SellerOrdersContext);
  if (!context) throw new Error("useOrders must be used within a SellerOrdersProvider");
  return context;
};
