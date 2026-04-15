import Provider from "./components/provider";
import type { WindowProps } from "./types";
import Dialog from "./components/dialog";
import TitleBar from "./components/title-bar";
import ResizerHandle from "./components/resizer-handle";
import "./styles.css";

export default function Window({
  id,
  title,
  ref,
  className,
  children,
  ...props
}: WindowProps) {
  return <Provider>
    <Dialog
      id={id}
      ref={ref}
      className={className}
      {...props}
    >
      <TitleBar id={id}>{title}</TitleBar>
      <div className="window__content">
        {children}
      </div>
      <ResizerHandle id={id} type="top" />
      <ResizerHandle id={id} type="bottom" />
      <ResizerHandle id={id} type="left" />
      <ResizerHandle id={id} type="right" />
      <ResizerHandle id={id} type="top-left" />
      <ResizerHandle id={id} type="top-right" />
      <ResizerHandle id={id} type="bottom-left" />
      <ResizerHandle id={id} type="bottom-right" />
    </Dialog>
  </Provider>;
}