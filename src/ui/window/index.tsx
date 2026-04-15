import Provider from "./components/provider";
import type { WindowProps } from "./types";
import Dialog from "./components/dialog";
import TitleBar from "./components/title-bar";
import ResizerHandle from "./components/resizer-handle";
import './styles.css'

export default function Window({
    id,
    title,
    ref,
    className,
    children,
    ...props
}: WindowProps) {
    return <Provider>
        <Dialog
            id={id}
            ref={ref}
            className={className}
            {...props}
        >
            <TitleBar id={id}>{title}</TitleBar>
            <div className="window__content">
                {children}
            </div>
            <ResizerHandle type="top" />
            <ResizerHandle type="bottom" />
            <ResizerHandle type="left" />
            <ResizerHandle type="right" />
            <ResizerHandle type="top-left" />
            <ResizerHandle type="top-right" />
            <ResizerHandle type="bottom-left" />
            <ResizerHandle type="bottom-right" />
        </Dialog>
    </Provider>
}