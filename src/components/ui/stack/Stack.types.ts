import type { ElementType, ComponentPropsWithRef } from "react";

interface StackOwnProps<E extends ElementType = "div"> {
    as?: E,
    alignItems?: "start" | "end" | "center" | "stretch" | "baseline";
    alignContent?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
    dir?: "horizontal" | "vertical",
    gap?: number,
    justifyContent?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly",
    reverse?: boolean,
    wrap?: "nowrap" | "wrap" | "wrap-reverse",
};

export type StackProps<E extends ElementType = "div"> = StackOwnProps<E> & Omit<ComponentPropsWithRef<E>, keyof StackOwnProps<E>>;

export interface StackItemOwnProps<E extends ElementType = "div"> {
    as?: E,
    alignSelf?: "auto" | string;
    basis?: "basis" | string;
    grow?: boolean | number;
    order?: number;
    shrink?: boolean | number;
}

export type StackItemProps<E extends ElementType = "div"> = StackItemOwnProps<E> & Omit<ComponentPropsWithRef<E>, keyof StackItemOwnProps<E>>;