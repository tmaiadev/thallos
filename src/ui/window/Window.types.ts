export type State = "default" | "maximized" | "minimized";

export type ResizerHandleType =
  | "top" | "bottom" | "left" | "right"
  | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type WindowIconType =
  | "minimize" | "maximize"
  | "restore" | "close";

export interface DialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  ref?: React.Ref<HTMLDialogElement>;
  children: React.ReactNode;
}

export interface ResizerHandleProps {
  id: string;
  type: ResizerHandleType;
}

export interface WindowIconProps {
  type: WindowIconType;
}

export interface WindowProps extends React.HTMLAttributes<HTMLDialogElement> {
  id: string;
  title: string;
  ref?: React.Ref<HTMLDialogElement>;
  children: React.ReactNode;
  onClose?: () => void;
}
