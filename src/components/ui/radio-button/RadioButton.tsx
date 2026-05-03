import type { RadioButtonProps } from "./RadioButton.types";
import styles from "./RadioButton.module.css";
import { cn } from "../../../utils/cn";

export function RadioButton({
  disabled = false,
  className,
  checked,
  children,
  ref,
  ...props
}: RadioButtonProps) {
  return (
    <label className={cn(className, styles.wrapper)}>
      <input
        checked={checked}
        className={styles.input}
        disabled={disabled}
        ref={ref}
        type="radio"
        {...props}
      />
      <span className={cn(disabled && styles["disabled-label"])}>{children}</span>
    </label>
  );
}
