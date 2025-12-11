"use client";

import { useEffect, useState } from "react";

export default function UserOrderDetailsPage({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(`/api/user/orders/${orderId}`);
      const data = await res.json();
      setOrder(data.order);
    }

    fetchOrder();
  }, [orderId]);

  if (!order)
    return (
      <div className="p-6 animate-pulse">
        <div className="h-7 w-52 bg-gray-300 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </div>
    );

  const total = order.items.reduce(
    (acc: number, item: any) =>
      acc + (item.subtotal ?? item.priceAtPurchase * item.quantity),
    0
  );

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order #{order._id.slice(0, 8)}</h1>

        <span
          className={`px-4 py-1 text-sm font-semibold rounded-full 
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

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Items</h2>

        <div className="space-y-5">
          {order.items.map((item: any) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                {item.productId?.images?.[0] && (
                  <img
                    src={item.productId.images[0]}
                    alt="Item"
                    className="w-14 h-14 rounded-lg object-cover border"
                  />
                )}

                <div>
                  <p className="font-semibold text-lg">
                    {item.productId?.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} — ${item.priceAtPurchase} each
                  </p>
                </div>
              </div>

              <p className="font-semibold text-lg">
                ${(item.subtotal ?? item.priceAtPurchase * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold border-b pb-2">Summary</h2>

        <div className="mt-4 text-lg flex justify-between">
          <span className="font-medium">Items Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="mt-4 pt-4 border-t text-xl flex justify-between font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold border-b pb-2">Order Information</h2>

        <p className="mt-3 text-gray-700">
          <strong>Placed on:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>

        <p className="mt-1 text-gray-700">
          <strong>Last updated:</strong>{" "}
          {new Date(order.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
