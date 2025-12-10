"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { OrderClient } from "@/types";

interface SellerOrdersContextType {
  orders: OrderClient[];
  loading: boolean;
  refreshOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
}

const SellerOrdersContext = createContext<SellerOrdersContextType | undefined>(undefined);

export const SellerOrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<OrderClient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json(); 

      
      const mappedOrders: OrderClient[] = data.orders.map((order: any) => ({
        _id: order._id,
        buyerName: order.buyerId?.fullName || "Unknown",
        buyerImage: order.buyerId?.image || "",
        items: order.items
          .filter((item: any) => item.productId !== null) // <-- aquí
          .map((item: any) => ({
            productTitle: item.productId.title,
            productImage: item.productId.images[0] || "",
            price: item.priceAtPurchase,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        total: order.items
          .filter((item: any) => item.productId !== null)
          .reduce((sum: number, item: any) => sum + item.subtotal, 0),
        status: order.status,
        createdAt: order.createdAt,
      }));
      setOrders(mappedOrders);
      console.log("Orders fetched and mapped:", mappedOrders);
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
    <SellerOrdersContext.Provider
      value={{ orders, loading, refreshOrders, updateOrderStatus, deleteOrder }}
    >
      {children}
    </SellerOrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(SellerOrdersContext);
  if (!context) throw new Error("useOrders must be used within a SellerOrdersProvider");
  return context;
};
