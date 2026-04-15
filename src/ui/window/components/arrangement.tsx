import { useContext } from "react";
import { Context } from "../context";
import Button from "@/ui/button";

export default function Arrangement() {
    const { state, setState } = useContext(Context);

    return <div role="group" aria-label="Window Arrangement" className="window__arrangement">
        <Button aria-label="Minimize" onClick={() => setState("minimized")}>_</Button>
        {state !== "maximized" && <Button aria-label="Maximize" onClick={() => setState("maximized")}>+</Button>}
        {state === "maximized" && <Button aria-label="Restore" onClick={() => setState("default")}>-</Button>}
        <Button aria-label="Close">&times;</Button>
    </div>
}