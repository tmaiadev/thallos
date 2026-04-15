import { cn } from "@/utils/cn"
import type { ResizerHandleType } from "../types"

export default function ResizerHandle({ type }: { type: ResizerHandleType }) {
    return <div className={cn("window__resizer-handle", `window__resizer-handle--${type}`)} />
}