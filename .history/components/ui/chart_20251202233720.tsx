"use client"

import * as React from "react"
import { cn } from "@/lib/scripts/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type ChartConfig = {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={cn("relative flex w-full flex-col", className)}
      {...props}
      style={
        {
          "--chart-1": config?.desktop?.color,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

export function ChartTooltip({ children }) {
  return (
    <TooltipProvider>
      <Tooltip>{children}</Tooltip>
    </TooltipProvider>
  )
}

export function ChartTooltipContent({ active, payload, hideLabel = false }) {
  if (!active || !payload?.length) return null

  const item = payload[0]

  return (
    <TooltipContent className="p-2 text-sm">
      {!hideLabel && <p className="font-medium">{item.name}</p>}
      <p className="opacity-80">{item.value}</p>
    </TooltipContent>
  )
}
