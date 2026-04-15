import { useContext } from "react";
import { Context } from "../context";
import type { DialogProps } from "../types";
import { cn } from "@/utils/cn";

export default function Dialog({ id, className, ref, children, ...props }: DialogProps) {
    const { state } = useContext(Context);

    return <dialog
        id={id}
        ref={ref}
        className={cn(
            "window",
            state === "maximized" && "window--maximized",
            className
        )}
        aria-describedby={`${id}-title`}
        open={state !== "minimized"}
        {...props}
    >
        {children}
    </dialog>
}