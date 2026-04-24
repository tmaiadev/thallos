import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("defaults to type=button", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("accepts custom type", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("applies button class", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("button");
  });

  it("applies md class when size=md", () => {
    render(<Button size="md">Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("md");
  });

  it("applies lg class when size=lg", () => {
    render(<Button size="lg">Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("lg");
  });

  it("applies no size class when size is undefined", () => {
    render(<Button>Click</Button>);
    const btn = screen.getByRole("button");
    expect(btn).not.toHaveClass("md");
    expect(btn).not.toHaveClass("lg");
  });

  it("applies external className", () => {
    render(<Button className="custom">Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom");
  });

  it("forwards additional HTML attributes", () => {
    render(<Button aria-label="test-btn">Click</Button>);
    expect(screen.getByRole("button", { name: "test-btn" }))
      .toBeInTheDocument();
  });

  it("renders content wrapper div", () => {
    const { container } = render(<Button>Click</Button>);
    expect(container.querySelector(".content")).toBeInTheDocument();
  });
});
