import { cn } from "@/utils/cn";
import type { StackProps, StackItemProps } from "./Stack.types.ts";
import styles from "./Stack.module.css";
import { formatFlexAlign, formatGrowShrinkProp } from "./Stack.utils.ts";

export function Stack({
  children,
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
  return (
    <div
      className={
        cn(
          styles.stack,
          dir === "horizontal" && styles["is-horizontal"],
          reverse && styles["is-reverse"],
          className
        )
      }
      style={{
        "--align-content": formatFlexAlign(alignContent),
        "--align-items": formatFlexAlign(alignItems),
        "--gap": `${gap * 2}px`,
        "--justify-content": formatFlexAlign(justifyContent),
        "--wrap": wrap,
      } as React.CSSProperties}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
};

export function StackItem({
  alignSelf = "auto",
  basis = "auto",
  children,
  className,
  grow = 1,
  order = 0,
  shrink = 1,
}: StackItemProps) {
  return (
    <div className={cn(styles["stack-item"], className)} style={{
      "--align-self": formatFlexAlign(alignSelf),
      "--basis": basis,
      "--grow": formatGrowShrinkProp(grow),
      "--order": order,
      "--shrink": formatGrowShrinkProp(shrink),
    } as React.CSSProperties}>{children}</div>
  );
}