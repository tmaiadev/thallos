import { render, screen, fireEvent } from "@testing-library/react";
import TitleBar from "./TitleBar";
import Provider from "./Provider";

const DIALOG_ID = "test-dialog";

function setupDialog() {
  const dialog = document.createElement("dialog");
  dialog.id = DIALOG_ID;
  document.body.appendChild(dialog);
  return dialog;
}

function renderTitleBar(title = "Test Title") {
  setupDialog();
  return render(
    <Provider>
      <TitleBar id={DIALOG_ID}>{title}</TitleBar>
    </Provider>
  );
}

describe("TitleBar", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders the title text", () => {
    renderTitleBar("My Window");
    expect(screen.getByText("My Window")).toBeInTheDocument();
  });

  it("renders title as a heading", () => {
    renderTitleBar("My Window");
    expect(screen.getByRole("heading", { name: "My Window" }))
      .toBeInTheDocument();
  });

  it("renders Window Controls", () => {
    renderTitleBar();
    const controls = screen.getByRole("group", { name: "Window Controls" });
    expect(controls).toBeInTheDocument();
  });

  it("renders minimize button", () => {
    renderTitleBar();
    expect(screen.getByRole("button", { name: "Minimize" }))
      .toBeInTheDocument();
  });

  it("applies title-bar class", () => {
    const { container } = renderTitleBar();
    expect(container.querySelector(".title-bar")).toBeInTheDocument();
  });

  it("applies title-slot class", () => {
    const { container } = renderTitleBar();
    expect(container.querySelector(".title-slot")).toBeInTheDocument();
  });

  it("double-click within 300ms toggles maximize", () => {
    renderTitleBar();
    const titleBar = document.querySelector(".title-bar") as HTMLElement;

    fireEvent.click(titleBar);
    fireEvent.click(titleBar);

    expect(screen.getByRole("button", { name: "Restore" })).toBeInTheDocument();
  });

  it("double-click on maximized restores default", () => {
    renderTitleBar();
    const titleBar = document.querySelector(".title-bar") as HTMLElement;

    fireEvent.click(titleBar);
    fireEvent.click(titleBar);
    fireEvent.click(titleBar);
    fireEvent.click(titleBar);

    expect(screen.getByRole("button", { name: "Maximize" }))
      .toBeInTheDocument();
  });

  it("drags dialog on mousedown + mousemove", () => {
    renderTitleBar();
    const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement;
    const titleBar = document.querySelector(".title-bar") as HTMLElement;

    fireEvent.mouseDown(titleBar, { screenX: 0, screenY: 0 });
    fireEvent.mouseMove(document.body, { screenX: 50, screenY: 30 });
    fireEvent.mouseUp(document.body);

    expect(dialog.style.getPropertyValue("--x")).not.toBe("");
    expect(dialog.style.getPropertyValue("--y")).not.toBe("");
  });

  it("does not move dialog on mousemove without mousedown", () => {
    renderTitleBar();
    const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement;

    fireEvent.mouseMove(document.body, { screenX: 50, screenY: 30 });

    expect(dialog.style.getPropertyValue("--x")).toBe("");
  });

  it("registers and removes drag event listeners", () => {
    const addSpy = vi.spyOn(document.body, "addEventListener");
    const removeSpy = vi.spyOn(document.body, "removeEventListener");
    const { unmount } = renderTitleBar();
    expect(addSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });
});
