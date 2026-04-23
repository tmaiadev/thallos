import { render, screen, fireEvent } from "@testing-library/react";
import WindowControls from "./WindowControls";
import Provider from "./Provider";

function renderControls() {
  return render(
    <Provider>
      <WindowControls />
    </Provider>
  );
}

describe("WindowControls", () => {
  it("renders the controls group", () => {
    renderControls();
    expect(screen.getByRole("group", { name: "Window Controls" })).toBeInTheDocument();
  });

  it("renders Minimize button", () => {
    renderControls();
    expect(screen.getByRole("button", { name: "Minimize" })).toBeInTheDocument();
  });

  it("renders Maximize button in default state", () => {
    renderControls();
    expect(screen.getByRole("button", { name: "Maximize" })).toBeInTheDocument();
  });

  it("renders Close button", () => {
    renderControls();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("clicking Maximize shows Restore button", () => {
    renderControls();
    fireEvent.click(screen.getByRole("button", { name: "Maximize" }));
    expect(screen.getByRole("button", { name: "Restore" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Maximize" })).not.toBeInTheDocument();
  });

  it("clicking Restore shows Maximize button", () => {
    renderControls();
    fireEvent.click(screen.getByRole("button", { name: "Maximize" }));
    fireEvent.click(screen.getByRole("button", { name: "Restore" }));
    expect(screen.getByRole("button", { name: "Maximize" })).toBeInTheDocument();
  });

  it("clicking Minimize hides the dialog", () => {
    render(
      <Provider>
        <dialog id="test" open>
          <WindowControls />
        </dialog>
      </Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Minimize" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("applies button size class", () => {
    const { container } = renderControls();
    const buttons = container.querySelectorAll("button");
    buttons.forEach(btn => {
      expect(btn).toHaveClass("button");
    });
  });
});
