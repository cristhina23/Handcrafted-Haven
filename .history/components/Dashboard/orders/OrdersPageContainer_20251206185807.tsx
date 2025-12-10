"use client";

import Image from "next/image";
import { useOrders } from "@/contexts/SellerOrdersContext";
import { useState } from "react";
import { OrderClient } from "@/types";

export default function OrdersTable() {
  const { orders, loading, updateOrderStatus, deleteOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderClient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) return <p className="p-4">Loading orders...</p>;
  if (!orders.length) return <p className="p-4">No orders found</p>;

  const openOrderModal = (order: OrderClient) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };
  const closeOrderModal = () => setModalOpen(false);

  return (
    <div className="overflow-x-auto rounded-md shadow-lg">
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    <thead className="bg-slate-200 dark:bg-gray-800">
      <tr>
        <th className="p-4 text-left">Buyer</th>
        <th className="p-4 text-left">Total Items</th>
        <th className="p-4 text-left">Total Price</th>
        <th className="p-4 text-left">Status</th>
        <th className="p-4 text-left">Actions</th>
      </tr>
    </thead>

    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      {orders.map(order => {
        const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = order.items.reduce((sum, item) => sum + item.subtotal, 0);

        return (
          <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            
            {/* Buyer */}
            <td className="p-2 flex items-center gap-2">
              {order.buyerImage && (
                <Image
                  src={order.buyerImage}
                  alt={order.buyerName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              )}
              <span>{order.buyerName}</span>
            </td>

            {/* Total Items */}
            <td className="p-2">{totalItems}</td>

            {/* Total Price */}
            <td className="p-2">${totalPrice.toFixed(2)}</td>

            {/* Status Dropdown */}
            <td className="p-2">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </td>

            {/* Actions */}
            <td className="p-2 flex gap-2">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => openOrderModal(order)}
              >
                View Details
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => deleteOrder(order._id)}
              >
                Cancel Order
              </button>
            </td>

          </tr>
        );
      })}
    </tbody>
  </table>
</div>

  );
}
