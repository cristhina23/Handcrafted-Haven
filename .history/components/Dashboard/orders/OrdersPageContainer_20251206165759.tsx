"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/types";
import { useOrders } from "@/contexts/SellerOrdersContext";useProducts

export default function OrdersTableShadCN() {
  const { orders, loading, refreshOrders } = useOrders();

  // PAGINACION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="overflow-x-auto rounded-md shadow-2xl">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-slate-200 dark:bg-gray-800">
          <tr>
            <th className="p-4 text-left">Order ID</th>
            <th className="p-4 text-left">Buyer</th>
            <th className="p-4 text-left">Items</th>
            <th className="p-4 text-left w-28">Total</th>
            <th className="p-4 text-left w-28">Status</th>
            <th className="p-4 text-center w-32">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {currentOrders.map((o) => (
            <tr key={o._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <td className="p-4">{o._id.slice(0, 8)}...</td>
              <td className="p-4">{o.buyerName}</td>
              <td className="p-4">
                {o.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.title} x{item.quantity}</span>
                    <span>${item.priceAtPurchase.toFixed(2)}</span>
                  </div>
                ))}
              </td>
              <td className="p-4">${o.total.toFixed(2)}</td>
              <td className="p-4 capitalize">{o.status}</td>
              <td className="p-4 flex justify-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => alert("Ver detalles")}>
                  View
                </Button>
                <Button size="sm" variant={o.status === "pending" ? "destructive" : "secondary"} onClick={() => alert("Cambiar estado")}>
                  {o.status === "pending" ? "Ship" : "Update"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINACION */}
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
    </div>
  );
}
