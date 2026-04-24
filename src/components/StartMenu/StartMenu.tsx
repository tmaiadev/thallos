import { useState, useRef, useEffect, useCallback } from "react";
import Button from "@/ui/Button";
import Menu, { MenuItem, MenuDivider } from "@/ui/Menu";
import styles from "./StartMenu.module.css";

export default function StartMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    containerRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  useEffect(() => {
    if (isOpen) {
      menuRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const outside = !containerRef.current?.contains(e.target as Node);
      if (outside) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <div ref={containerRef} className={styles["start-menu"]}>
      {isOpen && (
        <div className={styles.popup} role="presentation">
          <div className={styles.sidebar} aria-hidden="true">
            <span className={styles["sidebar-text"]}>
              <span className={styles["sidebar-windows"]}>Thall</span>
              <span className={styles["sidebar-version"]}>OS</span>
            </span>
          </div>
          <Menu
            ref={menuRef}
            orientation="vertical"
            onClose={close}
            aria-label="Start menu"
          >
            <MenuItem>Programs</MenuItem>
            <MenuItem>Documents</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuDivider />
            <MenuItem>Session</MenuItem>
          </Menu>
        </div>
      )}
      <Button
        size="md"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Start"
      >
        <b>Start</b>
      </Button>
    </div>
  );
}
