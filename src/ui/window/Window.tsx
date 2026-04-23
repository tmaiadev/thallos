import Provider from "./components/Provider";
import type { WindowProps } from "./Window.types";
import Dialog from "./components/Dialog";
import TitleBar from "./components/TitleBar";
import ResizerHandle from "./components/ResizerHandle";
import styles from "./Window.module.css";

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
      <div className={styles.content}>
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
