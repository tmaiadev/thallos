import { useContext } from "react";
import { RunningAppsContext } from "./RunningApps.context";

export function useRunningApps() {
  return useContext(RunningAppsContext);
}
