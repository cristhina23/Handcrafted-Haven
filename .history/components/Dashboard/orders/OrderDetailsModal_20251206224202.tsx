"use client";

import { OrderClient } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface OrderDetailsModalProps {
  order: OrderClient | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-3xl relative"
          >
            <h2 className="text-xl font-bold mb-4">Order Details</h2>

            {/* Buyer info */}
            <div className="flex items-center gap-4 mb-4">
              {order.buyerImage && (
                <img
                  src={order.buyerImage}
                  alt={order.buyerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold">{order.buyerName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total: ${order.total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Status: {order.status}</p>
              </div>
            </div>

            {/* Items */}
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-2 text-left">Product</th>
                    <th className="p-2 text-left">Price</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2 flex items-center gap-2">
                        {item.productImage && (
                          <img
                            src={item.productImage}
                            alt={item.productTitle}
                            className="w-10 h-10 object-cover rounded"
                          />
                        )}
                        {item.productTitle}
                      </td>
                      <td className="p-2">${item.price.toFixed(2)}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">${item.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Close button */}
            <button
              className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={onClose}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
