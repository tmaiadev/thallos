import type { ComponentPropsWithRef } from "react";

export interface SeparatorProps extends Omit<ComponentPropsWithRef<"hr">, "children"> {
  orientation?: "horizontal" | "vertical";
}
