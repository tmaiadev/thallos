import React from "react";
import type { IconType } from "@/ui/Icon";

export type MenuOrientation = "horizontal" | "vertical";

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  orientation?: MenuOrientation;
  children: React.ReactNode;
  onClose?: () => void;
}

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  active?: boolean;
  icon?: IconType;
  onSelect?: () => void;
}

export interface SubMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  label: React.ReactNode;
  icon?: IconType;
  active?: boolean;
  children: React.ReactNode;
}

export type MenuDividerProps = React.HTMLAttributes<HTMLLIElement>;
