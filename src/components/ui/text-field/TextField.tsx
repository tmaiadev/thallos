import type { TextFieldProps } from "./TextField.types";
import styles from "./TextField.module.css";
import { cn } from "../../../utils/cn";
import Stack, { StackItem } from "../stack";

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
    <Stack
      as="label"
      dir={variant === "stacked" ? "vertical" : "horizontal"}
      alignItems={variant === "stacked" ? "stretch" : "center"}
      gap={4}
      className={cn(className, styles.root)}>
      {label && (
        <StackItem
          as="span"
          className={cn(styles.label, variant === "inline" && styles["is-inline"])}
        >
          {label}
        </StackItem>
      )}
      <input
        aria-disabled={disabled}
        className={styles.input}
        disabled={disabled}
        ref={ref}
        type={type}
        {...props}
      />
    </Stack>
  );
}
