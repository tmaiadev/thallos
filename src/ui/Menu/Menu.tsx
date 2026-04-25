import React, { useState } from "react";
import { cn } from "@/utils/cn";
import styles from "./Menu.module.css";
import type { MenuProps } from "./Menu.types";

const getItems = (el: HTMLUListElement) =>
  Array.from(
    el.querySelectorAll<HTMLElement>(":scope > [role=\"menuitem\"]")
  );

export default function Menu({
  orientation = "vertical",
  children,
  className,
  onClose,
  onKeyDown,
  ref,
  ...props
}: MenuProps & { ref?: React.Ref<HTMLUListElement> }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const isMenuItem = (child: React.ReactNode) =>
    React.isValidElement(child) && (child.type as { __isMenuItem?: boolean }).__isMenuItem === true;

  const childArray = React.Children.toArray(children);
  const itemCount = childArray.filter(isMenuItem).length;

  let itemIndex = 0;
  const enhancedChildren = React.Children.map(children, (child) => {
    const isItem = isMenuItem(child);
    if (isItem) {
      const currentIndex = itemIndex++;
      const isActive = currentIndex === activeIndex;
      return React.cloneElement(
        child as React.ReactElement<Record<string, unknown>>,
        {
          active: isActive,
          tabIndex: isActive ? 0 : -1,
          onMouseEnter: (e: React.MouseEvent<HTMLLIElement>) => {
            setActiveIndex(currentIndex);
            e.currentTarget.focus();
          },
        }
      );
    }
    return child;
  });

  const handleFocus = (e: React.FocusEvent<HTMLUListElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      getItems(e.currentTarget)[activeIndex]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const isVertical = orientation === "vertical";
    const arrowNext = isVertical ? "ArrowDown" : "ArrowRight";
    const arrowPrev = isVertical ? "ArrowUp" : "ArrowLeft";
    const items = getItems(e.currentTarget);

    if (e.key === arrowNext) {
      e.preventDefault();
      const next = (activeIndex + 1) % itemCount;
      setActiveIndex(next);
      items[next]?.focus();
    } else if (e.key === arrowPrev) {
      e.preventDefault();
      const prev = (activeIndex - 1 + itemCount) % itemCount;
      setActiveIndex(prev);
      items[prev]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose?.();
    } else if (e.key === "Enter") {
      e.preventDefault();
      items[activeIndex]?.click();
    }

    onKeyDown?.(e);
  };

  return (
    <ul
      ref={ref}
      role="menu"
      tabIndex={-1}
      className={cn(
        styles.menu,
        orientation === "vertical" && styles["is-vertical"],
        orientation === "horizontal" && styles["is-horizontal"],
        className
      )}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {enhancedChildren}
    </ul>
  );
}
