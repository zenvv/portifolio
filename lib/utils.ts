import { clsx, type ClassValue } from "clsx";
import type { ComponentType, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { width?: string; height?: string }
>;
