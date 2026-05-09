import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stack, StackItem } from "./Stack";
import { formatFlexAlign, formatGrowShrinkProp } from "./Stack.utils";

describe("formatGrowShrinkProp", () => {
  it("returns 1 when value is true", () => {
    expect(formatGrowShrinkProp(true)).toBe(1);
  });

  it("returns 0 when value is false", () => {
    expect(formatGrowShrinkProp(false)).toBe(0);
  });

  it("returns 0 when value is negative", () => {
    expect(formatGrowShrinkProp(-5)).toBe(0);
  });

  it("returns 0 when value is 0", () => {
    expect(formatGrowShrinkProp(0)).toBe(0);
  });

  it("returns the number as-is when positive", () => {
    expect(formatGrowShrinkProp(3)).toBe(3);
  });
});

describe("formatFlexAlign", () => {
  it('maps "start" to "flex-start"', () => {
    expect(formatFlexAlign("start")).toBe("flex-start");
  });

  it('maps "end" to "flex-end"', () => {
    expect(formatFlexAlign("end")).toBe("flex-end");
  });

  it('passes through "center" unchanged', () => {
    expect(formatFlexAlign("center")).toBe("center");
  });

  it('passes through "space-between" unchanged', () => {
    expect(formatFlexAlign("space-between")).toBe("space-between");
  });

  it('passes through "space-around" unchanged', () => {
    expect(formatFlexAlign("space-around")).toBe("space-around");
  });
});

describe("Stack", () => {
  // Rendering & structure
  it("renders a div element", () => {
    const { container } = render(<Stack />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it("renders its children", () => {
    render(<Stack><span>hello</span></Stack>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("applies the base stack class", () => {
    const { container } = render(<Stack />);
    expect(container.firstChild).toHaveClass("stack");
  });

  it("merges a custom className with the base class", () => {
    const { container } = render(<Stack className="custom" />);
    expect(container.firstChild).toHaveClass("stack");
    expect(container.firstChild).toHaveClass("custom");
  });

  it("forwards extra HTML attributes to the root div", () => {
    render(<Stack data-testid="my-stack" />);
    expect(screen.getByTestId("my-stack")).toBeInTheDocument();
  });

  // Direction
  it("defaults to vertical — no is-horizontal class", () => {
    const { container } = render(<Stack />);
    expect(container.firstChild).not.toHaveClass("is-horizontal");
  });

  it('applies is-horizontal when dir="horizontal"', () => {
    const { container } = render(<Stack dir="horizontal" />);
    expect(container.firstChild).toHaveClass("is-horizontal");
  });

  // Reverse
  it("does not apply is-reverse by default", () => {
    const { container } = render(<Stack />);
    expect(container.firstChild).not.toHaveClass("is-reverse");
  });

  it("applies is-reverse when reverse is true", () => {
    const { container } = render(<Stack reverse />);
    expect(container.firstChild).toHaveClass("is-reverse");
  });

  // CSS custom properties
  it("sets --gap to 0px by default", () => {
    const { container } = render(<Stack />);
    expect(container.firstChild).toHaveStyle({ "--gap": "0px" });
  });

  it("sets --gap to gap * 2 pixels", () => {
    const { container } = render(<Stack gap={4} />);
    expect(container.firstChild).toHaveStyle({ "--gap": "8px" });
  });

  it('sets --align-content to flex-start for alignContent="start"', () => {
    const { container } = render(<Stack alignContent="start" />);
    expect(container.firstChild).toHaveStyle({ "--align-content": "flex-start" });
  });

  it('sets --align-content to center for alignContent="center"', () => {
    const { container } = render(<Stack alignContent="center" />);
    expect(container.firstChild).toHaveStyle({ "--align-content": "center" });
  });

  it('sets --align-items to flex-end for alignItems="end"', () => {
    const { container } = render(<Stack alignItems="end" />);
    expect(container.firstChild).toHaveStyle({ "--align-items": "flex-end" });
  });

  it('sets --justify-content to space-between for justifyContent="space-between"', () => {
    const { container } = render(<Stack justifyContent="space-between" />);
    expect(container.firstChild).toHaveStyle({ "--justify-content": "space-between" });
  });

  it('sets --wrap to nowrap for wrap="nowrap"', () => {
    const { container } = render(<Stack wrap="nowrap" />);
    expect(container.firstChild).toHaveStyle({ "--wrap": "nowrap" });
  });

  // Ref forwarding
  it("forwards ref to the root div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Stack ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("StackItem", () => {
  // Rendering & structure
  it("renders a div element", () => {
    const { container } = render(<StackItem />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it("renders its children", () => {
    render(<StackItem><span>content</span></StackItem>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("applies the base stack-item class", () => {
    const { container } = render(<StackItem />);
    expect(container.firstChild).toHaveClass("stack-item");
  });

  it("merges a custom className with the base class", () => {
    const { container } = render(<StackItem className="custom" />);
    expect(container.firstChild).toHaveClass("stack-item");
    expect(container.firstChild).toHaveClass("custom");
  });

  // CSS custom properties
  it('sets --align-self to flex-start for alignSelf="start"', () => {
    const { container } = render(<StackItem alignSelf="start" />);
    expect(container.firstChild).toHaveStyle({ "--align-self": "flex-start" });
  });

  it('sets --align-self to center for alignSelf="center"', () => {
    const { container } = render(<StackItem alignSelf="center" />);
    expect(container.firstChild).toHaveStyle({ "--align-self": "center" });
  });

  it("sets --basis to the provided value", () => {
    const { container } = render(<StackItem basis="50%" />);
    expect(container.firstChild).toHaveStyle({ "--basis": "50%" });
  });

  it("sets --grow to 2 when grow={2}", () => {
    const { container } = render(<StackItem grow={2} />);
    expect(container.firstChild).toHaveStyle({ "--grow": "2" });
  });

  it("sets --grow to 1 when grow={true}", () => {
    const { container } = render(<StackItem grow={true} />);
    expect(container.firstChild).toHaveStyle({ "--grow": "1" });
  });

  it("sets --grow to 0 when grow={false}", () => {
    const { container } = render(<StackItem grow={false} />);
    expect(container.firstChild).toHaveStyle({ "--grow": "0" });
  });

  it("sets --shrink to 0 when shrink={0}", () => {
    const { container } = render(<StackItem shrink={0} />);
    expect(container.firstChild).toHaveStyle({ "--shrink": "0" });
  });

  it("sets --shrink to 1 when shrink={true}", () => {
    const { container } = render(<StackItem shrink={true} />);
    expect(container.firstChild).toHaveStyle({ "--shrink": "1" });
  });

  it("sets --shrink to 0 when shrink={false}", () => {
    const { container } = render(<StackItem shrink={false} />);
    expect(container.firstChild).toHaveStyle({ "--shrink": "0" });
  });

  it("sets --order to the provided value", () => {
    const { container } = render(<StackItem order={3} />);
    expect(container.firstChild).toHaveStyle({ "--order": "3" });
  });
});
