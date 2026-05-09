import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RadioButton } from "./RadioButton";

describe("RadioButton", () => {
  it("renders a radio input", () => {
    render(<RadioButton />);
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("renders children as the accessible label", () => {
    render(<RadioButton>Option A</RadioButton>);
    expect(screen.getByRole("radio", { name: "Option A" })).toBeInTheDocument();
  });

  it("applies the base root class to the label", () => {
    render(<RadioButton />);
    expect(screen.getByRole("radio").closest("label")).toHaveClass("root");
  });

  it("merges a custom className with the base class", () => {
    render(<RadioButton className="custom" />);
    const label = screen.getByRole("radio").closest("label");
    expect(label).toHaveClass("root");
    expect(label).toHaveClass("custom");
  });

  it("always has type=radio", () => {
    render(<RadioButton />);
    expect(screen.getByRole("radio")).toHaveAttribute("type", "radio");
  });

  it("forwards checked prop to the input", () => {
    render(<RadioButton checked onChange={vi.fn()} />);
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("forwards disabled prop — disables the input and applies disabled-label to the span", () => {
    render(<RadioButton disabled>Label</RadioButton>);
    const radio = screen.getByRole("radio");
    expect(radio).toBeDisabled();
    const span = radio.closest("label")?.querySelector("span");
    expect(span).toHaveClass("disabled-label");
  });

  it("forwards ref to the underlying input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<RadioButton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("forwards a click to the onChange callback", async () => {
    const handleChange = vi.fn();
    render(<RadioButton onChange={handleChange} />);
    await userEvent.click(screen.getByRole("radio"));
    expect(handleChange).toHaveBeenCalledOnce();
  });

  describe("radio group", () => {
    it("selecting one option in a group deselects the others", async () => {
      render(
        <>
          <RadioButton name="group" value="a" defaultChecked>Option A</RadioButton>
          <RadioButton name="group" value="b">Option B</RadioButton>
        </>
      );
      const optionA = screen.getByRole("radio", { name: "Option A" });
      const optionB = screen.getByRole("radio", { name: "Option B" });

      expect(optionA).toBeChecked();
      expect(optionB).not.toBeChecked();

      await userEvent.click(optionB);

      expect(optionB).toBeChecked();
      expect(optionA).not.toBeChecked();
    });

    it("radio buttons in different groups do not affect each other", async () => {
      render(
        <>
          <RadioButton name="group-1" value="a" defaultChecked>Group 1 - A</RadioButton>
          <RadioButton name="group-2" value="b" defaultChecked>Group 2 - B</RadioButton>
        </>
      );
      const group1 = screen.getByRole("radio", { name: "Group 1 - A" });
      const group2 = screen.getByRole("radio", { name: "Group 2 - B" });

      await userEvent.click(group1);

      expect(group1).toBeChecked();
      expect(group2).toBeChecked();
    });
  });
});
