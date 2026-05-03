import type { InputHTMLAttributes, RefObject } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  ref?: RefObject<HTMLInputElement | null>,
};