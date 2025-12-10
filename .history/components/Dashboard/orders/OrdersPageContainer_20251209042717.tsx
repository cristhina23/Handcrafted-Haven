"use client";

import Image from "next/image";
import { useOrders } from "@/contexts/SellerOrdersContext";
import { useState, useRef, useEffect } from "react";
import { OrderClient } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import DynamicSortSelector from "@/components/DynamicSortSelector";
import OrderDetailsModal from "./OrderDetailsModal";
import { Button } from "@/components/ui/button";

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
  const [localStatuses, setLocalStatuses] = useState<{ [orderId: string]: string }>({});
  const [sortBy, setSortBy] = useState<keyof typeof sortOptions>("newest");
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;

 
  
    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ];

  const sortOptions = {
    newest: "Newest → Oldest",
    oldest: "Oldest → Newest",
    totalItemsAsc: "Total Items ↑",
    totalItemsDesc: "Total Items ↓",
    totalPriceAsc: "Total Price ↑",
    totalPriceDesc: "Total Price ↓",
    status: "By Status",
  } as const;

   useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(1);
    }, [sortBy]);

 

  const openOrderModal = (order: OrderClient) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };
  const closeOrderModal = () => {
  setSelectedOrder(null);
  setModalOpen(false);
};

  const sortedOrders = orders.slice().sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "totalItemsAsc":
        return a.items.reduce((sum, i) => sum + i.quantity, 0) - b.items.reduce((sum, i) => sum + i.quantity, 0);
      case "totalItemsDesc":
        return b.items.reduce((sum, i) => sum + i.quantity, 0) - a.items.reduce((sum, i) => sum + i.quantity, 0);
      case "totalPriceAsc":
        return a.items.reduce((sum, i) => sum + i.subtotal, 0) - b.items.reduce((sum, i) => sum + i.subtotal, 0);
      case "totalPriceDesc":
        return b.items.reduce((sum, i) => sum + i.subtotal, 0) - a.items.reduce((sum, i) => sum + i.subtotal, 0);
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage);

   
    if (loading) return <p className="p-4">Loading orders...</p>;
    if (!orders.length) return  (
    <div className="p-8 text-center text-gray-500 dark:text-gray-400 border rounded-xl bg-white dark:bg-gray-800">
      No orders found.
    </div>
  );

  return (
    <div>
      {/* Sort Selector */}
      <div className="mb-4 w-48">
        <DynamicSortSelector
          options={sortOptions}
          defaultValue="newest"
          onChange={(val) => setSortBy(val)}
        />
      </div>

      <div className="overflow-x-auto rounded-md shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-slate-200 dark:bg-gray-800">
            <tr>
              <th className="p-4 text-left">Buyer</th>
              <th className="p-4 text-left">Total Items</th>
              <th className="p-4 text-left">Total Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedOrders.map(order => {
              const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
              const totalPrice = order.items.reduce((sum, item) => sum + item.subtotal, 0);
              const createdAt = new Date(order.createdAt).toLocaleString();

              return (
                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
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
                  <td className="p-2">{totalItems}</td>
                  <td className="p-2">${totalPrice.toFixed(2)}</td>
                  <td className="p-2">
                    <StatusDropdown
                      options={statusOptions}
                      value={localStatuses[order._id] || order.status}
                      onChange={async (newStatus) => {
                        setLocalStatuses(prev => ({ ...prev, [order._id]: newStatus }));
                        try {
                          await updateOrderStatus(order._id, newStatus);
                        } catch (err) {
                          console.error(err);
                          setLocalStatuses(prev => ({ ...prev, [order._id]: order.status }));
                        }
                      }}
                    />
                  </td>
                  <td className="p-2">{createdAt.split(",")[0]}</td>
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

        <div className="flex justify-between items-center mt-4 p-2">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>

        {modalOpen && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            isOpen={modalOpen}
            onClose={closeOrderModal}
           />
        )}
      </div>
    </div>
  );
}
