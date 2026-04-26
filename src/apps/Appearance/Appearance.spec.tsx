import { render, screen, fireEvent } from "@testing-library/react";
import Appearance from "./Appearance";

function renderApp(offsetIndex = 0) {
  const onClose = vi.fn();
  const result = render(
    <Appearance instanceId="appearance-0" offsetIndex={offsetIndex} onClose={onClose} />
  );
  return { ...result, onClose };
}

describe("Appearance", () => {
  it("renders a dialog titled Appearance", () => {
    renderApp();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Appearance")).toBeInTheDocument();
  });

  it("shows Wallpaper Color picker with cyan default", () => {
    renderApp();
    expect(screen.getByRole("button", { name: "Wallpaper color" }))
      .toBeInTheDocument();
    expect(screen.getByText("#008080")).toBeInTheDocument();
  });

  it("shows Accent Color picker with navy default", () => {
    renderApp();
    expect(screen.getByRole("button", { name: "Accent color" }))
      .toBeInTheDocument();
    expect(screen.getByText("#000080")).toBeInTheDocument();
  });

  it("shows Surface Background Color picker with silver default", () => {
    renderApp();
    expect(screen.getByRole("button", { name: "Surface background color" }))
      .toBeInTheDocument();
    expect(screen.getByText("#c0c0c0")).toBeInTheDocument();
  });

  it("shows Scale range input defaulting to 1", () => {
    renderApp();
    const range = screen.getByRole("slider", { name: "Scale" });
    expect(range).toHaveValue("1");
  });

  it("Cancel button calls onClose", () => {
    const { onClose } = renderApp();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Close window button calls onClose", () => {
    const { onClose } = renderApp();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Apply sets --cyan CSS variable on document.body", () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(document.body.style.getPropertyValue("--cyan")).toBe("#008080");
    document.body.style.removeProperty("--cyan");
  });

  it("Apply sets --accent CSS variable on document.body", () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(document.body.style.getPropertyValue("--accent")).toBe("#000080");
    document.body.style.removeProperty("--accent");
  });

  it("Apply sets --background CSS variable on document.body", () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(document.body.style.getPropertyValue("--background")).toBe("#c0c0c0");
    document.body.style.removeProperty("--background");
  });

  it("Apply sets --scale CSS variable on document.body", () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(document.body.style.getPropertyValue("--scale")).toBe("1");
    document.body.style.removeProperty("--scale");
  });

  it("positions the window using cascade offset", () => {
    const { container } = renderApp(2);
    const dialog = container.querySelector("dialog") as HTMLDialogElement;
    expect(dialog.style.getPropertyValue("--x")).toBe("88px");
    expect(dialog.style.getPropertyValue("--y")).toBe("88px");
  });
});
