import type { ClassNameParameterList } from "./cn.types";

export function cn(...classList: ClassNameParameterList): string {
    return classList
        .filter(className => Boolean(className))
        .join(" ");
}