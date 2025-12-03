"use client";

import { useEffect, useRef } from "react";
import {
  IgrCategoryChart,
  IgrCategoryChartModule,
} from "igniteui-react-charts";

import {
  IgrLegend,
  IgrLegendModule,
} from "igniteui-react-charts";

IgrLegendModule.register();
IgrCategoryChartModule.register();

// 📊 Datos de ejemplo: últimos 3 meses
const data = [
  { month: "Sep 2025", revenue: 1200, orders: 15 },
  { month: "Oct 2025", revenue: 2500, orders: 30 },
  { month: "Nov 2025", revenue: 1800, orders: 22 },
];

export default function SalesChart() {
  const legendRef = useRef<IgrLegend | null>(null);
  const chartRef = useRef<IgrCategoryChart | null>(null);

  useEffect(() => {
    if (chartRef.current && legendRef.current) {
      chartRef.current.legend = legendRef.current;
    }
  }, []);

  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-white font-semibold mb-4">
        Sales Performance (Last 3 Months)
      </h2>

      <IgrLegend ref={legendRef} orientation="Horizontal" />

      <div className="mt-4">
        <IgrCategoryChart
          ref={chartRef}
          chartType="Line" 
          dataSource={data}
          includedProperties={["month", "revenue", "orders"]} 
          yAxisTitle="Revenue ($) / Orders"
          isHorizontalZoomEnabled={false}
          isVerticalZoomEnabled={false}
          computedPlotAreaMarginMode="Series"
          height="400px"
          width="100%"
        />
      </div>
    </div>
  );
}
