import StartMenu from "../StartMenu";
import SystemTray from "../SystemTray";
import styles from "./Taskbar.module.css";

export default function Taskbar() {
  return (
    <div className={styles.taskbar}>
      <div className={styles["start-btn"]}>
        <StartMenu />
      </div>
      <div className={styles.divider} />
      <div className={styles.tasks} />
      <div className={styles["system-tray"]}>
        <SystemTray />
      </div>
    </div>
  );
}
