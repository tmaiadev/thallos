import { useRef, useEffect } from "react";
import Button from "@/ui/Button";
import Menu, { MenuItem, MenuDivider } from "@/ui/Menu";
import Popup, { usePopup } from "@/ui/Popup";
import styles from "./StartMenu.module.css";

function StartMenuContent() {
  const menuRef = useRef<HTMLUListElement>(null);
  const { close } = usePopup();

  useEffect(() => {
    menuRef.current?.focus();
  }, []);

  return (
    <div className={styles.popup}>
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
  );
}

export default function StartMenu() {
  return (
    <Popup position="top span-right">
      <Popup.Trigger>
        <Button size="md" aria-haspopup="menu" aria-label="Start">
          <b>Start</b>
        </Button>
      </Popup.Trigger>
      <Popup.Content>
        <StartMenuContent />
      </Popup.Content>
    </Popup>
  );
}
