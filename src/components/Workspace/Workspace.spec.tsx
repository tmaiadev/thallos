import { render, screen } from "@testing-library/react";
import Workspace from "./Workspace";

describe("Workspace", () => {
  it("renders workspace container", () => {
    const { container } = render(<Workspace />);
    expect(container.querySelector(".workspace")).toBeInTheDocument();
  });

  it("renders desktop area", () => {
    const { container } = render(<Workspace />);
    expect(container.querySelector(".desktop")).toBeInTheDocument();
  });

  it("renders taskbar area", () => {
    const { container } = render(<Workspace />);
    expect(container.querySelector(".taskbar")).toBeInTheDocument();
  });

  it("renders Start button inside taskbar", () => {
    render(<Workspace />);
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  });
});
