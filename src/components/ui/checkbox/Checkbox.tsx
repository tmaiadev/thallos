import type { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.css";
import { cn } from "../../../utils/cn";
import Stack, { StackItem } from "../stack";

export function Checkbox({
  disabled = false,
  className,
  checked,
  children,
  ref,
  ...props
}: CheckboxProps) {
  return (
    <Stack
      as="label"
      className={cn(styles.root, className)}
      dir="horizontal"
      gap={4}
    >
      <StackItem grow={0}>
        <input
          checked={checked}
          className={styles.input}
          disabled={disabled}
          ref={ref}
          type="checkbox"
          {...props}
        />
      </StackItem>
      <span className={cn(disabled && styles["disabled-label"])}>{children}</span>
    </Stack>
  );
};