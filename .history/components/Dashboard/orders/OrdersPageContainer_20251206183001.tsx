"use client";

import Image from "next/image";
import { useOrders } from "@/contexts/SellerOrdersContext";

export default function OrdersTable() {
  const { orders, loading, updateOrderStatus, deleteOrder } = useOrders();

  if (loading) return <p className="p-4">Loading orders...</p>;
  if (!orders.length) return <p className="p-4">No orders found</p>;

  return (
    <div className="overflow-x-auto rounded-md shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-slate-200 dark:bg-gray-800">
          <tr>
            <th className="p-4 text-left">Product</th>
            <th className="p-4 text-left">Buyer</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Quantity</th>
            <th className="p-4 text-left">Subtotal</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map(order => (
            <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              {/* Product */}
              <td className="p-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Image
                      src={item.productImage}
                      alt={item.productTitle}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                    <span className="truncate max-w-xs">{item.productTitle}</span>
                  </div>
                ))}
              </td>

              {/* Buyer */}
              <td className="p-2">{order.buyerName}</td>

              {/* Price */}
              <td className="p-2">{order.items.map(i => `$${i.price.toFixed(2)}`).join(", ")}</td>

              {/* Quantity */}
              <td className="p-2">{order.items.map(i => i.quantity).join(", ")}</td>

              {/* Subtotal */}
              <td className="p-2">{order.items.map(i => `$${i.subtotal.toFixed(2)}`).join(", ")}</td>

              {/* Total */}
              <td className="p-2">${order.total.toFixed(2)}</td>

              {/* Status */}
              <td className="p-2">{order.status}</td>

              {/* Actions */}
              <td className="p-2 flex gap-2">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => updateOrderStatus(order._id, "shipped")}
                >
                  Mark as Shipped
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deleteOrder(order._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
