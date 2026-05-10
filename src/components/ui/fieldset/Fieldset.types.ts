import type { ComponentPropsWithRef, ReactNode } from "react";

export interface FieldsetProps extends ComponentPropsWithRef<"fieldset"> {
  legend?: ReactNode;
}
