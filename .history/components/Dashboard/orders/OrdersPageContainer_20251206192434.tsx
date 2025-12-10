"use client";

import Image from "next/image";
import { useOrders } from "@/contexts/SellerOrdersContext";
import { useState, useRef, useEffect } from "react";
import { OrderClient } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  value?: string | null;
  onChange?: (value: string) => void;
  widthClass?: string;
}

function StatusDropdown({ options, value = null, onChange, widthClass = "w-32" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(prev => !prev)}
        className={`flex items-center justify-between gap-2 px-3 py-2 bg-gray-100 border border-gray-400 rounded-md text-gray-700 text-sm transition-all dark:bg-gray-800 dark:text-slate-300 ${widthClass}`}
      >
        <span>{selected?.label || "Select status"}</span>
        <ChevronDownIcon className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className={`absolute top-full right-0 mt-2 bg-white shadow-md border border-gray-300 rounded-md py-2 text-sm z-50 dark:bg-gray-800 dark:text-slate-300 ${widthClass}`}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange?.(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  value === opt.value
                    ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-slate-200"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OrdersTable() {
  const { orders, loading, updateOrderStatus, deleteOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderClient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ];

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
                  <StatusDropdown
                    options={statusOptions}
                    value={order.status}
                    onChange={(newStatus) => updateOrderStatus(order._id, newStatus)}
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

      {/* Modal de detalles de la orden (opcional, puedes implementarlo) */}
      {modalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-3/4 max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Order Details</h2>
            {/* Aquí renderizas los productos, cantidades, tallas, método de envío, etc */}
            <button
              className="mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              onClick={closeOrderModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
