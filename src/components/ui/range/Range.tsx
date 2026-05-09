import type { RangeProps } from "./Range.types";
import styles from "./Range.module.css";
import { cn } from "@/utils/cn";

export function Range({ label, ref, className, variant = "stacked", prefix, suffix, disabled, ...props }: RangeProps) {
  return <label className={cn(styles.root, variant === "inline" && styles["is-inline"], disabled && styles["is-disabled"], className)}>
    <span className={cn(styles.label, variant === "inline" && styles["is-inline"])}>{label}</span>
    <div className={styles.content}>
      {prefix && <div aria-hidden className={styles.prefix}>{prefix}</div>}
      <input
        type="range"
        ref={ref}
        className={styles.slider}
        disabled={disabled}
        {...props}
      />
      {suffix && <div aria-hidden className={styles.suffix}>{suffix}</div>}
    </div>
  </label>;
}