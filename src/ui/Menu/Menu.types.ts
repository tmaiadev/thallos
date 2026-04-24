import React from "react";

export type MenuOrientation = "horizontal" | "vertical";

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  orientation?: MenuOrientation;
  children: React.ReactNode;
  onClose?: () => void;
}

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  active?: boolean;
  onSelect?: () => void;
}

export type MenuDividerProps = React.HTMLAttributes<HTMLLIElement>;
