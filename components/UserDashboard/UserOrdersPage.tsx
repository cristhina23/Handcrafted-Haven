"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/user/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="p-6 animate-pulse">
        <div className="h-6 w-40 bg-gray-300 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-3">Your Orders</h1>
        <p className="text-gray-600">You haven’t purchased anything yet.</p>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-5 rounded-xl shadow-md bg-white dark:bg-slate-800 border
            hover:shadow-lg hover:-translate-y-[2px] transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg tracking-wide">
                #{order._id.substring(0, 8)}
              </h2>

              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full 
                ${
                  order.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.status === "shipped"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-1">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-4 space-y-3">
              {order.items.map((item: any) => (
                <div key={item._id} className="flex items-center gap-3">
                  {item.productId?.images?.[0] && (
                    <img
                      src={item.productId.images[0]}
                      className="w-12 h-12 rounded-lg object-cover border"
                      alt="Item"
                    />
                  )}

                  <div className="flex flex-col">
                    <span className="font-medium">
                      {item.productId?.title || "Unknown Product"}
                    </span>
                    <span className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 font-semibold text-right text-lg">
              Total: ${" "}
              {order.items
                .reduce(
                  (acc: number, item: any) =>
                    acc +
                    (item.subtotal ??
                      item.priceAtPurchase * item.quantity),
                  0
                )
                .toFixed(2)}
            </p>

            <Link
              href={`/dashboard/order-history/${order._id}`}
              className="mt-4 block text-blue-600 hover:text-blue-800 font-medium text-right text-sm"
            >
              View details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
