import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import type { ResizerHandleProps } from "../types";

export default function ResizerHandle({ id, type }: ResizerHandleProps) {
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = handleRef.current;
    const dialog = document.getElementById(id) as HTMLDialogElement;

    if (!handle) return;

    let isDragging = false,
      dialogInitH = 0,
      dialogInitW = 0,
      dialogInitX = 0,
      dialogInitY = 0,
      mouseInitX = 0,
      mouseInitY = 0;

    function onDragStart(event: MouseEvent) {
      isDragging = true;
      dialogInitH = dialog.clientHeight;
      dialogInitW = dialog.clientWidth;
      dialogInitX = dialog.offsetLeft;
      dialogInitY = dialog.offsetTop;
      mouseInitX = event.screenX;
      mouseInitY = event.screenY;
    }

    function onDragMove(event: MouseEvent) {
      if (!isDragging) return;

      const diffX = event.screenX - mouseInitX;
      const diffY = event.screenY - mouseInitY;

      if (
        type === "bottom" ||
        type === "bottom-right" ||
        type === "bottom-left"
      ) {
        dialog.style.setProperty(
          "--h", `${Math.max(0, dialogInitH + diffY)}px`
        );
      }

      if (
        type === "top" ||
        type === "top-left" ||
        type === "top-right"
      ) {
        dialog.style.setProperty(
          "--h", `${Math.max(0, dialogInitH - diffY)}px`
        );
        const actualH = dialog.clientHeight;
        dialog.style.setProperty(
          "--y",
          `${dialogInitY + (dialogInitH - actualH)}px`
        );
      }

      if (
        type === "right" ||
        type === "bottom-right" ||
        type === "top-right"
      ) {
        dialog.style.setProperty(
          "--w", `${Math.max(0, dialogInitW + diffX)}px`
        );
      }

      if (
        type === "left" ||
        type === "bottom-left" ||
        type === "top-left"
      ) {
        dialog.style.setProperty(
          "--w", `${Math.max(0, dialogInitW - diffX)}px`
        );
        const actualW = dialog.clientWidth;
        dialog.style.setProperty(
          "--x",
          `${dialogInitX + (dialogInitW - actualW)}px`
        );
      }
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
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
        "window__resizer-handle",
        `window__resizer-handle--${type}`
      )}
      ref={handleRef}
    />
  );
}