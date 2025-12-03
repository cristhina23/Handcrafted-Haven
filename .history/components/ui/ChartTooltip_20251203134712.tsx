/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { ChartTooltipContent } from "./ChartTooltipContent";
import { TooltipProps } from "recharts";

// El tipo <any, any> permite flexibilidad para tus datos
export function ChartTooltip(props: TooltipProps<any, any>) {
  const { active, payload } = props; // payload viene de Recharts

  if (!active || !payload || !payload.length) return null;

  return <ChartTooltipContent active payload={payload} />;
}
