import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Menu, { MenuItem, MenuDivider } from "./index";

function renderMenu(onClose = vi.fn()) {
  return render(
    <Menu orientation="vertical" onClose={onClose}>
      <MenuItem>Programs</MenuItem>
      <MenuItem>Documents</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuDivider />
      <MenuItem>Session</MenuItem>
    </Menu>
  );
}

describe("Menu", () => {
  it("renders a menu element", () => {
    renderMenu();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders all menu items", () => {
    renderMenu();
    expect(screen.getAllByRole("menuitem")).toHaveLength(4);
  });

  it("renders a separator", () => {
    renderMenu();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders item labels", () => {
    renderMenu();
    expect(screen.getByText("Programs")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Session")).toBeInTheDocument();
  });

  it("highlights first item as active by default", () => {
    renderMenu();
    const items = screen.getAllByRole("menuitem");
    expect(items[0]).toHaveClass("is-active");
    expect(items[1]).not.toHaveClass("is-active");
  });

  it("moves active item down on ArrowDown", async () => {
    const user = userEvent.setup();
    renderMenu();
    const menu = screen.getByRole("menu");
    menu.focus();

    await user.keyboard("{ArrowDown}");

    const items = screen.getAllByRole("menuitem");
    expect(items[0]).not.toHaveClass("is-active");
    expect(items[1]).toHaveClass("is-active");
  });

  it("moves active item up on ArrowUp", async () => {
    const user = userEvent.setup();
    renderMenu();
    const menu = screen.getByRole("menu");
    menu.focus();

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowUp}");

    const items = screen.getAllByRole("menuitem");
    expect(items[0]).toHaveClass("is-active");
  });

  it("wraps from last to first on ArrowDown", async () => {
    const user = userEvent.setup();
    renderMenu();
    const menu = screen.getByRole("menu");
    menu.focus();

    // Navigate to last item (index 3 = Session)
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
    await user.keyboard("{ArrowDown}");

    const items = screen.getAllByRole("menuitem");
    expect(items[0]).toHaveClass("is-active");
  });

  it("wraps from first to last on ArrowUp", async () => {
    const user = userEvent.setup();
    renderMenu();
    const menu = screen.getByRole("menu");
    menu.focus();

    await user.keyboard("{ArrowUp}");

    const items = screen.getAllByRole("menuitem");
    expect(items[3]).toHaveClass("is-active");
  });

  it("calls onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderMenu(onClose);
    const menu = screen.getByRole("menu");
    menu.focus();

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("triggers item click on Enter", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Menu orientation="vertical">
        <MenuItem onSelect={onSelect}>Programs</MenuItem>
      </Menu>
    );
    const menu = screen.getByRole("menu");
    menu.focus();

    await user.keyboard("{Enter}");

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("applies is-vertical class for vertical orientation", () => {
    renderMenu();
    expect(screen.getByRole("menu")).toHaveClass("is-vertical");
  });

  it("applies is-horizontal class for horizontal orientation", () => {
    render(
      <Menu orientation="horizontal">
        <MenuItem>Item</MenuItem>
      </Menu>
    );
    expect(screen.getByRole("menu")).toHaveClass("is-horizontal");
  });

  it("moves active item right on ArrowRight for horizontal menu", async () => {
    const user = userEvent.setup();
    render(
      <Menu orientation="horizontal">
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
      </Menu>
    );
    const menu = screen.getByRole("menu");
    menu.focus();

    await user.keyboard("{ArrowRight}");

    const items = screen.getAllByRole("menuitem");
    expect(items[1]).toHaveClass("is-active");
  });

  it("moves active item left on ArrowLeft for horizontal menu", async () => {
    const user = userEvent.setup();
    render(
      <Menu orientation="horizontal">
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
      </Menu>
    );
    const menu = screen.getByRole("menu");
    menu.focus();

    await user.keyboard("{ArrowRight}");
    await user.keyboard("{ArrowLeft}");

    const items = screen.getAllByRole("menuitem");
    expect(items[0]).toHaveClass("is-active");
  });

  it("forwards className to the menu element", () => {
    render(
      <Menu orientation="vertical" className="custom-menu">
        <MenuItem>Item</MenuItem>
      </Menu>
    );
    expect(screen.getByRole("menu")).toHaveClass("custom-menu");
  });

  it("forwards additional HTML attributes", () => {
    render(
      <Menu orientation="vertical" aria-label="Test menu">
        <MenuItem>Item</MenuItem>
      </Menu>
    );
    expect(
      screen.getByRole("menu", { name: "Test menu" })
    ).toBeInTheDocument();
  });

  it("calls onKeyDown when a key is pressed", async () => {
    const user = userEvent.setup();
    const onKeyDown = vi.fn();
    render(
      <Menu orientation="vertical" onKeyDown={onKeyDown}>
        <MenuItem>Item</MenuItem>
      </Menu>
    );
    const menu = screen.getByRole("menu");
    menu.focus();
    await user.keyboard("{ArrowDown}");
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it("calls item onSelect when item is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Menu orientation="vertical">
        <MenuItem onSelect={onSelect}>Programs</MenuItem>
      </Menu>
    );

    await user.click(screen.getByText("Programs"));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("sets active item on mouse hover", async () => {
    const user = userEvent.setup();
    renderMenu();
    const items = screen.getAllByRole("menuitem");
    await user.hover(items[2]);
    expect(items[2]).toHaveClass("is-active");
    expect(items[0]).not.toHaveClass("is-active");
  });

  it("ignores unhandled key presses", async () => {
    const user = userEvent.setup();
    renderMenu();
    const menu = screen.getByRole("menu");
    menu.focus();
    await user.keyboard("x");
    const items = screen.getAllByRole("menuitem");
    expect(items[0]).toHaveClass("is-active");
  });

  it("does not navigate with arrow keys if no items", () => {
    render(<Menu orientation="vertical" />);
    const menu = screen.getByRole("menu");
    menu.focus();
    // Should not throw
    const ev = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      bubbles: true,
    });
    menu.dispatchEvent(ev);
  });
});

describe("MenuItem", () => {
  it("renders as a menuitem", () => {
    render(
      <ul role="menu">
        <MenuItem>Programs</MenuItem>
      </ul>
    );
    expect(screen.getByRole("menuitem")).toBeInTheDocument();
  });

  it("applies is-active class when active", () => {
    render(
      <ul role="menu">
        <MenuItem active>Programs</MenuItem>
      </ul>
    );
    expect(screen.getByRole("menuitem")).toHaveClass("is-active");
  });

  it("does not apply is-active when not active", () => {
    render(
      <ul role="menu">
        <MenuItem>Programs</MenuItem>
      </ul>
    );
    expect(screen.getByRole("menuitem")).not.toHaveClass("is-active");
  });

  it("forwards className", () => {
    render(
      <ul role="menu">
        <MenuItem className="custom">Programs</MenuItem>
      </ul>
    );
    expect(screen.getByRole("menuitem")).toHaveClass("custom");
  });

  it("forwards additional HTML attributes", () => {
    render(
      <ul role="menu">
        <MenuItem aria-label="programs-item">Programs</MenuItem>
      </ul>
    );
    const item = screen.getByRole("menuitem", { name: "programs-item" });
    expect(item).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <ul role="menu">
        <MenuItem onClick={onClick}>Programs</MenuItem>
      </ul>
    );
    await user.click(screen.getByRole("menuitem"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("MenuDivider", () => {
  it("renders a separator", () => {
    render(
      <ul role="menu">
        <MenuDivider />
      </ul>
    );
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(
      <ul role="menu">
        <MenuDivider className="custom-divider" />
      </ul>
    );
    expect(container.querySelector(".custom-divider")).toBeInTheDocument();
  });

  it("applies menu-divider class", () => {
    const { container } = render(
      <ul role="menu">
        <MenuDivider />
      </ul>
    );
    expect(container.querySelector(".menu-divider")).toBeInTheDocument();
  });
});
