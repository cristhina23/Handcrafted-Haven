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

const data = [
  { year: "2018", europe: 30, china: 55, america: 45 },
  { year: "2019", europe: 35, china: 60, america: 50 },
  { year: "2020", europe: 40, china: 65, america: 55 },
  { year: "2021", europe: 45, china: 70, america: 60 },
];

export default function ChartSample() {
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
        Renewable Electricity Generated
      </h2>

      <IgrLegend ref={legendRef} orientation="Horizontal" />

      <div className="mt-4">
        <IgrCategoryChart
          ref={chartRef}
          chartType="Area"
          dataSource={data}
          includedProperties={["year", "europe", "china", "america"]}
          yAxisTitle="TWh"
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
