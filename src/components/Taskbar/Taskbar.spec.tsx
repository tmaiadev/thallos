import { render, screen } from "@testing-library/react";
import Taskbar from "./Taskbar";

describe("Taskbar", () => {
  it("renders Start button", () => {
    render(<Taskbar />);
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  });

  it("renders system tray clock", () => {
    render(<Taskbar />);
    expect(screen.getByRole("time")).toBeInTheDocument();
  });

  it("renders taskbar container", () => {
    const { container } = render(<Taskbar />);
    expect(container.querySelector(".taskbar")).toBeInTheDocument();
  });

  it("renders tasks area", () => {
    const { container } = render(<Taskbar />);
    expect(container.querySelector(".tasks")).toBeInTheDocument();
  });

  it("renders divider", () => {
    const { container } = render(<Taskbar />);
    expect(container.querySelector(".divider")).toBeInTheDocument();
  });
});
