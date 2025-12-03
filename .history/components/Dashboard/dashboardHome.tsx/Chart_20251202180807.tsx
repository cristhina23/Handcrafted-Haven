"use client";

import { useEffect, useRef, useState } from "react";
import {
  IgrCategoryChart,
  IgrCategoryChartModule,
  IgrLegend,
  IgrLegendModule,
} from "igniteui-react-charts";

IgrLegendModule.register();
IgrCategoryChartModule.register();

const fullData = [
  { period: "Jan", weeklyRevenue: 300, monthlyRevenue: 1200 },
  { period: "Feb", weeklyRevenue: 400, monthlyRevenue: 1600 },
  { period: "Mar", weeklyRevenue: 350, monthlyRevenue: 1400 },
  { period: "Apr", weeklyRevenue: 500, monthlyRevenue: 2000 },
  { period: "May", weeklyRevenue: 450, monthlyRevenue: 1800 },
  { period: "Jun", weeklyRevenue: 700, monthlyRevenue: 2800 },
  { period: "Jul", weeklyRevenue: 600, monthlyRevenue: 2400 },
];

export default function RevenueAnalytics() {
  const legendRef = useRef<IgrLegend | null>(null);
  const chartRef = useRef<IgrCategoryChart | null>(null);
  const [range, setRange] = useState("6M");

  useEffect(() => {
    if (chartRef.current && legendRef.current) {
      chartRef.current.legend = legendRef.current;
    }
  }, []);

  const filteredData = {
    "1M": fullData.slice(-1),
    "6M": fullData.slice(-6),
    "1Y": fullData,
    "All": fullData,
  }[range];

  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-semibold text-lg">
          Revenue Comparison (Weekly vs Monthly)
        </h2>
        <div className="flex gap-2">
          {["All", "1M", "6M", "1Y"].map(label => (
            <button
              key={label}
              onClick={() => setRange(label)}
              className={`px-3 py-1 text-sm rounded ${
                range === label ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <IgrLegend ref={legendRef} orientation="Horizontal" />

      {/* Chart */}
      <div className="mt-4">
        <IgrCategoryChart
          ref={chartRef}
          chartType="Area"
          dataSource={filteredData}
          includedProperties={["period", "weeklyRevenue", "monthlyRevenue"]}
          yAxisTitle="Revenue ($)"
          isHorizontalZoomEnabled={false}
          isVerticalZoomEnabled={false}
          computedPlotAreaMarginMode="Series"
          height="400px"
          width="100%"
        />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-white text-sm">
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">Current Week</p>
          <h3 className="text-xl font-bold">$235,965</h3>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">Past Week</p>
          <h3 className="text-xl font-bold">$198,214</h3>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">Today’s Earnings</p>
          <h3 className="text-xl font-bold">$2,562.30</h3>
        </div>
      </div>
    </div>
  );
}
