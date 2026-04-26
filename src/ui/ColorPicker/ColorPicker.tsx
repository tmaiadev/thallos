import { useRef } from "react";
import { cn } from "@/utils/cn";
import type { ColorPickerProps } from "./ColorPicker.types";
import styles from "./ColorPicker.module.css";

export default function ColorPicker({
  value,
  onChange,
  label,
  className,
  ref,
  ...props
}: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function open() {
    inputRef.current?.click();
  }

  return (
    <div
      ref={ref}
      className={cn(styles.picker, className)}
      onClick={open}
      role="button"
      tabIndex={0}
      aria-label={label ?? `Color picker, current value ${value}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      {...props}
    >
      <input
        ref={inputRef}
        type="color"
        className={styles.input}
        value={value}
        aria-hidden="true"
        tabIndex={-1}
        onChange={(e) => onChange(e.target.value)}
      />
      <div
        className={styles.swatch}
        style={{ backgroundColor: value }}
      />
      <span className={styles.hex}>{value}</span>
    </div>
  );
}
