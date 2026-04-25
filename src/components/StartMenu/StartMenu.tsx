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
        <MenuItem icon="appwizard-0">Programs</MenuItem>
        <MenuItem icon="directory_open_file_mydocs_2k-0">Documents</MenuItem>
        <MenuItem icon="settings_gear-0">Settings</MenuItem>
        <MenuDivider />
        <MenuItem icon="keys-0">Session</MenuItem>
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
