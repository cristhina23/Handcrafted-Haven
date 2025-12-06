import * as React from "react";
import { ChartTooltipContent } from "./ChartTooltipContent";

// Usamos "any" para props porque Recharts no los tipa exactamente
export function ChartTooltip(props: any) {
  const { active, payload } = props;

  if (!active || !payload || !payload.length) return null;

  return <ChartTooltipContent active payload={payload} />;
}
