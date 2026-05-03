import type { FieldsetHTMLAttributes, ReactNode, RefObject } from "react";

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: ReactNode;
  ref?: RefObject<HTMLFieldSetElement | null>;
}
