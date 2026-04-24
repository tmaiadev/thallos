import React from "react";
import { cn } from "@/utils/cn";
import styles from "./MenuItem.module.css";
import type { MenuItemProps } from "../Menu.types";

export default function MenuItem({
  children,
  className,
  active,
  onSelect,
  onClick,
  ref,
  ...props
}: MenuItemProps & { ref?: React.Ref<HTMLLIElement> }) {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    onSelect?.();
    onClick?.(e);
  };

  return (
    <li
      ref={ref}
      role="menuitem"
      tabIndex={-1}
      className={cn(
        styles["menu-item"],
        active && styles["is-active"],
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </li>
  );
}
