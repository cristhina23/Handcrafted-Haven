"use client";

import { OrderClient } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";

interface OrderDetailsModalProps {
  order: OrderClient | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  if (!order) return null;

  const toggleItem = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-4xl relative overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-xl font-bold mb-4">Order Details</h2>

            {/* Buyer Info */}
            <div className="mb-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-700">
              <p className="font-semibold text-lg mb-2">Buyer Info</p>
              <div className="flex items-center gap-4 mb-2">
                {order.buyerImage && (
                  <Image
                    height={50}
                    width={50}
                    src={order.buyerImage}
                    alt={order.buyerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="flex w-full ">
                  <div className="fk">
                  <p className="font-semibold">{order.buyerName}</p>
                  {order.buyerEmail && <p>Email: {order.buyerEmail}</p>}
                  {order.buyerPhone && <p>Phone: {order.buyerPhone}</p>}
                  
                  {order.shippingMethod && <p>Shipping Method: {order.shippingMethod}</p>}
                  <p>Status: {order.status}</p>
                  <p>Total: ${order.total.toFixed(2)}</p>
                </div>
                {order.buyerAddress &&
                   <div className="flex-1">
                    <p>Street: {order.buyerAddress.street}</p>
                    <p>City: {order.buyerAddress.city}</p>
                    <p>State: {order.buyerAddress.state}</p>
                    <p>ZIP: {order.buyerAddress.zipCode}</p>
                    <p>Country: {order.buyerAddress.country}</p>
                  </div>}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <p className="font-semibold text-lg mb-2">Items</p>
              {order.items.map((item, idx) => {
                const isExpanded = expandedItems.includes(idx);
                return (
                  <div
                    key={idx}
                    className="mb-2 border rounded-md overflow-hidden dark:border-gray-700"
                  >
                    <motion.button
                      onClick={() => toggleItem(idx)}
                      className="flex items-center justify-between w-full p-3 bg-gray-100 dark:bg-gray-700 text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        {item.productImage && (
                          <img
                            src={item.productImage}
                            alt={item.productTitle}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <span className="font-medium">{item.productTitle}</span>
                      </div>
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </motion.button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="p-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700"
                        >
                          <p>Price: ${item.price.toFixed(2)}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Subtotal: ${item.subtotal.toFixed(2)}</p>
                         {/*  {item.color && <p>Color: {item.color}</p>}
                          {item.size && <p>Size: {item.size}</p>}
                          {item.notes && <p>Notes: {item.notes}</p>} */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
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
