"use client";

import DashboardCard from "./DashboardCard";
import { useOrderContext } from "@/contexts/OrderContext";

export default function CardsContainer() {
  const { stats } = useOrderContext();

  if (!stats) return <p>Loading...</p>; 

  const cards = [
    {
      title: "Orders",
      value: stats.totalOrders.toLocaleString(), 
      change: "-2.29%",
      changeType: "down" as const,
      link: "View Orders",
      icon: "cart" as const,
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`, // usa los datos reales
      change: "2.29%",
      changeType: "up" as const,
      link: "View Earnings",
      icon: "dollar" as const,
    },
    {
      title: "Customer",
      value: stats.totalCustomers.toLocaleString(), // usa los datos reales
      change: "5.16%",
      changeType: "up" as const,
      link: "All Customer",
      icon: "user" as const,
    },
    {
      title: "Balance",
      value: "$35.64k",
      changeType: "none" as const,
      link: "Withdraw Money",
      icon: "card" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {cards.map((item, i) => (
        <DashboardCard key={i} {...item} />
      ))}
    </div>
  );
}
