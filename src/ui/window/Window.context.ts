import { createContext } from "react";
import type { State } from "./Window.types";

export const Context = createContext({
  state: "default",
  /* v8 ignore start */
  setState: (_state: State) => { },
  /* v8 ignore stop */
});
