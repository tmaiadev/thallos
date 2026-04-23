import Button from "@/ui/button";
import SystemTray from "../system-tray";
import "./styles.css";

export default function Taskbar() {
  return (
    <div className="taskbar">
      <div className="taskbar__start-btn">
        <Button size="md"><b>Start</b></Button>
      </div>
      <div className="taskbar__divider" />
      <div className="taskbar__tasks" />
      <div className="taskbar__system-tray">
        <SystemTray />
      </div>
    </div>
  );
}