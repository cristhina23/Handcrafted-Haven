"use client";

import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/contexts/SellerOrdersContext";
import { OrderClient } from "@/types"; // Un tipo frontend con _id: string y sellerId como string

export default function OrdersAccordionTable({ sellerId }: { sellerId: string }) {
  const { orders, loading, updateOrderStatus } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getNextStatus = (currentStatus: OrderClient["status"]) => {
    switch (currentStatus) {
      case "pending":
        return "processing";
      case "processing":
        return "shipped";
      case "shipped":
        return "delivered";
      case "delivered":
      default:
        return "delivered";
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="overflow-x-auto rounded-md shadow-2xl">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-slate-200 dark:bg-gray-800">
          <tr>
            <th className="p-4 text-left">Order ID</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Grand Total</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-center w-32">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => {
            const sellerItems = order.items.filter(
              (item) => item.sellerId.toString() === sellerId
            );
            if (sellerItems.length === 0) return null; // No mostrar orden si no tiene items de este seller
            const isExpanded = expandedOrderId === order._id;

            return (
              <Fragment key={order._id}>
                {/* Fila resumen */}
                <tr
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => toggleExpand(order._id)}
                >
                  <td className="p-4">{order._id.slice(0, 8)}...</td>
                  <td className="p-4 capitalize">{order.status}</td>
                  <td className="p-4">${order.grandTotal.toFixed(2)}</td>
                  <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newStatus = getNextStatus(order.status);
                        updateOrderStatus(order._id, newStatus);
                      }}
                    >
                      {order.status === "delivered" ? "Delivered" : "Next Status"}
                    </Button>
                  </td>
                </tr>

                {/* Fila detalle */}
                {isExpanded && (
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td colSpan={5} className="p-4">
                      <div className="flex flex-col gap-2">
                        {sellerItems.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm"
                          >
                            <span>Product ID: {item.productId.toString()}</span>
                            <span>Qty: {item.quantity}</span>
                            <span>Price: ${item.priceAtPurchase.toFixed(2)}</span>
                            <span>Discount: ${item.discount?.toFixed(2) || "0.00"}</span>
                            <span>Subtotal: ${item.subtotal.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
