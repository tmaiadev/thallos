import type { ComponentPropsWithRef } from "react";

export interface TextFieldProps extends Omit<ComponentPropsWithRef<"input">, "type"> {
  type?: "text" | "email" | "password" | "search" | "url";
  label?: string;
  variant?: "stacked" | "inline";
}
