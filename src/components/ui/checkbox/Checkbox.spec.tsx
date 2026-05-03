import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders children as the accessible label", () => {
    render(<Checkbox>Accept terms</Checkbox>);
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeInTheDocument();
  });

  it("applies the base wrapper class to the label", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox").closest("label")).toHaveClass("wrapper");
  });

  it("merges a custom className with the base class", () => {
    render(<Checkbox className="custom" />);
    const label = screen.getByRole("checkbox").closest("label");
    expect(label).toHaveClass("wrapper");
    expect(label).toHaveClass("custom");
  });

  it("always has type=checkbox", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("type", "checkbox");
  });

  it("forwards checked prop to the input", () => {
    render(<Checkbox checked onChange={vi.fn()} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("forwards disabled prop — disables the input and applies disabledLabel to the span", () => {
    render(<Checkbox disabled>Label</Checkbox>);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
    const span = checkbox.closest("label")?.querySelector("span");
    expect(span).toHaveClass("disabled-label");
  });

  it("forwards ref to the underlying input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("forwards a click to the onChange callback", async () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledOnce();
  });
});
