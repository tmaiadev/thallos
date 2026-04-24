import React from "react";

export type IconSize = "sm" | "md" | "lg";

export interface IconProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  type: string;
  size?: IconSize;
}
