import { cn } from "@/utils/cn";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export default function Icon({
  type,
  size = "md",
  alt = "",
  className,
  ...props
}: IconProps) {
  return (
    <img
      src={`/icons/${type}.png`}
      alt={alt}
      className={cn(styles.icon, styles[size], className)}
      {...props}
    />
  );
}
