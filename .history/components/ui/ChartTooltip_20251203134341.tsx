/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any;
  children: React.ReactNode | ((payload: any) => React.ReactNode);
}

export function ChartTooltip({ active, payload, children }: ChartTooltipProps) {
  if (!active || !payload) return null;

  // Si children es función, pasamos el payload
  if (typeof children === "function") {
    return <>{children(payload)}</>;
  }

  // Si children es ReactNode normal
  return <>{children}</>;
}
