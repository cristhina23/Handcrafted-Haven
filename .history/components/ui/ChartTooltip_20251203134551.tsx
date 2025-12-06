import * as React from "react";
import { TooltipProps } from "recharts";
import { ChartTooltipContent } from "./ChartTooltipContent";

// Creamos un wrapper para usar nuestro ChartTooltipContent
export function ChartTooltip(props: TooltipProps<any, any>) {
  const { active, payload } = props;

  if (!active || !payload || !payload.length) return null;

  return <ChartTooltipContent active payload={payload} />;
}
