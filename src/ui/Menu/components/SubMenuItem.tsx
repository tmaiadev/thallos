import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import Icon from "@/ui/Icon";
import Menu from "../Menu";
import styles from "./SubMenuItem.module.css";
import type { SubMenuItemProps } from "../Menu.types";

function SubMenuItem({
  label,
  icon,
  active,
  className,
  children,
  ref,
  ...props
}: SubMenuItemProps & { ref?: React.Ref<HTMLLIElement> }) {
  const [isOpen, setIsOpen] = useState(false);
  const submenuRef = useRef<HTMLUListElement>(null);
  const focusOnOpen = useRef(false);

  useEffect(() => {
    if (!active) setIsOpen(false);
  }, [active]);

  useEffect(() => {
    if (isOpen && focusOnOpen.current) {
      focusOnOpen.current = false;
      submenuRef.current?.focus();
    }
  }, [isOpen]);

  const liRef = useRef<HTMLLIElement>(null);

  const open = (focusFirst: boolean) => {
    focusOnOpen.current = focusFirst;
    setIsOpen(true);
  };

  const closeSubmenu = () => {
    setIsOpen(false);
    liRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      open(true);
    }
  };

  const mergedRef = (node: HTMLLIElement | null) => {
    liRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLLIElement | null>).current = node;
  };

  return (
    <li
      ref={mergedRef}
      role="menuitem"
      tabIndex={-1}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      className={cn(
        styles["sub-menu-item"],
        active && styles["is-active"],
        className
      )}
      {...props}
      onMouseEnter={(e) => {
        (props.onMouseEnter as React.MouseEventHandler<HTMLLIElement>)?.(e);
        open(false);
      }}
      onMouseLeave={() => setIsOpen(false)}
      onKeyDown={handleKeyDown}
    >
      {icon && <Icon type={icon} size="sm" aria-hidden />}
      {label}
      <span aria-hidden="true" className={styles.arrow}>▶</span>
      {isOpen && (
        <Menu
          ref={submenuRef}
          className={styles.submenu}
          orientation="vertical"
          onClose={closeSubmenu}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              e.stopPropagation();
              closeSubmenu();
            } else if (
              e.key === "Escape" ||
              e.key === "ArrowUp" ||
              e.key === "ArrowDown" ||
              e.key === "Enter"
            ) {
              e.stopPropagation();
            }
          }}
        >
          {children}
        </Menu>
      )}
    </li>
  );
}

SubMenuItem.__isMenuItem = true;
export default SubMenuItem;
