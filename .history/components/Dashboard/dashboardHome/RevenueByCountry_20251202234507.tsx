"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

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
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useOrderContext } from "@"; 

type CountryRevenue = { country: string; revenue: number };

export function ChartRevenueByCountry() {
  const { revenueByCountry } = useOrderContext();

  // Convierte tu objeto { Peru: 100, USA: 50 } => array [{country,revenue}]
  const data: CountryRevenue[] = Object.entries(revenueByCountry).map(
    ([country, revenue]) => ({
      country,
      revenue: Number(revenue) || 0,
    })
  );

  // Opcional: ordenamos por revenue (de mayor a menor)
  data.sort((a, b) => b.revenue - a.revenue);

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
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: -20 }}>
                <XAxis type="number" dataKey="revenue" hide />
                <YAxis
                  dataKey="country"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />

                
                <RechartsTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />

                <Bar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  radius={5}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Top countries by revenue <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Based on confirmed orders
        </div>
      </CardFooter>
    </Card>
  );
}
