import React from "react";
import { cn } from "@/utils/cn";
import styles from "./Button.module.css";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  size?: "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  children,
  className,
  type = "button",
  size,
  ...props
}: ButtonProps) {
  return <button
    type={type}
    className={
      cn(
        styles.button,
        size === "md" && styles.md,
        size === "lg" && styles.lg,
        className
      )
    }
    {...props}>
    <div className={styles.content}>
      {children}
    </div>
  </button>;
}
