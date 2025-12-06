"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useOrderContext } from "@/contexts/OrderContext" // Ajusta la ruta según tu proyecto

// Colores automáticos para cada producto
const defaultColors = [
  "#3b82f6", "#f97316", "#10b981", "#f43f5e", "#8b5cf6",
  "#facc15", "#14b8a6", "#ec4899", "#f87171", "#4ade80",
]

export function TopSellingProductsChart() {
  const { bestSellers: soldProducts } = useOrderContext()

  // Convertimos soldProducts a array compatible con Recharts
  const chartData = React.useMemo(() => {
    return Object.entries(soldProducts).map(([product, quantity], index) => ({
      product,
      quantity,
      fill: defaultColors[index % defaultColors.length],
    }))
  }, [soldProducts])

  const totalSold = React.useMemo(
    () => Object.values(soldProducts).reduce((acc, curr) => acc + curr, 0),
    [soldProducts]
  )

  const chartConfig: ChartConfig = React.useMemo(() => {
  const config: ChartConfig = {}
  chartData.forEach((item, index) => {
    config[item.product] = {
      label: item.product,
      color: item.fill,
    }
  })
  return config
}, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Sales Overview</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="quantity"
              nameKey="product"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry) => (
                <Cell key={entry.product} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSold.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Products Sold
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total products sold
        </div>
      </CardFooter>
    </Card>
  )
}
