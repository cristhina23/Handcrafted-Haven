"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ChartRevenueByCountry() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/revenue-by-country"); // tu endpoint
      const json = await res.json();

      // json es un objeto tipo { Peru: 100, Venezuela: 50, USA: 80 }
      const formatted = Object.entries(json).map(([country, revenue]) => ({
        country,
        revenue,
      }));

      setData(formatted);
    }

    load();
  }, []);

  const chartConfig: ChartConfig = {
    revenue: {
      label: "Revenue",
      color: "var(--chart-1)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Country</CardTitle>
        <CardDescription>Last 3 months</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data} layout="vertical" margin={{ left: -20 }}>
            <XAxis type="number" dataKey="revenue" hide />
            <YAxis
              dataKey="country"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Top countries by revenue <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Data calculated from customer orders
        </div>
      </CardFooter>
    </Card>
  );
}
