import type { FieldsetProps } from "./Fieldset.types";
import styles from "./Fieldset.module.css";
import { cn } from "../../../utils/cn";

export function Fieldset({ legend, children, className, ref, ...props }: FieldsetProps) {
  return (
    <fieldset className={cn(styles.fieldset, className)} ref={ref} {...props}>
      {legend !== undefined && <legend className={styles.legend} aria-hidden>{legend}</legend>}
      {children}
    </fieldset>
  );
}
