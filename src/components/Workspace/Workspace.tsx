import Taskbar from "../Taskbar";
import styles from "./Workspace.module.css";

export default function Workspace() {
  return (
    <div className={styles.workspace}>
      <div className={styles.desktop} />
      <div className={styles.taskbar}>
        <Taskbar />
      </div>
    </div>
  );
}
