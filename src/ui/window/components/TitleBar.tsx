import { useContext, useRef, useEffect } from "react";
import { Context } from "../Window.context";
import WindowControls from "./WindowControls";
import styles from "./TitleBar.module.css";

export default function TitleBar({
  id, children,
}: { id: string, children: React.ReactNode }) {
  const { state, setState } = useContext(Context);
  const titleBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleBar = titleBarRef.current;
    const dialog = document.getElementById(id) as HTMLDialogElement;

    /* v8 ignore next */
    if (!titleBar) return;

    const set = (prop: string, value: number) =>
      dialog.style.setProperty(prop, `${value}px`);

    const drag = {
      active: false,
      initX: 0, initY: 0,
      mouseX: 0, mouseY: 0,
    };

    function onDragStart(event: MouseEvent) {
      drag.active = true;
      drag.initX = parseInt(
        dialog.style.getPropertyValue("--x") || "0", 10
      );
      drag.initY = parseInt(
        dialog.style.getPropertyValue("--y") || "0", 10
      );
      drag.mouseX = event.screenX;
      drag.mouseY = event.screenY;
    }

    function onDragMove(event: MouseEvent) {
      if (!drag.active) return;

      set("--x", drag.initX + (event.screenX - drag.mouseX));
      set("--y", drag.initY + (event.screenY - drag.mouseY));
    }

    function onDragEnd() {
      drag.active = false;
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

  useEffect(() => {
    const titleBar = titleBarRef.current;

    /* v8 ignore next */
    if (!titleBar) return;

    let lastClick = 0;
    function onClick() {
      const now = Date.now();
      if (now - lastClick < 300) {
        setState(state === "maximized" ? "default" : "maximized");
      }
      lastClick = now;
    }

    titleBar.addEventListener("click", onClick);
    return () => titleBar.removeEventListener("click", onClick);
  }, [state, setState]);

  return (
    <div className={styles["title-bar"]} ref={titleBarRef}>
      <div className={styles["title-slot"]}>
        <h2
          id={`${id}-title`}
          className={styles.title}
        >
          {children}
        </h2>
      </div>
      <WindowControls />
    </div>
  );
}
