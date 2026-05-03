import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";
import { cn } from "../../../utils/cn";

export function Button({ children, className, ref, ...props }: ButtonProps) {
  return (
    <button
      className={cn(styles.button, className)}
      type="button"
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};