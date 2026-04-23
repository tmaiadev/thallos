import { useRef, useEffect } from "react";
import "./styles.css";

export default function SystemTray() {
  const clockRef = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    const clock = clockRef.current;

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

  return <div className="system-tray">
    <time className="system-tray__clock" ref={clockRef}>00:00</time>
  </div>;
}