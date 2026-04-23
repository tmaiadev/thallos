import { render, screen } from "@testing-library/react";
import Dialog from "./Dialog";
import Provider from "./Provider";

function renderDialog(
  props: Partial<React.HTMLAttributes<HTMLDialogElement>> = {},
  children = "dialog content"
) {
  return render(
    <Provider>
      <Dialog id="test-dialog" {...props}>{children}</Dialog>
    </Provider>
  );
}

describe("Dialog", () => {
  it("renders children", () => {
    renderDialog();
    expect(screen.getByText("dialog content")).toBeInTheDocument();
  });

  it("renders as a dialog element", () => {
    renderDialog();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("sets the id attribute", () => {
    renderDialog();
    expect(screen.getByRole("dialog")).toHaveAttribute("id", "test-dialog");
  });

  it("is open in default state", () => {
    renderDialog();
    expect(screen.getByRole("dialog")).toHaveAttribute("open");
  });

  it("applies window class", () => {
    renderDialog();
    expect(screen.getByRole("dialog")).toHaveClass("window");
  });

  it("applies external className", () => {
    renderDialog({ className: "extra" });
    expect(screen.getByRole("dialog")).toHaveClass("extra");
  });

  it("sets aria-describedby", () => {
    renderDialog();
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-describedby",
      "test-dialog-title"
    );
  });
});
