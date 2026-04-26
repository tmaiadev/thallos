import { render, screen, fireEvent } from "@testing-library/react";
import ColorPicker from "./ColorPicker";

describe("ColorPicker", () => {
  it("renders the hex value", () => {
    render(<ColorPicker value="#008080" onChange={() => {}} />);
    expect(screen.getByText("#008080")).toBeInTheDocument();
  });

  it("renders a swatch with the current color as background", () => {
    const { container } = render(
      <ColorPicker value="#008080" onChange={() => {}} />
    );
    const swatch = container.querySelector(".swatch") as HTMLElement;
    expect(swatch.style.backgroundColor).toBe("rgb(0, 128, 128)");
  });

  it("calls onChange when color input changes", () => {
    const onChange = vi.fn();
    const { container } = render(
      <ColorPicker value="#008080" onChange={onChange} />
    );
    const input = container.querySelector("input[type=color]") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "#ff0000" } });
    expect(onChange).toHaveBeenCalledWith("#ff0000");
  });

  it("uses the provided label as aria-label", () => {
    render(
      <ColorPicker value="#008080" onChange={() => {}} label="Wallpaper color" />
    );
    expect(screen.getByRole("button", { name: "Wallpaper color" }))
      .toBeInTheDocument();
  });

  it("falls back to a default aria-label when no label is provided", () => {
    render(<ColorPicker value="#008080" onChange={() => {}} />);
    expect(
      screen.getByRole("button", { name: /Color picker/ })
    ).toBeInTheDocument();
  });

  it("forwards className to the root element", () => {
    const { container } = render(
      <ColorPicker value="#008080" onChange={() => {}} className="my-class" />
    );
    expect(container.firstChild).toHaveClass("my-class");
  });

  it("opens color input on Enter key", () => {
    const { container } = render(
      <ColorPicker value="#008080" onChange={() => {}} />
    );
    const input = container.querySelector("input[type=color]") as HTMLInputElement;
    const clickSpy = vi.spyOn(input, "click");
    const picker = screen.getByRole("button");
    fireEvent.keyDown(picker, { key: "Enter" });
    expect(clickSpy).toHaveBeenCalled();
  });

  it("opens color input on Space key", () => {
    const { container } = render(
      <ColorPicker value="#008080" onChange={() => {}} />
    );
    const input = container.querySelector("input[type=color]") as HTMLInputElement;
    const clickSpy = vi.spyOn(input, "click");
    const picker = screen.getByRole("button");
    fireEvent.keyDown(picker, { key: " " });
    expect(clickSpy).toHaveBeenCalled();
  });
});
