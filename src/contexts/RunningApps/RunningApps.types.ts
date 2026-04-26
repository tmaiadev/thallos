export type AppInstance = {
  id: string;
  appId: string;
  offsetIndex: number;
};

export type RunningAppsContextType = {
  instances: AppInstance[];
  launch: (appId: string) => void;
  close: (id: string) => void;
};
