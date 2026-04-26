import { createContext } from "react";
import type { RunningAppsContextType } from "./RunningApps.types";

export const RunningAppsContext = createContext<RunningAppsContextType>({
  instances: [],
  /* v8 ignore start */
  launch: () => {},
  close: () => {},
  /* v8 ignore stop */
});
