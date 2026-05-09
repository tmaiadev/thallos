import type { TextFieldProps } from "./TextField.types";
import styles from "./TextField.module.css";
import { cn } from "../../../utils/cn";

export function TextField({
  label,
  variant = "stacked",
  disabled = false,
  type = "text",
  className,
  ref,
  ...props
}: TextFieldProps) {
  return (
    <label className={cn(className, styles.root, variant === "inline" && styles.inline)}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        aria-disabled={disabled}
        className={styles.input}
        disabled={disabled}
        ref={ref}
        type={type}
        {...props}
      />
    </label>
  );
}
