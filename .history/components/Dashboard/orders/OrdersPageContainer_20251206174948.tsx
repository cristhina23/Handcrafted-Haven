"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/contexts/SellerOrdersContext";

interface OrdersAccordionTableProps {
  sellerId: string; // tu seller._id como string
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
      default:
        return "delivered";
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!orders || orders.length === 0) return <p className="p-4">No orders found</p>;

  return (
    <div className="overflow-x-auto rounded-md shadow-2xl">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-slate-200 dark:bg-gray-800">
          <tr>
            <th className="p-4 text-left">Order ID</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Seller Total</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order: any) => {
            // Filtrar items de este seller usando el $oid
            const sellerItems = order.items.filter(
              (item: any) => item.sellerId && item.sellerId.$oid === sellerId
            );
            if (sellerItems.length === 0) return null;

            const isExpanded = expandedOrderId === order._id.$oid;

            return (
              <div key={order._id.$oid}>
                {/* Fila principal */}
                <tr
                  onClick={() => toggleExpand(order._id.$oid)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-2">{order._id.$oid}</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">
                    ${sellerItems.reduce((sum: number, item: any) => sum + item.subtotal, 0).toFixed(2)}
                  </td>
                  <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="p-2 text-center">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderStatus(order._id.$oid, getNextStatus(order.status));
                      }}
                    >
                      Next Status
                    </Button>
                  </td>
                </tr>

                {/* Fila expandida */}
                {isExpanded && (
                  <tr>
                    <td colSpan={5} className="p-4 bg-gray-100 dark:bg-gray-800">
                      {sellerItems.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between mb-2 border-b border-gray-200 dark:border-gray-700 pb-2"
                        >
                          <span>Product ID: {item.productId.$oid}</span>
                          <span>Qty: {item.quantity}</span>
                          <span>Price: ${item.priceAtPurchase.toFixed(2)}</span>
                          <span>Discount: ${item.discount?.toFixed(2) || "0.00"}</span>
                          <span>Subtotal: ${item.subtotal.toFixed(2)}</span>
                        </div>
                      ))}
                    </td>
                  </tr>
                )}
              </div>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
