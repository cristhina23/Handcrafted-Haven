"use client";

import DashboardCard from "./";

export default function CardsContainer() {
  const cards = [
    {
      title: "Orders",
      value: "5,312",
      change: "-2.29%",
      changeType: "down",
      link: "View Orders",
      icon: "cart",
    },
    {
      title: "Revenue",
      value: "$8,312",
      change: "2.29%",
      changeType: "up",
      link: "View Earnings",
      icon: "dollar",
    },
    {
      title: "Customer",
      value: "$15,312",
      change: "5.16%",
      changeType: "up",
      link: "All Customer",
      icon: "user",
    },
    {
      title: "Balance",
      value: "$35.64k",
      changeType: "none",
      link: "Withdraw Money",
      icon: "card",
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
