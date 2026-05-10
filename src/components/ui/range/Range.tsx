import { cn } from "@/utils/cn";
import Stack, { StackItem } from "../stack";
import styles from "./Range.module.css";
import type { RangeProps } from "./Range.types";

export function Range({ label, ref, className, variant = "stacked", prefix, suffix, disabled, ...props }: RangeProps) {
  return <Stack
    as="label"
    gap={4}
    dir={variant === "stacked" ? "vertical" : "horizontal"}
    className={
      cn(
        styles.root,
        disabled && styles["is-disabled"],
        className
      )
    }
  >
    <StackItem
      grow={0}
      alignSelf="center"
      className={cn(styles.label, variant === "inline" && styles["is-inline"])}
    >
      {label}
    </StackItem>
    <Stack
      dir="horizontal"
      alignItems="stretch"
      gap={2}
    >
      {prefix && <StackItem aria-hidden alignSelf="center" grow={0}>{prefix}</StackItem>}
      <input
        type="range"
        ref={ref}
        className={styles.slider}
        disabled={disabled}
        {...props}
      />
      {suffix && <StackItem aria-hidden alignSelf="center" grow={0}>{suffix}</StackItem>}
    </Stack>
  </Stack>;
}