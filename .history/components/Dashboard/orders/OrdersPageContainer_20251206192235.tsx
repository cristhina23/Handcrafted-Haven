"use client";

import Image from "next/image";
import { useOrders } from "@/contexts/SellerOrdersContext";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { OrderClient } from "@/types";

interface Option {
  label: string;
  value: string;
}

export default function OrdersTable() {
  const { orders, loading, updateOrderStatus, deleteOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderClient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [localStatuses, setLocalStatuses] = useState<{ [orderId: string]: string }>({});
  const dropdownRefs = useRef<{ [orderId: string]: HTMLDivElement | null }>({});

  const statusOptions: Option[] = [
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ];

  // Cerrar dropdowns al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      Object.values(dropdownRefs.current).forEach(ref => {
        if (ref && !ref.contains(e.target as Node)) {
          ref.dataset.open = "false";
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openOrderModal = (order: OrderClient) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };
  const closeOrderModal = () => setModalOpen(false);

  if (loading) return <p className="p-4">Loading orders...</p>;
  if (!orders.length) return <p className="p-4">No orders found</p>;

  const toggleDropdown = (orderId: string) => {
    const isOpen = dropdownRefs.current[orderId]?.dataset.open === "true";
    dropdownRefs.current[orderId]!.dataset.open = isOpen ? "false" : "true";
  };

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
            const selectedStatus = localStatuses[order._id] || order.status;

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
                <td className="p-2 relative" ref={el => (dropdownRefs.current[order._id] = el)}>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleDropdown(order._id)}
                    className="flex items-center justify-between gap-2 px-3 py-2 bg-gray-100 border border-gray-400 rounded-md text-gray-700 text-sm w-32 dark:bg-gray-800 dark:text-slate-300"
                  >
                    <span>{statusOptions.find(o => o.value === selectedStatus)?.label || "Select"}</span>
                    <ChevronDownIcon
                      className={`size-4 transition-transform ${
                        dropdownRefs.current[order._id]?.dataset.open === "true" ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {dropdownRefs.current[order._id]?.dataset.open === "true" && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute top-full mt-2 bg-white shadow-md border border-gray-300 rounded-md py-2 text-sm z-50 w-32 dark:bg-gray-800 dark:text-slate-300"
                      >
                        {statusOptions.map(option => (
                          <button
                            key={option.value}
                            type="button"
                            className={`w-full text-left px-3 py-2 rounded transition-colors ${
                              selectedStatus === option.value
                                ? "bg-gray-200 text-gray-700 dark:bg-gray-700"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                            onClick={async () => {
                              setLocalStatuses(prev => ({ ...prev, [order._id]: option.value }));
                              await updateOrderStatus(order._id, option.value);
                              dropdownRefs.current[order._id]!.dataset.open = "false";
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </td>

                {/* Actions */}
                <td className="p-2 flex gap-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setSelectedOrder(order) || setModalOpen(true)}
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

      {/* Modal */}
      {modalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 max-w-3xl relative">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
              onClick={() => setModalOpen(false)}
            >
              X
            </button>
            {/* Aquí puedes mapear los productos, variantes, cantidad y datos de envío */}
            <pre className="text-sm">{JSON.stringify(selectedOrder, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
