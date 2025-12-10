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
    <Card className="md:p-6  rounded-xl shadow-lg  ">
      <CardHeader>
        <div className="flex justify-between">
        <CardTitle className="text-lg font-bold">Recent Orders</CardTitle>
          <Link href="/dashboard/orders">
            <CardDescription className="flex gap-2">View All  Orders <ArrowRight /></CardDescription>
          </Link>
        </div>
          <CardDescription>Last 10 orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {isEmpty ? (
            <p className="text-sm text-slate-500">No orders found</p>
          ) : (
            
          )}
        </div>
      </CardContent>
    </Card>
  );
}

