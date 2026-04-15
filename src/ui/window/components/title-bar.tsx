import { useContext, useRef, useEffect } from "react";
import { Context } from "../context";
import Arrangement from "./arrangement";

export default function TitleBar({
  id, children,
}: { id: string, children: React.ReactNode }) {
  const { state, setState } = useContext(Context);
  const titleBarRef = useRef<HTMLDivElement>(null);

  // Dragging window
  useEffect(() => {
    const titleBar = titleBarRef.current;
    const dialog = document.getElementById(id) as HTMLDialogElement;

    if (!titleBar) return;

    let isDragging = false,
      mouseInitX = 0,
      mouseInitY = 0,
      mouseX = 0,
      mouseY = 0,
      dialogInitX = 0,
      dialogInitY = 0;

    function onDragStart(event: MouseEvent) {
      isDragging = true;
      mouseInitX = event.screenX;
      mouseInitY = event.screenY;

      dialogInitX = parseInt(dialog.style.getPropertyValue("--x") || "0", 10);
      dialogInitY = parseInt(dialog.style.getPropertyValue("--y") || "0", 10);
    }

    function onDragMove(event: MouseEvent) {
      if (!isDragging) return;

      mouseX = event.screenX;
      mouseY = event.screenY;

      const diffX = mouseX - mouseInitX;
      const diffY = mouseY - mouseInitY;

      const x = diffX + dialogInitX;
      const y = diffY + dialogInitY;

      dialog.style.setProperty("--x", `${x}px`);
      dialog.style.setProperty("--y", `${y}px`);
    }

    function onDragEnd() {
      if (isDragging) isDragging = false;
    }

    titleBar.addEventListener("mousedown", onDragStart);
    document.body.addEventListener("mousemove", onDragMove);
    document.body.addEventListener("mouseup", onDragEnd);

    return () => {
      titleBar.removeEventListener("mousedown", onDragStart);
      document.body.removeEventListener("mousemove", onDragMove);
      document.body.removeEventListener("mouseup", onDragEnd);
    };
  }, [id]);

  // Maximizing / Restoring
  useEffect(() => {
    const titleBar = titleBarRef.current;

    if (!titleBar) return;

    let clickTime = 0;
    function onClick() {
      const now = Date.now();
      const diff = now - clickTime;

      if (diff < 300) {
        setState(state === "maximized" ? "default" : "maximized");
      }

      clickTime = now;
    }

    titleBar.addEventListener("click", onClick);
    return () => {
      titleBar.removeEventListener("click", onClick);
    };
  }, [state, setState]);

  return <div className="window__title-bar" ref={titleBarRef}>
    <h2
      id={`${id}-title`}
      className="window__title-bar__title"
    >
      {children}
    </h2>
    <Arrangement />
  </div>;
}