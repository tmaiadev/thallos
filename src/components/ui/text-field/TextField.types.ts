import type { InputHTMLAttributes, RefObject } from "react";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: "text" | "email" | "password" | "search" | "url";
  label?: string;
  variant?: "stacked" | "inline";
  ref?: RefObject<HTMLInputElement | null>;
}
