"use client";

import { useOrderContext } from "@/contexts/OrderContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltip } from "@/components/ui/ChartTooltip";
import { TrendingUp } from "lucide-react";

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
    <div className="w-full p-4 flex gap">
     <div className="flex-2">
       <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={data}
          layout="vertical"
          margin={{
                  left: 20,
                }}
        >
          <XAxis type="number" /> {/* valores */}
          <YAxis type="category" dataKey="country" /> {/* categorías */}
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
     </div>



      {/* LISTA DE PAISES Y REVENUE */}
      <div className="mt-4 flex-1">
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
