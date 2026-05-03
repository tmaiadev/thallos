import type { InputHTMLAttributes, RefObject } from "react";

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  ref?: RefObject<HTMLInputElement | null>;
}
