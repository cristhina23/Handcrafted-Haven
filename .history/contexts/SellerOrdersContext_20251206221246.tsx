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
  const [localStatuses, setLocalStatuses] = useState<{ [orderId: string]: string }>({});

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json(); 

      
      const mappedOrders: OrderClient[] = data.orders.map((order: any) => ({
        _id: order._id,
        buyerName: order.buyerId?.fullName || "Unknown",
        buyerImage: order.buyerId?.image || "",
        items: order.items.map((item: any) => ({
          productTitle: item.productId?.title || "Product deleted",
          productImage: item.productId?.images?.[0] || "/placeholder.png",
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
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update order");
      }

      const updatedOrder = await res.json();

      // Actualiza el estado local directamente para reflejar el cambio
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === updatedOrder._id
            ? { ...order, status: updatedOrder.status }
            : order
        )
      );

      setLocalStatuses(prev => ({ ...prev, [orderId]: status }));

    } catch (err) {
      console.error("Error updating order:", err);
      // opcional: revertir el estado local si falla
      setLocalStatuses(prev => ({ ...prev, [orderId]: orders.find(o => o._id === orderId)?.status || "" }));
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
