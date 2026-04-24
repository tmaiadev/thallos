import { useRef, useEffect } from "react";
import Button from "@/ui/Button";
import Icon from "@/ui/Icon";
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
        <MenuItem>
          <Icon type="appwizard-0" size="sm" aria-hidden="true" />
          Programs
        </MenuItem>
        <MenuItem>
          <Icon
            type="directory_open_file_mydocs_2k-0"
            size="sm"
            aria-hidden="true"
          />
          Documents
        </MenuItem>
        <MenuItem>
          <Icon
            type="settings_gear-0"
            size="sm"
            aria-hidden="true"
          />
          Settings
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <Icon type="keys-0" size="sm" aria-hidden="true" />
          Session
        </MenuItem>
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
