import React, { useState, useContext, useEffect, useRef, createContext } from "react";
import Button from "@/ui/button";
import { cn } from "@/utils/cn";
import "./window.css";

type State = "default" | "maximized" | "minimized";

const Context = createContext({
	state: "default",
	setState: (_state: State) => { },
});

function Provider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<State>("default");

	return <Context.Provider value={{ state, setState }}>
		{children}
	</Context.Provider>
}

interface DialogProps extends React.HTMLAttributes<HTMLDialogElement> {
	ref?: React.Ref<HTMLDialogElement>;
	children: React.ReactNode;
}

function Dialog({ id, className, ref, children, ...props }: DialogProps) {
	const { state } = useContext(Context);

	return <dialog
		id={id}
		ref={ref}
		className={cn(
			"window",
			state === "maximized" && "window--maximized",
			className
		)}
		aria-describedby={`${id}-title`}
		open={state !== "minimized"}
		{...props}
	>
		{children}
	</dialog>
}

export function TitleBar({ id, children }: { id: string, children: React.ReactNode }) {
	const { state, setState } = useContext(Context);
	const titleBarRef = useRef<HTMLDivElement>(null);

	// Dragging window
	useEffect(() => {
		const titleBar = titleBarRef.current;
		const dialog = document.getElementById(id) as HTMLDialogElement;

		if (!titleBar) return;

		let isDragging = false,
			mouseInitX = 0,
			mouseInitY = 0,
			mouseX = 0,
			mouseY = 0,
			dialogInitX = 0,
			dialogInitY = 0;

		function onDragStart(event: MouseEvent) {
			isDragging = true;
			mouseInitX = event.screenX;
			mouseInitY = event.screenY;

			dialogInitX = parseInt(dialog.style.getPropertyValue('--x') || "0", 10);
			dialogInitY = parseInt(dialog.style.getPropertyValue('--y') || "0", 10);
		}

		function onDragMove(event: MouseEvent) {
			if (!isDragging) return;

			mouseX = event.screenX;
			mouseY = event.screenY;

			const diffX = mouseX - mouseInitX;
			const diffY = mouseY - mouseInitY;

			const x = diffX + dialogInitX;
			const y = diffY + dialogInitY;

			dialog.style.setProperty("--x", x.toString())
			dialog.style.setProperty("--y", y.toString());
		}

		function onDragEnd() {
			if (isDragging) isDragging = false;
		}

		titleBar.addEventListener('mousedown', onDragStart);
		document.body.addEventListener('mousemove', onDragMove);
		document.body.addEventListener('mouseup', onDragEnd);

		return () => {
			titleBar.removeEventListener('mousedown', onDragStart);
			document.body.removeEventListener('mousemove', onDragMove);
			document.body.removeEventListener('mouseup', onDragEnd);
		}
	}, [id]);

	// Maximizing / Restoring
	useEffect(() => {
		const titleBar = titleBarRef.current;

		if (!titleBar) return;

		let clickTime = 0;
		function onClick() {
			const now = Date.now();
			const diff = now - clickTime;

			if (diff < 300) {
				setState(state === "maximized" ? "default" : "maximized");
			}

			clickTime = now;
		}

		titleBar.addEventListener('click', onClick);
		return () => {
			titleBar.removeEventListener('click', onClick);
		}
	}, [state, setState]);

	return <div className="window__title-bar" ref={titleBarRef}>
		<h2
			id={`${id}-title`}
			className="window__title-bar__title"
		>
			{children}
		</h2>
		<Arrangement />
	</div>
}

export function Arrangement() {
	const { state, setState } = useContext(Context);

	return <div role="group" aria-label="Window Arrangement" className="window__arrangement">
		<Button aria-label="Minimize" onClick={() => setState("minimized")}>_</Button>
		{state !== "maximized" && <Button aria-label="Maximize" onClick={() => setState("maximized")}>+</Button>}
		{state === "maximized" && <Button aria-label="Restore" onClick={() => setState("default")}>-</Button>}
		<Button aria-label="Close">&times;</Button>
	</div>
}

export interface WindowProps extends React.HTMLAttributes<HTMLDialogElement> {
	id: string;
	title: string;
	ref?: React.Ref<HTMLDialogElement>;
	children: React.ReactNode;
}

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
			{children}
		</Dialog>
	</Provider>
}