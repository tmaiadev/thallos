import React from "react";
import { cn } from "@/utils/cn";
import "./styles.css";

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
        "button",
        size == "md" && "button--md",
        size == "lg" && "button--lg",
        className
      )
    }
    {...props}>
    <div className="button__content">
      {children}
    </div>
  </button>;
}