"use client";

import { useEffect, useState } from "react";

interface OrderItem {
  productId?: {
    title: string;
    images: string[];
  };
  quantity: number;
  subtotal: number;
}

interface Order {
  _id: string;
  createdAt: string;
  items: OrderItem[];
  grandTotal: number;
  status: string;
}

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/user/orders", {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("Failed to fetch user orders");
          return;
        }

        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        <p className="text-gray-600 dark:text-gray-400">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        <p className="text-gray-600 dark:text-gray-400">
          You don’t have any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900 dark:border-slate-700"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">
                Order <span className="text-indigo-600">#{order._id}</span>
              </p>
              <span
                className="px-2 py-1 text-sm rounded bg-indigo-100 dark:bg-indigo-800 dark:text-indigo-200"
              >
                {order.status}
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="mt-4 space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 rounded bg-white dark:bg-slate-800 border dark:border-slate-700">
                  <p className="font-medium">
                    {item.productId?.title || "Product removed"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Subtotal: ${item.subtotal.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right font-semibold">
              Total: ${order.grandTotal.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
