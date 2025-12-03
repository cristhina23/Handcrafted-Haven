"use client";

import * as React from "react";
import { cn } from "@/lib";

export function ChartContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col rounded-xl border bg-card p-4 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
      <p className="text-sm font-medium">{label}</p>
      {payload.map((item, i) => (
        <p key={i} className="text-sm text-muted-foreground">
          {item.name}: <span className="font-semibold">{item.value}</span>
        </p>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartTooltipContent(props: any) {
  return <ChartTooltip {...props} />;
}
