"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Buyer {
  fullName: string;
  image?: string;
}

interface OrderItem {
  productId: { title: string };
  quantity: number;
  priceAtPurchase: number;
}

interface Order {
  _id: string;
  buyerId: Buyer;
  items: OrderItem[];
  grandTotal: number;
  createdAt: string;
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const isEmpty = orders.length === 0;  

  useEffect(() => {
    fetch("/api/dashboard/last-orders", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Card className="h-full md:p-6   rounded-xl shadow-lg  ">
      <CardHeader>
        <div className="flex justify-between">
        <CardTitle className="text-xl font-bold ">Recent Orders</CardTitle>
          <Link href="/dashboard/orders">
            <CardDescription className="flex gap-2">View All  Orders <ArrowRight /></CardDescription>
          </Link>
        </div>
          <CardDescription>Last 10 orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {isEmpty ? (
            <p className="text-md text-slate-500">No orders found yet.. Start selling!</p>
          ) : (
            <table className="w-full table-auto border-collapse text-sm text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Customer</th>
                <th className="py-2">Order Total</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-slate-300/70 dark:hover:bg-slate-600">
                  <td className="py-2 flex items-center gap-2">
                    {order.buyerId.image ? (
                      <>
                        <Image
                        width={32}
                        height={32}
                        src={order.buyerId.image}
                        alt={order.buyerId.fullName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{order.buyerId.fullName}</span>
                      </>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center">
                        {order.buyerId.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                  </td>
                  <td className="py-2 font-medium">${order.grandTotal.toFixed(2)}</td>
                  <td className="py-2 text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

