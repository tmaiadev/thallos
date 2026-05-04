import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("renders a separator element", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector("hr");
    expect(separator).toBeInTheDocument();
  });

  it("has role separator", () => {
    const { getByRole } = render(<Separator />);
    expect(getByRole("separator")).toBeInTheDocument();
  });

  it("applies the base separator class", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector("hr");
    expect(separator).toHaveClass("separator");
  });

  it("applies horizontal class by default", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector("hr");
    expect(separator).toHaveClass("horizontal");
    expect(separator).not.toHaveClass("vertical");
  });

  it("applies vertical class when orientation is vertical", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.querySelector("hr");
    expect(separator).toHaveClass("vertical");
    expect(separator).not.toHaveClass("horizontal");
  });

  it("merges a custom className with the base classes", () => {
    const { container } = render(<Separator className="custom" />);
    const separator = container.querySelector("hr");
    expect(separator).toHaveClass("separator");
    expect(separator).toHaveClass("horizontal");
    expect(separator).toHaveClass("custom");
  });

  it("forwards ref to the hr element", () => {
    const ref = createRef<HTMLHRElement>();
    const { container } = render(<Separator ref={ref} />);
    const separator = container.querySelector("hr");
    expect(ref.current).toBe(separator);
    expect(ref.current).toBeInstanceOf(HTMLHRElement);
  });

  it("forwards additional HTML attributes", () => {
    const { container } = render(<Separator data-testid="sep" aria-label="divider" />);
    const separator = container.querySelector("hr");
    expect(separator).toHaveAttribute("data-testid", "sep");
    expect(separator).toHaveAttribute("aria-label", "divider");
  });
});
