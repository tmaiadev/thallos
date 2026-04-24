import { cn } from "@/utils/cn";
import styles from "./MenuDivider.module.css";
import type { MenuDividerProps } from "../Menu.types";

export default function MenuDivider({
  className,
  ref,
  ...props
}: MenuDividerProps & { ref?: React.Ref<HTMLLIElement> }) {
  return (
    <li
      ref={ref}
      role="separator"
      className={cn(styles["menu-divider"], className)}
      {...props}
    />
  );
}
