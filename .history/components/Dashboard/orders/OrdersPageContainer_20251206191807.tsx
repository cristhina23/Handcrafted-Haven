"use client";

import Image from "next/image";
import { useOrders } from "@/contexts/SellerOrdersContext";
import { useState, useEffect } from "react";
import { OrderClient } from "@/types";
import DropdownSelect from "@/components/DropdownSelect";

export default function OrdersTable() {
  const { orders, loading, updateOrderStatus, deleteOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderClient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [localStatuses, setLocalStatuses] = useState<{ [orderId: string]: string }>({});

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ];

  // Inicializa el estado local cuando cambian las órdenes
  useEffect(() => {
    const initialStatuses: { [id: string]: string } = {};
    orders.forEach(order => {
      initialStatuses[order._id] = order.status;
    });
    setLocalStatuses(initialStatuses);
  }, [orders]);

  const openOrderModal = (order: OrderClient) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };
  const closeOrderModal = () => setModalOpen(false);

  if (loading) return <p className="p-4">Loading orders...</p>;
  if (!orders.length) return <p className="p-4">No orders found</p>;

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
                  <DropdownSelect
                    options={statusOptions}
                    value={localStatuses[order._id] || order.status}
                    widthClass="w-32"
                    onChange={async (newStatus) => {
                      // Actualiza localmente para reflejar el cambio inmediatamente
                      setLocalStatuses(prev => ({ ...prev, [order._id]: newStatus }));
                      // Actualiza en la base de datos
                      await updateOrderStatus(order._id, newStatus);
                    }}
                  />
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

      {/* Modal placeholder */}
      {modalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 max-w-3xl">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
              onClick={closeOrderModal}
            >
              X
            </button>
            {/* Aquí puedes listar los productos y la info de la orden */}
            <pre className="text-sm">{JSON.stringify(selectedOrder, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
