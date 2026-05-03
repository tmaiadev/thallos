import type { ButtonHTMLAttributes, RefObject } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: RefObject<HTMLButtonElement | null>,
}