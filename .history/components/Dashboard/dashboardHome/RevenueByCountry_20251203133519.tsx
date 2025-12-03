"use client";

import { useOrderContext } from "@/contexts/OrderContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";

export default function RevenueByCountry() {
  const { revenueByCountry } = useOrderContext();

  // Convertimos el objeto en array usable por Recharts
  const data = Object.entries(revenueByCountry).map(([country, revenue]) => ({
    country,
    revenue,
  }));

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#3b82f6",
    },
  };

  return (
    <div className="w-full p-4">
      {/* <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer> */}

      <Card></Card>

      {/* LISTA DE PAISES Y REVENUE */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Top countries by revenue</h3>
        <ul className="text-sm text-slate-600">
          {data.map((item) => (
            <li key={item.country} className="flex justify-between py-1">
              <span>{item.country}</span>
              <span className="font-medium">${item.revenue}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
