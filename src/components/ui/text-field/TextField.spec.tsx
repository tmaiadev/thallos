import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("renders a text input", () => {
    render(<TextField />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies the base root class to the label", () => {
    render(<TextField />);
    expect(screen.getByRole("textbox").closest("label")).toHaveClass("root");
  });

  it("merges a custom className with the base class", () => {
    render(<TextField className="custom" />);
    const label = screen.getByRole("textbox").closest("label");
    expect(label).toHaveClass("root");
    expect(label).toHaveClass("custom");
  });

  it("renders the label text when provided", () => {
    render(<TextField label="Username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("does not render a label span when label is not provided", () => {
    render(<TextField />);
    expect(screen.getByRole("textbox").closest("label")?.querySelector("span")).toBeNull();
  });

  it("defaults to type=text", () => {
    render(<TextField />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

  it("applies the provided type", () => {
    render(<TextField type="email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("forwards disabled prop — disables the input and sets aria-disabled", () => {
    render(<TextField disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");
  });

  it("forwards readOnly prop to the input", () => {
    render(<TextField readOnly />);
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  });

  it("applies stacked layout by default — no horizontal class on label", () => {
    render(<TextField />);
    expect(screen.getByRole("textbox").closest("label")).not.toHaveClass("is-horizontal");
  });

  it("applies horizontal class to label when variant is inline", () => {
    render(<TextField variant="inline" />);
    expect(screen.getByRole("textbox").closest("label")).toHaveClass("is-horizontal");
  });

  it("forwards ref to the underlying input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("forwards change events to the onChange callback", async () => {
    const handleChange = vi.fn();
    render(<TextField onChange={handleChange} />);
    await userEvent.type(screen.getByRole("textbox"), "hello");
    expect(handleChange).toHaveBeenCalled();
  });
});
