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
  const { analytics, stats } = useOrderContext(); 
  const legendRef = useRef<IgrLegend | null>(null);
  const chartRef = useRef<IgrCategoryChart | null>(null);
  const [range, setRange] = useState("1M");
  const [axisColor, setAxisColor] = useState("#1e293b"); // dark: slate-800 text

  useEffect(() => {
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setAxisColor(isDark ? "#cbd5e1" : "#1e293b"); 
    };

    updateColor();

    const observer = new MutationObserver(() => updateColor());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const currentWeekRevenue =
    analytics?.weeklyAnalytics?.[analytics.weeklyAnalytics.length - 1]?.revenue ?? 0;

  const pastWeekRevenue =
    analytics?.weeklyAnalytics?.[analytics.weeklyAnalytics.length - 2]?.revenue ?? 0;

  useEffect(() => {
    if (chartRef.current && legendRef.current) {
      chartRef.current.legend = legendRef.current;
    }
  }, []);

  if (!analytics) return <p>Loading chart...</p>;

  let filteredWeeks = analytics.weeklyAnalytics || [];
  let filteredMonths = analytics.monthlyAnalytics || [];

  switch (range) {
    case "1w":
      filteredWeeks = filteredWeeks.slice(-1);
      break;
    case "1M":
      filteredWeeks = filteredWeeks.slice(-4);
      filteredMonths = filteredMonths.slice(-1);
      break;
    case "3M":
      filteredWeeks = filteredWeeks.slice(-12);
      filteredMonths = filteredMonths.slice(-3);
      break;
  }

  const chartData = filteredWeeks.map(w => ({
    period: `${w.start} - ${w.end}`,
    revenue: w.revenue,
  }));

  return (
    <div className="flex flex-col bg-white border border-slate-200 dark:border-none dark:bg-slate-800 p-6 rounded-xl shadow-lg md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">Revenue Analytics</h2>

        <div className="flex gap-2 pb-2">
          {["1w", "1M", "3M", "All"].map(label => (
            <button
              key={label}
              onClick={() => setRange(label)}
              className={`px-3 py-1 text-sm rounded ${
                range === label
                  ? "bg-blue-500 text-white"
                  : "bg-slate-300 dark:bg-slate-700 dark:text-slate-300"
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
          dataSource={chartData}
          includedProperties={["period", "revenue"]}
          yAxisTitle="Revenue ($)"
          isHorizontalZoomEnabled={false}
          isVerticalZoomEnabled={false}
          computedPlotAreaMarginMode="Series"
          height="400px"
          width="100%"

          
          xAxisLabelTextColor={axisColor}
          yAxisLabelTextColor={axisColor}
          yAxisTitleTextColor={axisColor}
          xAxisLabelTextStyle="12px"
          yAxisLabelTextStyle="12px"
          yAxisTitleTextStyle="14px"
        />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm">
        <div className="bg-slate-300 dark:bg-slate-700 p-4 rounded-lg">
          <p className="text-slate-900 dark:slate-">Current Week</p>
          <h3 className="text-xl font-bold">
            ${stats?.weeklyRevenue?.toLocaleString() ?? 0}
          </h3>
        </div>

        <div className="bg-slate-300 dark:bg-slate-700 p-4 rounded-lg">
          <p>Past Week</p>
          <h3 className="text-xl font-bold">
            ${pastWeekRevenue.toLocaleString() ?? 0}
          </h3>
        </div>

        <div className="bg-slate-300 dark:bg-slate-700 p-4 rounded-lg">
          <p>Today’s Earnings</p>
          <h3 className="text-xl font-bold">
            ${stats?.todayEarnings?.toLocaleString() ?? 0}
          </h3>
        </div>
      </div>
    </div>
  );
}
