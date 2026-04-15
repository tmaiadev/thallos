export type State = "default" | "maximized" | "minimized";

export interface DialogProps extends React.HTMLAttributes<HTMLDialogElement> {
    ref?: React.Ref<HTMLDialogElement>;
    children: React.ReactNode;
}

export interface WindowProps extends React.HTMLAttributes<HTMLDialogElement> {
	id: string;
	title: string;
	ref?: React.Ref<HTMLDialogElement>;
	children: React.ReactNode;
}
