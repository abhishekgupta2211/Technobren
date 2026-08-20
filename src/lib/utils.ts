import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared motion easing, so every animation on the site speaks one language. */
export const EASE = [0.16, 1, 0.3, 1] as const;
