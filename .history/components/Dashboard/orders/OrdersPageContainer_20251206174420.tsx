"use client";

import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/contexts/SellerOrdersContext";

export default function OrdersAccordionTable({ sellerId }: { sellerId: string }) {
  const { orders, loading, updateOrderStatus, deleteOrder } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="overflow-x-auto rounded-md shadow-2xl">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-slate-200 dark:bg-gray-800">
          <tr>
            <th className="p-4 text-left">Product</th>
            <th className="p-4 text-left">Buyer</th>
            <th className="p-4 text-left">Quantity</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-center w-32">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order: any) => {
            // Filtrar solo items que pertenecen a este seller
            const sellerItems = order.items.filter(
              (item: any) => item.sellerId.toString() === sellerId.toString()
            );
            if (sellerItems.length === 0) return null;

            return (
              <Fragment key={order._id}>
                {sellerItems.map((item: any, idx: number) => (
                  <tr
                    key={`${order._id}-${idx}`}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                    onClick={() => toggleExpand(order._id)}
                  >
                    <td className="p-2 flex items-center gap-2">
                      {item.productId?.images?.[0] && (
                        <img
                          src={item.productId.images[0]}
                          alt={item.productId.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <span className="truncate max-w-[150px]">
                        {item.productId?.title || "Unnamed Product"}
                      </span>
                    </td>
                    <td className="p-2">{order.buyerId?.fullname || "Unknown"}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">${item.subtotal.toFixed(2)}</td>
                    <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="p-2 flex justify-center gap-2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          const nextStatus =
                            order.status === "pending"
                              ? "processing"
                              : order.status === "processing"
                              ? "shipped"
                              : "delivered";
                          updateOrderStatus(order._id, nextStatus);
                        }}
                      >
                        Next
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteOrder(order._id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
