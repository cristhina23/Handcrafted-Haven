"use client";

import { useOrders } from "@/contexts/SellerOrdersContext";
import Image from "next/image";

interface OrdersTableProps {
  sellerId: string;
}

export default function OrdersTable({ sellerId }: OrdersTableProps) {
  const { orders, loading } = useOrders();

  if (loading) return <p className="p-4">Loading...</p>;
  if (!orders || orders.length === 0) return <p className="p-4">No orders found</p>;

  return (
    <div className="overflow-x-auto rounded-md shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-slate-200 dark:bg-gray-800">
          <tr>
            <th className="p-4 text-left">Product</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Seller Total</th>
            <th className="p-4 text-left">Created At</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order: any) => {
            
            const sellerItems = order.items.filter(
              (item: any) => item.sellerId && item.sellerId.$oid === sellerId
            );
            if (sellerItems.length === 0) return null;

            const total = sellerItems.reduce((sum: number, item: any) => sum + item.subtotal, 0);

            return (
              <tr key={order._id.$oid} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="p-2">
                  <Image
                    src={order.items.productId.images[0]}
                    alt={order.items.productId.images[0]}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  {order.items.productId.name}
                </td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">${total.toFixed(2)}</td>
                <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
