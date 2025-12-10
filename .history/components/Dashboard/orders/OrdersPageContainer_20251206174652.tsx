"use client";

import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/contexts/SellerOrdersContext";

interface OrderItem {
  productId: {
    _id: string;
    title: string;
    image?: string;
  } | { $oid: string }; // si no tienes los detalles del producto
  sellerId: { $oid: string };
  quantity: number;
  priceAtPurchase: number;
  discount?: number;
  subtotal: number;
}

interface Order {
  _id: string;
  buyerId: { $oid: string; fullname?: string };
  items: OrderItem[];
  status: string;
  grandTotal: number;
  createdAt: string;
}

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
              (item: any) => item.sellerId?.$oid === sellerId
            );
            if (sellerItems.length === 0) return null;

            return sellerItems.map((item: any, idx: number) => (
              <tr key={`${order._id}-${idx}`} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="p-2 flex items-center gap-2">
                  {item.productId.image && (
                    <img src={item.productId.image} alt={item.productId.title} className="w-12 h-12 object-cover rounded-md" />
                  )}
                  <span title={item.productId.title}>
                    {item.productId.title.length > 20
                      ? item.productId.title.slice(0, 20) + "..."
                      : item.productId.title}
                  </span>
                </td>
                <td className="p-2">
                  {order.buyerId?.fullname || order.buyerId?.$oid}
                </td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${item.subtotal.toFixed(2)}</td>
                <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="p-2 flex justify-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order._id, "shipped")}
                  >
                    Mark Shipped
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteOrder(order._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}
