import type { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.css";
import { cn } from "../../../utils/cn";

export function Checkbox({
  disabled = false,
  className,
  checked,
  children,
  ref,
  ...props
}: CheckboxProps) {
  return (
    <label className={cn(className, styles.root)}>
      <input
        checked={checked}
        className={styles.input}
        disabled={disabled}
        ref={ref}
        type="checkbox"
        {...props}
      />
      <span className={cn(disabled && styles["disabled-label"])}>{children}</span>
    </label>
  );
};