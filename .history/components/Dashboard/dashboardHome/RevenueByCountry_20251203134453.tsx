"use client";

import { useOrderContext } from "@/contexts/OrderContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltip } from "@/components/ui/ChartTooltip";

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

      <Card>
        <CardHeader>
          <CardTitle>Revenue By Country</CardTitle>
          <CardDescription>Last 3 months</CardDescription>
        </CardHeader>
         <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      </Card>

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
