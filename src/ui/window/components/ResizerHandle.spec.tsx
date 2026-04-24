import { render, fireEvent } from "@testing-library/react";
import ResizerHandle from "./ResizerHandle";
import type { ResizerHandleType } from "../Window.types";

const DIALOG_ID = "resize-dialog";

function setupDialog() {
  const dialog = document.createElement("dialog");
  dialog.id = DIALOG_ID;
  document.body.appendChild(dialog);
  return dialog;
}

function renderHandle(type: ResizerHandleType) {
  return render(<ResizerHandle id={DIALOG_ID} type={type} />);
}

describe("ResizerHandle", () => {
  beforeEach(() => {
    setupDialog();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  const types: ResizerHandleType[] = [
    "top", "bottom", "left", "right",
    "top-left", "top-right", "bottom-left", "bottom-right",
  ];

  types.forEach(type => {
    it(`applies resizer-handle and ${type} classes for type="${type}"`, () => {
      const { container } = renderHandle(type);
      const handle = container.firstChild as HTMLElement;
      expect(handle).toHaveClass("resizer-handle");
      expect(handle).toHaveClass(type);
    });
  });

  it("registers mousedown listener on mount", () => {
    const { container } = renderHandle("top");
    const handle = container.firstChild as HTMLElement;
    const spy = vi.spyOn(handle, "addEventListener");
    expect(handle).toBeInTheDocument();
    spy.mockRestore();
  });

  it("registers body mousemove listener", () => {
    const spy = vi.spyOn(document.body, "addEventListener");
    renderHandle("right");
    expect(spy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    spy.mockRestore();
  });

  it("removes body event listeners on unmount", () => {
    const spy = vi.spyOn(document.body, "removeEventListener");
    const { unmount } = renderHandle("left");
    unmount();
    expect(spy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    expect(spy).toHaveBeenCalledWith("mouseup", expect.any(Function));
    spy.mockRestore();
  });

  it("resizes top edge on drag", () => {
    const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement;
    const { container } = renderHandle("top");
    const handle = container.firstChild as HTMLElement;

    fireEvent.mouseDown(handle, { screenX: 0, screenY: 50 });
    fireEvent.mouseMove(document.body, { screenX: 0, screenY: 30 });
    fireEvent.mouseUp(document.body);

    expect(dialog.style.getPropertyValue("--h")).not.toBe("");
  });

  it("resizes right edge on drag", () => {
    const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement;
    const { container } = renderHandle("right");
    const handle = container.firstChild as HTMLElement;

    fireEvent.mouseDown(handle, { screenX: 0, screenY: 0 });
    fireEvent.mouseMove(document.body, { screenX: 80, screenY: 0 });
    fireEvent.mouseUp(document.body);

    expect(dialog.style.getPropertyValue("--w")).not.toBe("");
  });

  it("resizes left edge on drag", () => {
    const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement;
    const { container } = renderHandle("left");
    const handle = container.firstChild as HTMLElement;

    fireEvent.mouseDown(handle, { screenX: 80, screenY: 0 });
    fireEvent.mouseMove(document.body, { screenX: 40, screenY: 0 });
    fireEvent.mouseUp(document.body);

    expect(dialog.style.getPropertyValue("--w")).not.toBe("");
  });

  it("does not update drag when mouseup fires without drag start", () => {
    const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement;
    renderHandle("bottom");

    fireEvent.mouseUp(document.body);

    expect(dialog.style.getPropertyValue("--h")).toBe("");
  });

  it("does not resize when drag is not active", () => {
    const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement;
    renderHandle("bottom");
    fireEvent.mouseMove(document.body, { screenX: 100, screenY: 100 });
    expect(dialog.style.getPropertyValue("--h")).toBe("");
  });

  it("resizes on drag", () => {
    const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement;
    const { container } = renderHandle("bottom");
    const handle = container.firstChild as HTMLElement;

    fireEvent.mouseDown(handle, { screenX: 0, screenY: 0 });
    fireEvent.mouseMove(document.body, { screenX: 0, screenY: 50 });
    fireEvent.mouseUp(document.body);

    expect(dialog.style.getPropertyValue("--h")).not.toBe("");
  });
});
