import { useState } from "react";
import { Context } from "../Window.context";
import type { State } from "../Window.types";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>("default");

  return <Context.Provider value={{ state, setState }}>
    {children}
  </Context.Provider>;
}
