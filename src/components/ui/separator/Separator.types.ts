import { HTMLAttributes, RefObject } from "react";

export interface SeparatorProps extends Omit<HTMLAttributes<HTMLHRElement>, "children"> {
  orientation?: "horizontal" | "vertical";
  ref?: RefObject<HTMLHRElement | null>;
}
