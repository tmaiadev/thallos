import { createContext, useContext } from "react";
import type { PopupContextValue } from "./Popup.types";

export const PopupContext =
  createContext<PopupContextValue | null>(null);

export function usePopup() {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used inside <Popup>");
  return ctx;
}
