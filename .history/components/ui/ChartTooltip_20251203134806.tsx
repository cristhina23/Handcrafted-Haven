import * as React from "react";
import { ChartTooltipContent } from "./chart";

// Usamos "any" para props porque Recharts no los tipa exactamente
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartTooltip(props: any) {
  const { active, payload } = props;

  if (!active || !payload || !payload.length) return null;

  return <ChartTooltipContent active payload={payload} />;
}
