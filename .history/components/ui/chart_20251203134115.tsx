/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { cn } from "@/lib/scripts/utils";

// CONFIG
export type ChartConfig = {
  [key: string]: {
    label: string;
    color: string;
  };
};

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children?: React.ReactNode;
}

export function ChartContainer({
  config,
  className,
  children,
  style,
  ...props
}: ChartContainerProps) {
  const firstKey = Object.keys(config || {})[0];
  const firstColor = firstKey ? config[firstKey].color : undefined;

  const mergedStyle: React.CSSProperties = {
    ...(style as React.CSSProperties),
    ...(firstColor ? { ["--chart-1" as any]: firstColor } : {}),
  };

  return (
    <div
      className={cn("relative flex w-full flex-col", className)}
      {...props}
      style={mergedStyle}
    >
      {children}
    </div>
  );
}

// 🟡 Tooltip para Recharts (NO usa shadcn)
interface RechartsPayloadItem {
  name?: string;
  value?: any;
  [key: string]: any;
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: RechartsPayloadItem[] | any;
  hideLabel?: boolean;
}

export function ChartTooltipContent({
  active,
  payload,
  hideLabel = false,
}: ChartTooltipContentProps) {
  const items = Array.isArray(payload) ? payload : payload ? [payload] : [];

  if (!active || !items.length) return null;

  const item = items[0];

  return (
    <div className="p-2 rounded-md bg-slate-900/90 text-white shadow-md border border-slate-800 text-sm">
      {!hideLabel && item?.name && (
        <p className="font-medium">{String(item.name)}</p>
      )}
      <p className="opacity-80">{String(item?.value ?? "")}</p>
    </div>
  );
}
