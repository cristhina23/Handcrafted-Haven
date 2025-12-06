"use client";

import DashboardCard from "./DashboardCard";
import { useOrderContext } from "@/contexts/OrderContext";

export default function CardsContainer() {
  const { stats } = useOrderContext();

  if (!stats) return <p>Loading... You should put a skeleton here</p>;

  const growth = stats.growthPercent ?? 0;
  const weeklyRevenue = stats.weeklyRevenue ?? 0;

  const balanceChangeType: "up" | "down" = growth >= 0 ? "up" : "down";

  const isNewSeller = stats.totalOrders === 0;

  const cardsForNewSeller = [
    {
      title: "Orders",
      value: stats.totalOrders.toLocaleString(),
      text: "You have not recieved any orders yet. Start selling to get started.",
      link: { text: "View Orders", href: "/dashboard/orders" },
      icon: "cart" as const,
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      text: "You don't have any revenue yet. Start selling to get rich.",
      link: "View Earnings",
      icon: "dollar" as const,
    },
    {
      title: "Customer",
      value: stats.totalCustomers.toLocaleString(),
      text: "You don't have any customer yet.",
      link: "All Customer",
      icon: "user" as const,
    },
    {
      title: "Balance",
      value: `$${stats.weeklyRevenue.toLocaleString()}`,
      text: "You don't have any balance yet.",
      link: "Withdraw Money",
      icon: "card" as const,
    },
  ];

  const cards = isNewSeller
    ? cardsForNewSeller
    : [
        {
          title: "Orders",
          value: stats.totalOrders.toLocaleString(),
          change: "-2.29%",
          changeType: "down" as const,
          link: { text: "View Orders", href: "/dashboard/orders" },
          icon: "cart" as const,
        },
        {
          title: "Revenue",
          value: `$${stats.totalRevenue.toLocaleString()}`,
          change: "2.29%",
          changeType: "up" as const,
          link: "View Earnings",
          icon: "dollar" as const,
        },
        {
          title: "Customer",
          value: stats.totalCustomers.toLocaleString(),
          change: "5.16%",
          changeType: "up" as const,
          link: "All Customer",
          icon: "user" as const,
        },
        {
          title: "Balance",
          value: `$${stats.weeklyRevenue.toLocaleString()}`,
          change: `${growth.toFixed(2)}%`, // ✔ corregido
          changeType: balanceChangeType,    // ✔ usa growth
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
