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

const salesData = [
  { month: "Sep 2025", revenue: 1200 },
  { month: "Oct 2025", revenue: 2500 },
  { month: "Nov 2025", revenue: 1800 },
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
        Sales in the Last 3 Months
      </h2>

      <IgrLegend ref={legendRef} orientation="Horizontal" />

      <div className="mt-4">
        <IgrCategoryChart
          ref={chartRef}
          chartType="Area"   
          dataSource={salesData}
          includedProperties={["month", "revenue"]}
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
