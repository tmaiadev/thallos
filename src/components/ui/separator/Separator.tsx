import { cn } from "../../../utils/cn";
import styles from "./Separator.module.css";
import type { SeparatorProps } from "./Separator.types";

export function Separator({ orientation = "horizontal", className, ref, ...props }: SeparatorProps) {
  return (
    <hr
      className={cn(styles.separator, styles[orientation], className)}
      ref={ref}
      {...props}
    />
  );
}

export default Separator;
