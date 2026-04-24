import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Popup, { usePopup } from "./index";

const position = "bottom span-right" as const;

function SimplePopup() {
  return (
    <Popup position={position}>
      <Popup.Trigger>
        <button>Toggle</button>
      </Popup.Trigger>
      <Popup.Content>
        <div>Popup Content</div>
      </Popup.Content>
    </Popup>
  );
}

describe("Popup", () => {
  it("renders the trigger child", () => {
    render(<SimplePopup />);
    expect(
      screen.getByRole("button", { name: "Toggle" })
    ).toBeInTheDocument();
  });

  it("hides content initially", () => {
    render(<SimplePopup />);
    expect(
      screen.queryByText("Popup Content")
    ).not.toBeInTheDocument();
  });

  it("shows content on trigger click", async () => {
    const user = userEvent.setup();
    render(<SimplePopup />);
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByText("Popup Content")).toBeInTheDocument();
  });

  it("hides content on second trigger click", async () => {
    const user = userEvent.setup();
    render(<SimplePopup />);
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(
      screen.queryByText("Popup Content")
    ).not.toBeInTheDocument();
  });

  it("sets aria-expanded to false initially", () => {
    render(<SimplePopup />);
    expect(
      screen.getByRole("button", { name: "Toggle" })
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("sets aria-expanded to true when open", async () => {
    const user = userEvent.setup();
    render(<SimplePopup />);
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(
      screen.getByRole("button", { name: "Toggle" })
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("closes on outside pointer down", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <SimplePopup />
        <button>Outside</button>
      </div>
    );
    await user.click(
      screen.getByRole("button", { name: "Toggle" })
    );
    await user.click(
      screen.getByRole("button", { name: "Outside" })
    );
    expect(
      screen.queryByText("Popup Content")
    ).not.toBeInTheDocument();
  });

  it("stays open when clicking inside", async () => {
    const user = userEvent.setup();
    render(<SimplePopup />);
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    await user.click(screen.getByText("Popup Content"));
    expect(screen.getByText("Popup Content")).toBeInTheDocument();
  });

  it("preserves existing onClick on trigger child", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Popup position={position}>
        <Popup.Trigger>
          <button onClick={onClick}>Toggle</button>
        </Popup.Trigger>
        <Popup.Content>
          <div>Content</div>
        </Popup.Content>
      </Popup>
    );
    await user.click(
      screen.getByRole("button", { name: "Toggle" })
    );
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("sets data-position attribute on content wrapper", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Popup position="top span-right">
        <Popup.Trigger>
          <button>Toggle</button>
        </Popup.Trigger>
        <Popup.Content>
          <div>Content</div>
        </Popup.Content>
      </Popup>
    );
    await user.click(
      screen.getByRole("button", { name: "Toggle" })
    );
    expect(container.querySelector("[data-position]"))
      .toHaveAttribute("data-position", "top span-right");
  });

  it("focuses trigger after close via usePopup", async () => {
    const user = userEvent.setup();
    function CloseButton() {
      const { close } = usePopup();
      return <button onClick={close}>Close</button>;
    }
    render(
      <Popup position={position}>
        <Popup.Trigger>
          <button>Toggle</button>
        </Popup.Trigger>
        <Popup.Content>
          <CloseButton />
        </Popup.Content>
      </Popup>
    );
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(document.activeElement).toBe(
        screen.getByRole("button", { name: "Toggle" })
      );
    });
  });

  it("opens via usePopup open function", async () => {
    const user = userEvent.setup();
    function OpenButton() {
      const { open } = usePopup();
      return <button onClick={open}>Open</button>;
    }
    render(
      <Popup position={position}>
        <OpenButton />
        <Popup.Content>
          <div>Content</div>
        </Popup.Content>
      </Popup>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("throws when usePopup is used outside Popup", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    function TestComponent() {
      usePopup();
      return null;
    }
    expect(() => render(<TestComponent />)).toThrow(
      "usePopup must be used inside <Popup>"
    );
    spy.mockRestore();
  });
});
