"use client";

import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/contexts/SellerOrdersContext";
import { IOrder } from "@/lib/models/Order";

export default function OrdersAccordionTable() {
  const { orders, loading, updateOrderStatus } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getNextStatus = (currentStatus: IOrder["status"]) => {
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
          {order.items
            .filter(item => item.sellerId.toString() === sellerId)
            .map((item, idx) => (
              <div key={idx} className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                <span>Product ID: {item.productId.toString()}</span>
                <span>Qty: {item.quantity}</span>
                <span>Price: ${item.priceAtPurchase.toFixed(2)}</span>
                <span>Discount: ${item.discount?.toFixed(2) || "0.00"}</span>
                <span>Subtotal: ${item.subtotal.toFixed(2)}</span>
              </div>
          ))}
        </tbody>
      </table>
    </div>
  );
}
