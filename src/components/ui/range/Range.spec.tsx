import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Range } from "./Range";

describe("Range", () => {
  // Rendering & structure
  it("renders a range input", () => {
    render(<Range label="Volume" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("applies the base root class to the label", () => {
    render(<Range label="Volume" />);
    expect(screen.getByRole("slider").closest("label")).toHaveClass("root");
  });

  it("merges a custom className with the base class", () => {
    render(<Range label="Volume" className="custom" />);
    const label = screen.getByRole("slider").closest("label");
    expect(label).toHaveClass("root");
    expect(label).toHaveClass("custom");
  });

  it("renders the label text", () => {
    render(<Range label="Volume" />);
    expect(screen.getByText("Volume")).toBeInTheDocument();
  });

  // Input type & prop forwarding
  it("sets input type to range", () => {
    render(<Range label="Volume" />);
    expect(screen.getByRole("slider")).toHaveAttribute("type", "range");
  });

  it("forwards min, max, and step attributes to the input", () => {
    render(<Range label="Volume" min={0} max={100} step={5} />);
    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("step", "5");
  });

  // Variant
  it("defaults to stacked layout — no horizontal class on label", () => {
    render(<Range label="Volume" />);
    expect(screen.getByRole("slider").closest("label")).not.toHaveClass("is-horizontal");
  });

  it("applies horizontal class to label when variant is inline", () => {
    render(<Range label="Volume" variant="inline" />);
    expect(screen.getByRole("slider").closest("label")).toHaveClass("is-horizontal");
  });

  // Disabled state
  it("disables the underlying input when disabled is passed", () => {
    render(<Range label="Volume" disabled />);
    expect(screen.getByRole("slider")).toBeDisabled();
  });

  it("applies the disabled class to the root label", () => {
    render(<Range label="Volume" disabled />);
    expect(screen.getByRole("slider").closest("label")).toHaveClass("is-disabled");
  });

  // Prefix & suffix
  it("renders prefix content when provided", () => {
    render(<Range label="Volume" prefix="Min" />);
    expect(screen.getByText("Min")).toBeInTheDocument();
  });

  it("renders suffix content when provided", () => {
    render(<Range label="Volume" suffix="Max" />);
    expect(screen.getByText("Max")).toBeInTheDocument();
  });

  it("does not render a prefix element when prefix is not provided", () => {
    const { container } = render(<Range label="Volume" />);
    expect(container.querySelector(".prefix")).toBeNull();
  });

  it("does not render a suffix element when suffix is not provided", () => {
    const { container } = render(<Range label="Volume" />);
    expect(container.querySelector(".suffix")).toBeNull();
  });

  it("prefix element has aria-hidden", () => {
    render(<Range label="Volume" prefix="Min" />);
    expect(screen.getByText("Min")).toHaveAttribute("aria-hidden", "true");
  });

  it("suffix element has aria-hidden", () => {
    render(<Range label="Volume" suffix="Max" />);
    expect(screen.getByText("Max")).toHaveAttribute("aria-hidden", "true");
  });

  // Ref forwarding
  it("forwards ref to the underlying input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Range label="Volume" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // Events
  it("calls onChange when the slider value changes", () => {
    const handleChange = vi.fn();
    render(<Range label="Volume" min={0} max={100} defaultValue={50} onChange={handleChange} />);
    const slider = screen.getByRole("slider") as HTMLInputElement;
    const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
    nativeSetter.call(slider, "51");
    fireEvent.change(slider);
    expect(handleChange).toHaveBeenCalled();
  });
});
