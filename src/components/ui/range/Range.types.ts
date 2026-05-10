import type { ComponentPropsWithRef } from "react";

export interface RangeProps extends Omit<ComponentPropsWithRef<"input">, "type"> {
  label: string;
  variant?: "stacked" | "inline";
  prefix?: string;
  suffix?: string;
}
