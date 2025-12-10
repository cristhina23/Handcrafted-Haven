"use client";

import { useOrderContext } from "@/contexts/OrderContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";


export default function RevenueByCountry() {
  const { revenueByCountry  } = useOrderContext();
  const [axisColor, setAxisColor] = useState("#1e293b");

  useEffect(() => {
  
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setAxisColor(isDark ? "#e2e8f0" : "#1e293b");
    };

    
    updateColor();

  
    const observer = new MutationObserver(() => updateColor());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  
  const data = Object.entries(revenueByCountry).map(([country, revenue]) => ({
    country,
    revenue,
  }));

  const isEmpty = data.length === 0;

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#3b82f6",
    },
  };

  return (
    <div className="w-full  flex gap-8 rounded-xl shadow-lg">
     <div className="flex-1">
       <Card>
        <CardHeader>
        <CardTitle className="font-bold text-xl text-slate-900 dark:text-slate-300">Revenue By Country</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
      </CardHeader>
       {isEmpty ? (
        <CardContent>
          <p className="">No revenue yet… Every great seller starts from zero. This space will soon be filled with revenues!</p>
        </CardContent>
      ) : (
        <ChartContainer config={chartConfig} className="border md:p-8">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={data}
              layout="vertical"
              margin={{
                      left: 20,
                    }}
            >
              <XAxis 
                type="number" 
                tick={{ fill: axisColor }}
                tickLine={{ stroke: axisColor }}
                axisLine={{ stroke: axisColor }}
              />
              <YAxis 
                type="category" 
                dataKey="country"
                tick={{ fill: axisColor }}
                tickLine={{ stroke: axisColor }}
                axisLine={{ stroke: axisColor }}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </Card>
     </div>



      {/* COUNTRY REVENUE */}
      {/* <div className="mt-4 flex-1">
        <h3 className="font-semibold mb-2">Top countries by revenue</h3>
        <ul className="text-sm text-slate-600">
          {data.map((item) => (
            <li key={item.country} className="flex justify-between py-1">
              <span>{item.country}</span>
              <span className="font-medium">${item.revenue}</span>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
