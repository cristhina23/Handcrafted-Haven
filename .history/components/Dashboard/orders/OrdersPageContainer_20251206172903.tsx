"use client";

import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/contexts/SellerOrdersContext";

interface OrdersAccordionTableProps {
  sellerId: string;
}

export default function OrdersAccordionTable({ sellerId }: OrdersAccordionTableProps) {
  const { orders, loading, updateOrderStatus } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getNextStatus = (currentStatus: string) => {
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
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => {
            const sellerItems = order.items.filter(
              (item) => item.sellerId === sellerId
            );
            if (sellerItems.length === 0) return null;

            const isExpanded = expandedOrderId === order._id;

            return (
              <Fragment key={order._id}>
                {/* Fila principal de la orden */}
                <tr
                  onClick={() => toggleExpand(order._id)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-2">{order._id}</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">${order.grandTotal.toFixed(2)}</td>
                  <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="p-2 text-center">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderStatus(order._id, getNextStatus(order.status));
                      }}
                    >
                      Next Status
                    </Button>
                  </td>
                </tr>

                {/* Detalles de los items de la orden */}
                {isExpanded && (
                  <tr>
                    <td colSpan={5} className="p-4 bg-gray-100 dark:bg-gray-800">
                      {sellerItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between mb-2 border-b border-gray-200 dark:border-gray-700 pb-2"
                        >
                          <span>Product: {item.productId}</span>
                          <span>Qty: {item.quantity}</span>
                          <span>Price: ${item.priceAtPurchase.toFixed(2)}</span>
                          <span>Discount: ${item.discount?.toFixed(2) || "0.00"}</span>
                          <span>Subtotal: ${item.subtotal.toFixed(2)}</span>
                        </div>
                      ))}
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
