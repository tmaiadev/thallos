import React from "react";
import { cn } from "@/utils/cn";
import "./button.css";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	type?: "button" | "submit" | "reset";
	children: React.ReactNode;
}

export default function Button({
	children,
	className,
	type = "button",
	...props
}: ButtonProps) {
	return <button type={type} className={cn("button", className)} {...props}>
		<div className="button__content">
			{children}
		</div>
	</button>
}