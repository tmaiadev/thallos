import React from "react";

export type PopupPosition =
  | "top span-right"
  | "top span-left"
  | "bottom span-right"
  | "bottom span-left"
  | "left span-top"
  | "left span-bottom"
  | "right span-top"
  | "right span-bottom";

export interface PopupProps {
  position: PopupPosition;
  children: React.ReactNode;
}

export interface PopupContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  position: PopupPosition;
}
