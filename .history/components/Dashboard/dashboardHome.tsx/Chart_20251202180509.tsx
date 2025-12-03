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

// 📊 Datos de ejemplo: últimos 3 meses con revenue semanal y mensual
const data = [
  { period: "Sep 2025", weeklyRevenue: 300, monthlyRevenue: 1200 },
  { period: "Oct 2025", weeklyRevenue: 600, monthlyRevenue: 2500 },
  { period: "Nov 2025", weeklyRevenue: 450, monthlyRevenue: 1800 },
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
        Revenue Comparison (Weekly vs Monthly)
      </h2>

      <IgrLegend ref={legendRef} orientation="Horizontal" />

      <div className="mt-4">
        <IgrCategoryChart
          ref={chartRef}
          chartType="Area" // 👈 Área para ver colores superpuestos
          dataSource={data}
          includedProperties={["period", "weeklyRevenue", "monthlyRevenue"]}
          yAxisTitle="Revenue ($)"
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
