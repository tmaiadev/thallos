import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import type { ResizerHandleProps } from "../Window.types";
import styles from "./ResizerHandle.module.css";

export default function ResizerHandle({ id, type }: ResizerHandleProps) {
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = handleRef.current;
    const dialog = document.getElementById(id) as HTMLDialogElement;

    /* v8 ignore next */
    if (!handle) return;

    const affects = (side: string) => type.includes(side);
    const set = (prop: string, value: number) =>
      dialog.style.setProperty(prop, `${value}px`);

    const drag = {
      active: false,
      initH: 0, initW: 0,
      initX: 0, initY: 0,
      mouseX: 0, mouseY: 0,
    };

    function onDragStart(event: MouseEvent) {
      drag.active = true;
      drag.initH = dialog.clientHeight;
      drag.initW = dialog.clientWidth;
      drag.initX = dialog.offsetLeft;
      drag.initY = dialog.offsetTop;
      drag.mouseX = event.screenX;
      drag.mouseY = event.screenY;
    }

    function onDragMove(event: MouseEvent) {
      if (!drag.active) return;

      const diffX = event.screenX - drag.mouseX;
      const diffY = event.screenY - drag.mouseY;

      if (affects("bottom")) {
        set("--h", Math.max(0, drag.initH + diffY));
      }

      if (affects("top")) {
        set("--h", Math.max(0, drag.initH - diffY));
        set("--y", drag.initY + (drag.initH - dialog.clientHeight));
      }

      if (affects("right")) {
        set("--w", Math.max(0, drag.initW + diffX));
      }

      if (affects("left")) {
        set("--w", Math.max(0, drag.initW - diffX));
        set("--x", drag.initX + (drag.initW - dialog.clientWidth));
      }
    }

    function onDragEnd() {
      if (!drag.active) return;
      drag.active = false;
    }

    handle.addEventListener("mousedown", onDragStart);
    document.body.addEventListener("mousemove", onDragMove);
    document.body.addEventListener("mouseup", onDragEnd);

    return () => {
      handle.removeEventListener("mousedown", onDragStart);
      document.body.removeEventListener("mousemove", onDragMove);
      document.body.removeEventListener("mouseup", onDragEnd);
    };
  }, [id, type]);

  return (
    <div
      className={cn(
        styles["resizer-handle"],
        styles[type]
      )}
      ref={handleRef}
    />
  );
}
