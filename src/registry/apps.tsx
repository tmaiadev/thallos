import { lazy } from "react";

export type AppDefinition = {
  title: string;
  Component: React.LazyExoticComponent<React.ComponentType<AppComponentProps>>;
};

export type AppComponentProps = {
  instanceId: string;
  offsetIndex: number;
  onClose: () => void;
};

const apps: Record<string, AppDefinition> = {
  appearance: {
    title: "Appearance",
    Component: lazy(() => import("@/apps/Appearance")),
  },
};

export default apps;
