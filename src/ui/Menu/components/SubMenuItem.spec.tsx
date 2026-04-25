import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubMenuItem from "./SubMenuItem";
import MenuItem from "./MenuItem";

function renderSubMenuItem(props = {}) {
  return render(
    <ul role="menu">
      <SubMenuItem label="Settings" {...props}>
        <MenuItem>Account</MenuItem>
        <MenuItem>Appearance</MenuItem>
      </SubMenuItem>
    </ul>
  );
}

describe("SubMenuItem", () => {
  it("renders as a menuitem", () => {
    renderSubMenuItem();
    expect(screen.getByRole("menuitem")).toBeInTheDocument();
  });

  it("renders the label", () => {
    renderSubMenuItem();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders the submenu arrow indicator", () => {
    const { container } = renderSubMenuItem();
    expect(container.querySelector(".arrow")).toHaveTextContent("▶");
  });

  it("arrow indicator is aria-hidden", () => {
    const { container } = renderSubMenuItem();
    expect(container.querySelector(".arrow")).toHaveAttribute("aria-hidden", "true");
  });

  it("has aria-haspopup=menu", () => {
    renderSubMenuItem();
    expect(screen.getByRole("menuitem")).toHaveAttribute("aria-haspopup", "menu");
  });

  it("has aria-expanded=false when closed", () => {
    renderSubMenuItem();
    expect(screen.getByRole("menuitem")).toHaveAttribute("aria-expanded", "false");
  });

  it("does not render submenu when closed", () => {
    renderSubMenuItem();
    expect(screen.queryByRole("menu", { name: /settings/i })).not.toBeInTheDocument();
    expect(screen.queryByText("Account")).not.toBeInTheDocument();
  });

  it("applies is-active class when active", () => {
    renderSubMenuItem({ active: true });
    expect(screen.getByRole("menuitem")).toHaveClass("is-active");
  });

  it("does not apply is-active when not active", () => {
    renderSubMenuItem();
    expect(screen.getByRole("menuitem")).not.toHaveClass("is-active");
  });

  it("renders icon when icon prop is provided", () => {
    const { container } = renderSubMenuItem({ icon: "appwizard-0" });
    expect(container.querySelector("img")).toBeInTheDocument();
  });

  it("does not render icon when icon prop is absent", () => {
    const { container } = renderSubMenuItem();
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("has __isMenuItem marker", () => {
    expect((SubMenuItem as unknown as Record<string, unknown>).__isMenuItem).toBe(true);
  });

  it("forwards className", () => {
    renderSubMenuItem({ className: "custom" });
    expect(screen.getByRole("menuitem")).toHaveClass("custom");
  });

  it("opens submenu on mouse enter", async () => {
    const user = userEvent.setup();
    renderSubMenuItem();
    const item = screen.getByRole("menuitem");
    await user.hover(item);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Appearance")).toBeInTheDocument();
  });

  it("closes submenu on mouse leave", async () => {
    const user = userEvent.setup();
    renderSubMenuItem();
    const item = screen.getByRole("menuitem");
    await user.hover(item);
    await user.unhover(item);
    expect(screen.queryByText("Account")).not.toBeInTheDocument();
  });

  it("opens submenu on ArrowRight", async () => {
    const user = userEvent.setup();
    renderSubMenuItem();
    screen.getByRole("menuitem").focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("Account")).toBeInTheDocument();
  });

  it("sets aria-expanded=true when submenu is open", async () => {
    const user = userEvent.setup();
    renderSubMenuItem();
    const item = screen.getByRole("menuitem");
    await user.hover(item);
    expect(item).toHaveAttribute("aria-expanded", "true");
  });

  it("closes submenu when active prop becomes false", async () => {
    const user = userEvent.setup();
    const { rerender } = renderSubMenuItem({ active: true });
    const item = screen.getByRole("menuitem");
    await user.hover(item);
    expect(screen.getByText("Account")).toBeInTheDocument();

    rerender(
      <ul role="menu">
        <SubMenuItem label="Settings" active={false}>
          <MenuItem>Account</MenuItem>
          <MenuItem>Appearance</MenuItem>
        </SubMenuItem>
      </ul>
    );
    expect(screen.queryByText("Account")).not.toBeInTheDocument();
  });

  it("calls injected onMouseEnter when hovering", async () => {
    const user = userEvent.setup();
    const onMouseEnter = vi.fn();
    renderSubMenuItem({ onMouseEnter });
    await user.hover(screen.getByRole("menuitem"));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it("closes submenu and returns focus on ArrowLeft inside submenu", async () => {
    const user = userEvent.setup();
    renderSubMenuItem();
    const trigger = screen.getByRole("menuitem");
    trigger.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("Account")).toBeInTheDocument();

    await user.keyboard("{ArrowLeft}");
    expect(screen.queryByText("Account")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("closes submenu and returns focus on Escape inside submenu", async () => {
    const user = userEvent.setup();
    renderSubMenuItem();
    const trigger = screen.getByRole("menuitem");
    trigger.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("Account")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Account")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("does not propagate Escape to parent when submenu is open", async () => {
    const user = userEvent.setup();
    const onParentKeyDown = vi.fn();
    render(
      <ul role="menu" onKeyDown={onParentKeyDown}>
        <SubMenuItem label="Settings">
          <MenuItem>Account</MenuItem>
        </SubMenuItem>
      </ul>
    );
    const trigger = screen.getByRole("menuitem", { name: /settings/i });
    trigger.focus();
    await user.keyboard("{ArrowRight}");
    await user.keyboard("{Escape}");

    const escapeCalls = onParentKeyDown.mock.calls.filter(
      ([e]) => e.key === "Escape"
    );
    expect(escapeCalls).toHaveLength(0);
  });
});
