import { render, screen } from "@testing-library/react";
import Window from "./Window";

describe("Window", () => {
  it("renders title", () => {
    render(<Window id="w1" title="My Window">Content</Window>);
    expect(screen.getByText("My Window")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Window id="w1" title="My Window">Hello World</Window>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("is open by default", () => {
    render(<Window id="w1" title="My Window">Content</Window>);
    expect(screen.getByRole("dialog")).toHaveAttribute("open");
  });

  it("renders 8 resizer handles", () => {
    const { container } = render(
      <Window id="w1" title="My Window">Content</Window>
    );
    expect(container.querySelectorAll(".resizer-handle")).toHaveLength(8);
  });

  it("renders window controls", () => {
    render(<Window id="w1" title="My Window">Content</Window>);
    const controls = screen.getByRole("group", { name: "Window Controls" });
    expect(controls).toBeInTheDocument();
  });

  it("renders minimize, maximize and close buttons", () => {
    render(<Window id="w1" title="My Window">Content</Window>);
    expect(screen.getByRole("button", { name: "Minimize" }))
      .toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Maximize" }))
      .toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" }))
      .toBeInTheDocument();
  });

  it("applies content class to content wrapper", () => {
    const { container } = render(
      <Window id="w1" title="My Window">Content</Window>
    );
    expect(container.querySelector(".content")).toBeInTheDocument();
  });
});
