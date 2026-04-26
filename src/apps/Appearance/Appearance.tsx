import { useState } from "react";
import Window from "@/ui/Window";
import Button from "@/ui/Button";
import ColorPicker from "@/ui/ColorPicker";
import type { AppComponentProps } from "@/registry/apps";
import styles from "./Appearance.module.css";

const DEFAULTS = {
  wallpaper: "#008080",
  accent: "#000080",
  surface: "#c0c0c0",
  scale: 1,
};

export default function Appearance({ instanceId, offsetIndex, onClose }: AppComponentProps) {
  const x = 40 + offsetIndex * 24;
  const y = 40 + offsetIndex * 24;

  const [wallpaper, setWallpaper] = useState(DEFAULTS.wallpaper);
  const [accent, setAccent] = useState(DEFAULTS.accent);
  const [surface, setSurface] = useState(DEFAULTS.surface);
  const [scale, setScale] = useState(DEFAULTS.scale);

  function handleApply() {
    const body = document.body as HTMLElement | null;
    if (!body) return;
    body.style.setProperty("--cyan", wallpaper);
    body.style.setProperty("--accent", accent);
    body.style.setProperty("--background", surface);
    body.style.setProperty("--scale", String(scale));
  }

  return (
    <Window
      id={instanceId}
      title="Appearance"
      onClose={onClose}
      className={styles.app}
      style={{ "--x": `${x}px`, "--y": `${y}px` } as React.CSSProperties}
    >
      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Wallpaper Color</label>
          <ColorPicker
            value={wallpaper}
            onChange={setWallpaper}
            label="Wallpaper color"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Accent Color</label>
          <ColorPicker
            value={accent}
            onChange={setAccent}
            label="Accent color"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Surface Background Color</label>
          <ColorPicker
            value={surface}
            onChange={setSurface}
            label="Surface background color"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Scale ({scale})</label>
          <input
            type="range"
            className={styles.range}
            min={1}
            max={10}
            step={1}
            value={scale}
            aria-label="Scale"
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <Button onClick={onClose} size="md">Cancel</Button>
        <Button onClick={handleApply} size="md">Apply</Button>
      </div>
    </Window>
  );
}
