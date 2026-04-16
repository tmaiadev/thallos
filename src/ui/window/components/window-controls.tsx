import { useContext } from "react";
import { Context } from "../context";
import Button from "@/ui/button";

function MinimizeIcon() {
  return (
    <svg
      width="10" height="10"
      viewBox="0 0 10 10"
      shapeRendering="crispEdges"
      fill="currentColor"
    >
      <rect x="1" y="8" width="8" height="2" />
    </svg>
  );
}

function MaximizeIcon() {
  return (
    <svg
      width="10" height="10"
      viewBox="0 0 10 10"
      shapeRendering="crispEdges"
      fill="currentColor"
    >
      <rect x="0" y="0" width="10" height="2" />
      <rect x="0" y="9" width="10" height="1" />
      <rect x="0" y="2" width="1" height="7" />
      <rect x="9" y="2" width="1" height="7" />
    </svg>
  );
}

function RestoreIcon() {
  return (
    <svg
      width="10" height="10"
      viewBox="0 0 10 10"
      shapeRendering="crispEdges"
      fill="currentColor"
    >
      <rect x="3" y="0" width="7" height="2" />
      <rect x="3" y="2" width="1" height="2" />
      <rect x="9" y="2" width="1" height="4" />
      <rect x="7" y="5" width="3" height="1" />
      <rect x="0" y="4" width="7" height="2" />
      <rect x="0" y="6" width="1" height="4" />
      <rect x="6" y="6" width="1" height="4" />
      <rect x="0" y="9" width="7" height="1" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="10" height="10"
      viewBox="0 0 10 10"
      shapeRendering="crispEdges"
      fill="currentColor"
    >
      <rect x="0" y="0" width="2" height="2" />
      <rect x="2" y="2" width="2" height="2" />
      <rect x="4" y="4" width="2" height="2" />
      <rect x="6" y="6" width="2" height="2" />
      <rect x="8" y="8" width="2" height="2" />
      <rect x="8" y="0" width="2" height="2" />
      <rect x="6" y="2" width="2" height="2" />
      <rect x="2" y="6" width="2" height="2" />
      <rect x="0" y="8" width="2" height="2" />
    </svg>
  );
}

export default function WindowControls() {
  const { state, setState } = useContext(Context);

  return (
    <div
      role="group"
      aria-label="Window Controls"
      className="window__controls"
    >
      <Button aria-label="Minimize" onClick={() => setState("minimized")}>
        <MinimizeIcon />
      </Button>
      {state !== "maximized" && (
        <Button aria-label="Maximize" onClick={() => setState("maximized")}>
          <MaximizeIcon />
        </Button>
      )}
      {state === "maximized" && (
        <Button aria-label="Restore" onClick={() => setState("default")}>
          <RestoreIcon />
        </Button>
      )}
      <Button aria-label="Close">
        <CloseIcon />
      </Button>
    </div>
  );
}
