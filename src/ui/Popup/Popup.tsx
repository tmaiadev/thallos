import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import styles from "./Popup.module.css";
import { PopupContext, usePopup } from "./Popup.context";
import type { PopupProps } from "./Popup.types";

const FOCUSABLE =
  "button, [href], input, [tabindex]:not([tabindex=\"-1\"])";

type TriggerChild = React.ReactElement<
  React.HTMLAttributes<Element>
>;

function Trigger({ children }: { children: TriggerChild }) {
  const { isOpen, toggle } = usePopup();
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      toggle();
    },
    "aria-expanded": isOpen,
  });
}

function Content({ children }: { children: React.ReactNode }) {
  const { isOpen, position } = usePopup();
  if (!isOpen) return null;
  return (
    <div className={styles.content} data-position={position}>
      {children}
    </div>
  );
}

export default function Popup({ position, children }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    containerRef.current
      ?.querySelector<HTMLElement>(FOCUSABLE)
      ?.focus();
  }, []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, close]);

  return (
    <PopupContext.Provider
      value={{ isOpen, open, close, toggle, position }}
    >
      <div ref={containerRef} className={styles.popup}>
        {children}
      </div>
    </PopupContext.Provider>
  );
}

Popup.Trigger = Trigger;
Popup.Content = Content;
