import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs))
}

// Number formatting utilities to ensure no number exceeds 3 decimal places
export function formatNumber(value: number, maxDecimals: number = 3): number {
  if (isNaN(value) || !isFinite(value)) return 0;
  return Number(value.toFixed(Math.min(maxDecimals, 3)));
}

export function formatPercent(value: number, maxDecimals: number = 1): string {
  const formatted = formatNumber(value, maxDecimals);
  return `${formatted}%`;
}

export function formatCurrency(value: number, maxDecimals: number = 2): string {
  const formatted = formatNumber(value, maxDecimals);
  if (formatted >= 1000000) return `$${formatNumber(formatted / 1000000, 1)}M`;
  if (formatted >= 1000) return `$${formatNumber(formatted / 1000, 0)}K`;
  return `$${formatted}`;
}

export function formatScore(value: number): string {
  return formatNumber(value, 2).toString();
}

export function formatConfidence(value: number): string {
  return `${formatNumber(value * 100, 0)}%`;
}
