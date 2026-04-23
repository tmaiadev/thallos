import Taskbar from "../taskbar";
import "./styles.css";

export default function Workspace() {
  return (
    <div className="workspace">
      <div className="workspace__desktop" />
      <div className="workspace__taskbar">
        <Taskbar />
      </div>
    </div>
  );
}