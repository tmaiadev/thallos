import { useContext } from "react";
import { Context } from "../Window.context";
import Button from "@/ui/Button";
import Icon from "./Icon";
import styles from "./WindowControls.module.css";

export default function WindowControls() {
  const { state, setState } = useContext(Context);

  return (
    <div
      role="group"
      aria-label="Window Controls"
      className={styles.controls}
    >
      <Button
        className={styles.button}
        aria-label="Minimize"
        onClick={() => setState("minimized")}
      >
        <Icon type="minimize" />
      </Button>
      {state !== "maximized" && (
        <Button
          className={styles.button}
          aria-label="Maximize"
          onClick={() => setState("maximized")}
        >
          <Icon type="maximize" />
        </Button>
      )}
      {state === "maximized" && (
        <Button
          className={styles.button}
          aria-label="Restore"
          onClick={() => setState("default")}
        >
          <Icon type="restore" />
        </Button>
      )}
      <Button className={styles.button} aria-label="Close">
        <Icon type="close" />
      </Button>
    </div>
  );
}
