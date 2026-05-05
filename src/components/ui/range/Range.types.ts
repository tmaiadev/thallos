import type { InputHTMLAttributes, RefObject } from "react";

export interface RangeProps extends InputHTMLAttributes<HTMLInputElement>  {
  label: string;
  variant?: "stacked" | "inline";
  prefix?: string;
  suffix?: string;
  ref?: RefObject<HTMLInputElement | null>;
}
