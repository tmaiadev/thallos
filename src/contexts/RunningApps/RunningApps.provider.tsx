import { useState, useCallback } from "react";
import { RunningAppsContext } from "./RunningApps.context";
import type { AppInstance } from "./RunningApps.types";

let counter = 0;

export default function RunningAppsProvider({ children }: { children: React.ReactNode }) {
  const [instances, setInstances] = useState<AppInstance[]>([]);

  const launch = useCallback((appId: string) => {
    setInstances(prev => {
      const id = `${appId}-${counter++}`;
      return [...prev, { id, appId, offsetIndex: prev.length }];
    });
  }, []);

  const close = useCallback((id: string) => {
    setInstances(prev => prev.filter(instance => instance.id !== id));
  }, []);

  return (
    <RunningAppsContext.Provider value={{ instances, launch, close }}>
      {children}
    </RunningAppsContext.Provider>
  );
}
