import { useContext } from "react";
import { Context } from "../context";
import Button from "@/ui/button";
import Icon from "./icon";

export default function WindowControls() {
  const { state, setState } = useContext(Context);

  return (
    <div
      role="group"
      aria-label="Window Controls"
      className="window__controls"
    >
      <Button aria-label="Minimize" onClick={() => setState("minimized")}>
        <Icon type="minimize" />
      </Button>
      {state !== "maximized" && (
        <Button aria-label="Maximize" onClick={() => setState("maximized")}>
          <Icon type="maximize" />
        </Button>
      )}
      {state === "maximized" && (
        <Button aria-label="Restore" onClick={() => setState("default")}>
          <Icon type="restore" />
        </Button>
      )}
      <Button aria-label="Close">
        <Icon type="close" />
      </Button>
    </div>
  );
}
