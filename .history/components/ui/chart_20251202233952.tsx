/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Tipos
 */
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

/**
 * Este componente envuelve el chart y expone variables CSS basadas
 * en la primera entrada del config (si existe). Es seguro y tipado.
 */
export function ChartContainer({
  config,
  className,
  children,
  style,
  ...props
}: ChartContainerProps) {
  // Tomamos el primer color definido en config (si hay)
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

/**
 * ChartTooltip: wrapper simple para usar TooltipProvider.
 * Tipado claro para children.
 */
interface ChartTooltipProps {
  children?: React.ReactNode;
}
export function ChartTooltip({ children }: ChartTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>{children}</Tooltip>
    </TooltipProvider>
  );
}

/**
 * ChartTooltipContent
 * - active: boolean que viene de Recharts
 * - payload: estructura que Recharts entrega al tooltip
 * - hideLabel: si quieres ocultar la etiqueta (opcional)
 *
 * Notas: Payload puede variar según la librería; lo tipamos como any[] para flexibilidad.
 */
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
  // Recharts a veces manda payload como undefined, null, o array.
  const items: RechartsPayloadItem[] =
    Array.isArray(payload) ? payload : payload ? [payload] : [];

  if (!active || !items.length) return null;

  const item = items[0];

  return (
    <TooltipContent className="p-2 text-sm">
      {!hideLabel && item?.name && (
        <p className="font-medium">{String(item.name)}</p>
      )}
      <p className="opacity-80">{String(item?.value ?? "")}</p>
    </TooltipContent>
  );
}
