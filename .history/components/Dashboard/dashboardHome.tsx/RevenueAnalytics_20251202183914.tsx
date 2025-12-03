"use client";

import { useEffect, useRef, useState } from "react";
import {
  IgrCategoryChart,
  IgrCategoryChartModule,
  IgrLegend,
  IgrLegendModule,
} from "igniteui-react-charts";
import { useOrderContext } from "@/contexts/OrderContext";

IgrLegendModule.register();
IgrCategoryChartModule.register();

export default function RevenueAnalytics() {
  const { analytics } = useOrderContext();
  const legendRef = useRef<IgrLegend | null>(null);
  const chartRef = useRef<IgrCategoryChart | null>(null);
  const [range, setRange] = useState("6M");

  
  useEffect(() => {
    if (chartRef.current && legendRef.current) {
      chartRef.current.legend = legendRef.current;
    }
  }, []);
  
  if (!analytics || !analytics.m) return <p>Loading chart...</p>;

  const monthlyData = analytics.monthlyAnalytics;

  const filteredData = {
    "1M": monthlyData.slice(-1),
    "6M": monthlyData.slice(-6),
    "1Y": monthlyData,
    "All": monthlyData,
  }[range];

  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-white font-semibold text-lg">Revenue Analytics</h2>

      <IgrLegend ref={legendRef} orientation="Horizontal" />

      <div className="mt-4">
        <IgrCategoryChart
          ref={chartRef}
          chartType="Area"
          dataSource={filteredData}
          includedProperties={["period", "monthlyRevenue"]}
          yAxisTitle="Revenue ($)"
          height="400px"
          width="100%"
        />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-white text-sm">
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">Current Week</p>
          <h3 className="text-xl font-bold">
            ${analytics.weeklyRevenue.toLocaleString()}
          </h3>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">Past Week</p>
          <h3 className="text-xl font-bold">
            ${analytics.pastWeekRevenue.toLocaleString()}
          </h3>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">Today’s Earnings</p>
          <h3 className="text-xl font-bold">
            ${analytics.todayEarnings.toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
}
