import { useRef, useEffect } from "react";
import styles from "./SystemTray.module.css";

export default function SystemTray() {
  const clockRef = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    const clock = clockRef.current;

    /* v8 ignore next */
    if (!clock) return;

    function removeSecs(time: string) {
      return time.replace(/:\d{2}$/, "");
    }

    function renderClock() {
      const dt = new Date();

      clock!.title = removeSecs(dt.toLocaleString());
      clock!.innerHTML = removeSecs(dt.toLocaleTimeString());
    };

    renderClock();
    const interval = setInterval(renderClock, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className={styles["system-tray"]}>
    <time className={styles.clock} ref={clockRef}>00:00</time>
  </div>;
}
