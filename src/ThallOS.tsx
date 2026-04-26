import Workspace from "@/components/Workspace";
import { RunningAppsProvider } from "@/contexts/RunningApps";

export default function ThallOS() {
  return (
    <RunningAppsProvider>
      <Workspace />
    </RunningAppsProvider>
  );
}