import { useContext } from "react";
import { Context } from "../Window.context";
import type { DialogProps } from "../Window.types";
import { cn } from "@/utils/cn";
import styles from "./Dialog.module.css";

export default function Dialog({
  id, className, ref, children, ...props
}: DialogProps) {
  const { state } = useContext(Context);

  return <dialog
    id={id}
    ref={ref}
    className={cn(
      styles.window,
      state === "maximized" && styles["is-maximized"],
      className
    )}
    aria-describedby={`${id}-title`}
    open={state !== "minimized"}
    {...props}
  >
    {children}
  </dialog>;
}
