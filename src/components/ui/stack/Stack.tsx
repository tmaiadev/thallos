import { cn } from "@/utils/cn";
import type { StackProps, StackItemProps } from "./Stack.types.ts";
import styles from "./Stack.module.css";
import { formatFlexAlign, formatGrowShrinkProp } from "./Stack.utils.ts";
import React from "react";

export function Stack({
  children,
  as,
  alignContent = "start",
  alignItems = "stretch",
  className,
  dir = "vertical",
  gap = 0,
  justifyContent = "start",
  ref,
  reverse,
  wrap = "wrap",
  ...props
}: StackProps) {
  const Component = as || "div";
  const style = {
    "--align-content": formatFlexAlign(alignContent),
    "--align-items": formatFlexAlign(alignItems),
    "--gap": `${gap * 2}px`,
    "--justify-content": formatFlexAlign(justifyContent),
    "--wrap": wrap,
  } as React.CSSProperties;

  return (
    <Component
      className={
        cn(
          styles.stack,
          dir === "horizontal" && styles["is-horizontal"],
          reverse && styles["is-reverse"],
          className
        )
      }
      style={style}
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  );
};

export function StackItem({
  as,
  alignSelf = "auto",
  basis = "auto",
  children,
  className,
  grow = 1,
  order = 0,
  shrink = 1,
}: StackItemProps) {
  const Component = as || "div";
  const style = {
    "--align-self": formatFlexAlign(alignSelf),
    "--basis": basis,
    "--grow": formatGrowShrinkProp(grow),
    "--order": order,
    "--shrink": formatGrowShrinkProp(shrink),
  } as React.CSSProperties;

  return (
    <Component
      className={cn(styles["stack-item"], className)}
      style={style}>
      {children}
    </Component>
  );
}