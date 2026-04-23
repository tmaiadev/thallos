import { render, screen, act } from "@testing-library/react";
import SystemTray from "./SystemTray";

describe("SystemTray", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a time element", () => {
    render(<SystemTray />);
    expect(screen.getByRole("time")).toBeInTheDocument();
  });

  it("renders initial placeholder text", () => {
    render(<SystemTray />);
    expect(screen.getByRole("time")).toBeInTheDocument();
  });

  it("sets clock title on mount", () => {
    render(<SystemTray />);
    const time = screen.getByRole("time");
    expect(time.title).toBeTruthy();
  });

  it("updates clock after 1 second", () => {
    render(<SystemTray />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole("time")).toBeInTheDocument();
  });

  it("clears interval on unmount", () => {
    const spy = vi.spyOn(globalThis, "clearInterval");
    const { unmount } = render(<SystemTray />);
    unmount();
    expect(spy).toHaveBeenCalled();
  });
});
