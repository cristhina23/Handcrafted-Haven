"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/c";

const data = [
  {
    day: "Mon",
    current: 420,
    last: 380,
  },
  {
    day: "Tue",
    current: 510,
    last: 460,
  },
  {
    day: "Wed",
    current: 610,
    last: 590,
  },
  {
    day: "Thu",
    current: 480,
    last: 520,
  },
  {
    day: "Fri",
    current: 700,
    last: 640,
  },
  {
    day: "Sat",
    current: 680,
    last: 600,
  },
  {
    day: "Sun",
    current: 750,
    last: 720,
  },
];

export default function RevenueAreaChart() {
  return (
    <ChartContainer
      className="h-[350px] w-full bg-card p-4 rounded-xl shadow-sm"
    >
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="4 4" className="opacity-20" />

        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
        />

        <Tooltip content={<ChartTooltipContent />} />

        {/* Current Week */}
        <Area
          type="monotone"
          dataKey="current"
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1) / 0.3)"
          strokeWidth={2}
        />

        {/* Last Week */}
        <Area
          type="monotone"
          dataKey="last"
          stroke="hsl(var(--chart-2))"
          fill="hsl(var(--chart-2) / 0.2)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
