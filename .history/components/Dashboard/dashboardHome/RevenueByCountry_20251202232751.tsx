"use client";

import React, { useEffect, useState } from "react";
import {
  IgrDataChartCoreModule,
  IgrDataChartCategoryModule,
  IgrDataChartCategoryCoreModule,
  IgrDataChartInteractivityModule,
  IgrDataChartVerticalCategoryModule,
  IgrAnnotationLayerProxyModule,
  IgrCalloutLayerModule,
  IgrDataChartAnnotationModule,
} from "@infragistics/igniteui-react-charts";

import {
  IgrDataChart,
  IgrCategoryYAxis,
  IgrNumericXAxis,
  IgrCategoryHighlightLayer,
  IgrBarSeries,
  IgrCalloutLayer,
  IgrDataToolTipLayer,
} from "@infragistics/igniteui-react-charts";

const modules = [
  IgrDataChartCoreModule,
  IgrDataChartCategoryModule,
  IgrDataChartCategoryCoreModule,
  IgrDataChartInteractivityModule,
  IgrDataChartVerticalCategoryModule,
  IgrAnnotationLayerProxyModule,
  IgrCalloutLayerModule,
  IgrDataChartAnnotationModule,
];
modules.forEach((m) => m.register());

export default function CountryRevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/revenue/countries");
      const json = await res.json();

      const arr = Object.entries(json).map(([country, revenue]) => ({
        country,
        revenue,
      }));

      setData(arr);
    }

    load();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Revenue por País</h2>

      <div className="h-[400px]">
        <IgrDataChart
          isHorizontalZoomEnabled={false}
          isVerticalZoomEnabled={false}
        >
          <IgrCategoryYAxis
            name="yAxis"
            label="country"
            dataSource={data}
            isInverted="true"
            gap="0.75"
          />
          <IgrNumericXAxis
            name="xAxis"
            minimumValue={0}
            labelFormat="{0}"
          />

          <IgrCategoryHighlightLayer />

          <IgrBarSeries
            name="BarSeries1"
            xAxisName="xAxis"
            yAxisName="yAxis"
            valueMemberPath="revenue"
            dataSource={data}
            showDefaultTooltip={true}
            isTransitionInEnabled={true}
            isHighlightingEnabled={true}
            brush="rgba(56, 139, 207, 1)"
            outline="rgba(6, 88, 138, 1)"
          />

          <IgrCalloutLayer
            isAutoCalloutBehaviorEnabled={true}
            calloutTextColor="black"
          />

          <IgrDataToolTipLayer />
        </IgrDataChart>
      </div>
    </div>
  );
}
