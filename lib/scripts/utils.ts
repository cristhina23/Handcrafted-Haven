import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDeliveryRange(daysToAdd = 5) {
  const today = new Date();

  // Fecha mínima (por ejemplo 5 días)
  const minDate = new Date();
  minDate.setDate(today.getDate() + daysToAdd);

  // Fecha máxima (tú decides cuánto, por ejemplo +10 días)
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + daysToAdd + 7);

  return {
    min: minDate,
    max: maxDate,
  };
}

// Helper para formatear bonito
export function formatDate(date: Date) {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
}
