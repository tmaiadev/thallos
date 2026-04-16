import type { WindowIconProps } from "../types";

const ICONS = {
  minimize: <rect x="1" y="8" width="8" height="2" />,
  maximize: (
    <>
      <rect x="0" y="0" width="10" height="2" />
      <rect x="0" y="9" width="10" height="1" />
      <rect x="0" y="2" width="1" height="7" />
      <rect x="9" y="2" width="1" height="7" />
    </>
  ),
  restore: (
    <>
      <rect x="3" y="0" width="7" height="2" />
      <rect x="3" y="2" width="1" height="2" />
      <rect x="9" y="2" width="1" height="4" />
      <rect x="7" y="5" width="3" height="1" />
      <rect x="0" y="4" width="7" height="2" />
      <rect x="0" y="6" width="1" height="4" />
      <rect x="6" y="6" width="1" height="4" />
      <rect x="0" y="9" width="7" height="1" />
    </>),
  close: (
    <>
      <rect x="0" y="0" width="2" height="2" />
      <rect x="2" y="2" width="2" height="2" />
      <rect x="4" y="4" width="2" height="2" />
      <rect x="6" y="6" width="2" height="2" />
      <rect x="8" y="8" width="2" height="2" />
      <rect x="8" y="0" width="2" height="2" />
      <rect x="6" y="2" width="2" height="2" />
      <rect x="2" y="6" width="2" height="2" />
      <rect x="0" y="8" width="2" height="2" />
    </>
  )
};

export default function Icon({ type }: WindowIconProps) {
  return (
    <svg
      width="10" height="10"
      viewBox="0 0 10 10"
      shapeRendering="crispEdges"
      fill="currentColor"
      className="window__window-controls-icon"
    >
      {ICONS[type]}
    </svg>
  );
}