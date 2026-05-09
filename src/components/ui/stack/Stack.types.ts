import type { HTMLAttributes, RefObject } from "react";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
    alignItems?: "start" | "end" | "center" | "stretch" | "baseline";
    alignContent?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
    dir?: "horizontal" | "vertical",
    gap?: number,
    justifyContent?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly",
    ref?: RefObject<HTMLDivElement | null>,
    reverse?: boolean,
    wrap?: "nowrap" | "wrap" | "wrap-reverse",
};

export interface StackItemProps extends HTMLAttributes<HTMLDivElement> {
    alignSelf?: "auto" | string;
    basis?: "basis" | string;
    grow?: boolean | number;
    order?: number;
    shrink?: boolean | number;
}