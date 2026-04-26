import { Suspense } from "react";
import Taskbar from "../Taskbar";
import { useRunningApps } from "@/contexts/RunningApps";
import apps from "@/registry/apps";
import styles from "./Workspace.module.css";

export default function Workspace() {
  const { instances, close } = useRunningApps();

  return (
    <div className={styles.workspace}>
      <div className={styles.desktop} />
      <Suspense>
        {instances.map(({ id, appId, offsetIndex }) => {
          const app = apps[appId];
          if (!app) return null;
          const { Component } = app;
          return (
            <Component
              key={id}
              instanceId={id}
              offsetIndex={offsetIndex}
              onClose={() => close(id)}
            />
          );
        })}
      </Suspense>
      <div className={styles.taskbar}>
        <Taskbar />
      </div>
    </div>
  );
}
