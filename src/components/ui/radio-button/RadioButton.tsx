import type { RadioButtonProps } from "./RadioButton.types";
import styles from "./RadioButton.module.css";
import { cn } from "../../../utils/cn";
import Stack, { StackItem } from "../stack";

export function RadioButton({
  disabled = false,
  className,
  checked,
  children,
  ref,
  ...props
}: RadioButtonProps) {
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
          type="radio"
          {...props}
        />
      </StackItem>
      <span className={cn(disabled && styles["disabled-label"])}>{children}</span>
    </Stack>
  );
}
