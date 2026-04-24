import React, { useState } from "react";
import { cn } from "@/utils/cn";
import styles from "./Menu.module.css";
import type { MenuProps, MenuItemProps } from "./Menu.types";
import MenuItem from "./components/MenuItem";

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

  const childArray = React.Children.toArray(children);
  const itemCount = childArray.filter(
    (child) => React.isValidElement(child) && child.type === MenuItem
  ).length;

  let itemIndex = 0;
  const enhancedChildren = React.Children.map(children, (child) => {
    const isItem = React.isValidElement<MenuItemProps>(child)
      && child.type === MenuItem;
    if (isItem) {
      const currentIndex = itemIndex++;
      return React.cloneElement(child, {
        active: currentIndex === activeIndex,
        onMouseEnter: () => setActiveIndex(currentIndex),
      });
    }
    return child;
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const isVertical = orientation === "vertical";

    const arrowNext = isVertical ? "ArrowDown" : "ArrowRight";
    const arrowPrev = isVertical ? "ArrowUp" : "ArrowLeft";

    if (e.key === arrowNext) {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % itemCount);
    } else if (e.key === arrowPrev) {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + itemCount) % itemCount);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose?.();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const items = e.currentTarget.querySelectorAll<HTMLElement>(
        "[role=\"menuitem\"]"
      );
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
      onKeyDown={handleKeyDown}
      {...props}
    >
      {enhancedChildren}
    </ul>
  );
}
