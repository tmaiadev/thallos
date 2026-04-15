import Provider from "./components/provider";
import type { WindowProps } from "./types";
import Dialog from "./components/dialog";
import TitleBar from "./components/title-bar";
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
        </Dialog>
    </Provider>
}