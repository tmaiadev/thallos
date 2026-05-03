import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Fieldset } from "./Fieldset";

describe("Fieldset", () => {
  it("renders a fieldset element", () => {
    render(<Fieldset />);
    expect(document.querySelector("fieldset")).toBeInTheDocument();
  });

  it("renders children inside the fieldset", () => {
    render(<Fieldset><input aria-label="name" /></Fieldset>);
    expect(screen.getByRole("textbox", { name: "name" })).toBeInTheDocument();
  });

  it("renders a legend when the legend prop is provided", () => {
    render(<Fieldset legend="Personal Info" />);
    expect(screen.getByText("Personal Info").tagName).toBe("LEGEND");
  });

  it("does not render a legend element when the legend prop is omitted", () => {
    render(<Fieldset />);
    expect(document.querySelector("legend")).not.toBeInTheDocument();
  });

  it("accepts a ReactNode as legend", () => {
    render(<Fieldset legend={<span>Rich Legend</span>} />);
    expect(screen.getByText("Rich Legend")).toBeInTheDocument();
  });

  it("applies the base fieldset class", () => {
    render(<Fieldset />);
    expect(document.querySelector("fieldset")).toHaveClass("fieldset");
  });

  it("merges a custom className with the base class", () => {
    render(<Fieldset className="custom" />);
    const fieldset = document.querySelector("fieldset");
    expect(fieldset).toHaveClass("fieldset");
    expect(fieldset).toHaveClass("custom");
  });

  it("forwards the disabled prop", () => {
    render(<Fieldset disabled />);
    expect(document.querySelector("fieldset")).toBeDisabled();
  });

  it("forwards ref to the fieldset element", () => {
    const ref = createRef<HTMLFieldSetElement>();
    render(<Fieldset ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
  });

  it("forwards extra HTML attributes to the fieldset", () => {
    render(<Fieldset data-testid="my-fieldset" />);
    expect(screen.getByTestId("my-fieldset").tagName).toBe("FIELDSET");
  });
});
