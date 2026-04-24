import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StartMenu from "./StartMenu";

describe("StartMenu", () => {
  it("renders the Start button", () => {
    render(<StartMenu />);
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  });

  it("menu is not visible initially", () => {
    render(<StartMenu />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the menu when Start button is clicked", async () => {
    const user = userEvent.setup();
    render(<StartMenu />);

    await user.click(screen.getByRole("button", { name: /start/i }));

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("closes the menu when Start button is clicked again", async () => {
    const user = userEvent.setup();
    render(<StartMenu />);

    await user.click(screen.getByRole("button", { name: /start/i }));
    await user.click(screen.getByRole("button", { name: /start/i }));

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("sets aria-expanded=true when menu is open", async () => {
    const user = userEvent.setup();
    render(<StartMenu />);

    await user.click(screen.getByRole("button", { name: /start/i }));

    const btn = screen.getByRole("button", { name: /start/i });
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("sets aria-expanded=false when menu is closed", () => {
    render(<StartMenu />);
    const btn = screen.getByRole("button", { name: /start/i });
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("renders all Start menu items when open", async () => {
    const user = userEvent.setup();
    render(<StartMenu />);

    await user.click(screen.getByRole("button", { name: /start/i }));

    expect(screen.getByText("Programs")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Session")).toBeInTheDocument();
  });

  it("renders a separator between Settings and Session", async () => {
    const user = userEvent.setup();
    render(<StartMenu />);

    await user.click(screen.getByRole("button", { name: /start/i }));

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("focuses the menu when it opens", async () => {
    const user = userEvent.setup();
    render(<StartMenu />);

    await user.click(screen.getByRole("button", { name: /start/i }));

    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByRole("menu"));
    });
  });

  // eslint-disable-next-line max-len
  it("closes the menu and returns focus to Start button on Escape", async () => {
    const user = userEvent.setup();
    render(<StartMenu />);

    await user.click(screen.getByRole("button", { name: /start/i }));
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    await waitFor(() => {
      const startBtn = screen.getByRole("button", { name: /start/i });
      expect(document.activeElement).toBe(startBtn);
    });
  });

  it("closes the menu when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <StartMenu />
        <button>Outside</button>
      </div>
    );

    await user.click(screen.getByRole("button", { name: /start/i }));
    await user.click(screen.getByRole("button", { name: /outside/i }));

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("does not close the menu when clicking inside the popup", async () => {
    const user = userEvent.setup();
    render(<StartMenu />);

    await user.click(screen.getByRole("button", { name: /start/i }));
    await user.click(screen.getByText("Programs"));

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders the sidebar when menu is open", async () => {
    const user = userEvent.setup();
    const { container } = render(<StartMenu />);

    await user.click(screen.getByRole("button", { name: /start/i }));

    expect(container.querySelector(".sidebar")).toBeInTheDocument();
  });

  it("renders popup container", () => {
    const { container } = render(<StartMenu />);
    expect(container.querySelector(".popup")).toBeInTheDocument();
  });

  it("resets active index when menu is reopened", async () => {
    const user = userEvent.setup();
    render(<StartMenu />);

    await user.click(screen.getByRole("button", { name: /start/i }));
    const menu = screen.getByRole("menu");
    menu.focus();
    await user.keyboard("{ArrowDown}{ArrowDown}");

    await user.click(screen.getByRole("button", { name: /start/i }));
    await user.click(screen.getByRole("button", { name: /start/i }));

    const items = screen.getAllByRole("menuitem");
    expect(items[0]).toHaveClass("is-active");
  });
});
