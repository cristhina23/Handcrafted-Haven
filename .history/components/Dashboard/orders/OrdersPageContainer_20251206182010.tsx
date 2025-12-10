"use client";

import { useOrders } from "@/contexts/SellerOrdersContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OrdersTable() {
  const { orders, loading, updateOrderStatus, deleteOrder } = useOrders();

  if (loading) return <p className="p-4">Loading...</p>;
  if (!orders || orders.length === 0) return <p className="p-4">No orders found</p>;

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
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              
              {/* Product column */}
              <td className="p-2 flex flex-col gap-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {item.productImage && (
                      <Image
                        src={item.productImage}
                        alt={item.productTitle}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    )}
                    <span className="truncate max-w-xs">{item.productTitle}</span>
                  </div>
                ))}
              </td>

              {/* Buyer */}
              <td className="p-2">{order.buyerName}</td>

              {/* Price */}
              <td className="p-2">
                {order.items.map((item, idx) => (
                  <div key={idx}>${item.priceAtPurchase.toFixed(2)}</div>
                ))}
              </td>

              {/* Quantity */}
              <td className="p-2">
                {order.items.map((item, idx) => (
                  <div key={idx}>{item.quantity}</div>
                ))}
              </td>

              {/* Subtotal */}
              <td className="p-2">
                {order.items.map((item, idx) => (
                  <div key={idx}>${item.subtotal.toFixed(2)}</div>
                ))}
              </td>

              {/* Total */}
              <td className="p-2 font-semibold">${order.total.toFixed(2)}</td>

              {/* Actions */}
              <td className="p-2 flex gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    updateOrderStatus(
                      order._id,
                      order.status === "processing" ? "completed" : "processing"
                    )
                  }
                >
                  {order.status === "processing" ? "Complete" : "Processing"}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => deleteOrder(order._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
