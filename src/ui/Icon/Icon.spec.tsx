import { render, screen } from "@testing-library/react";
import Icon from "./Icon";

describe("Icon", () => {
  it("renders an img element", () => {
    const { container } = render(<Icon type="document-0" />);
    expect(container.querySelector("img")).toBeInTheDocument();
  });

  it("sets src from type prop", () => {
    const { container } = render(<Icon type="document-0" />);
    expect(container.querySelector("img"))
      .toHaveAttribute("src", "/icons/document-0.png");
  });

  it("defaults alt to empty string", () => {
    const { container } = render(<Icon type="document-0" />);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("forwards alt prop", () => {
    render(<Icon type="document-0" alt="My document" />);
    expect(screen.getByRole("img", { name: "My document" }))
      .toBeInTheDocument();
  });

  it("applies sm size class", () => {
    const { container } = render(<Icon type="document-0" size="sm" />);
    expect(container.querySelector("img")).toHaveClass("sm");
  });

  it("applies md size class by default", () => {
    const { container } = render(<Icon type="document-0" />);
    expect(container.querySelector("img")).toHaveClass("md");
  });

  it("applies lg size class", () => {
    const { container } = render(<Icon type="document-0" size="lg" />);
    expect(container.querySelector("img")).toHaveClass("lg");
  });

  it("applies icon base class", () => {
    const { container } = render(<Icon type="document-0" />);
    expect(container.querySelector("img")).toHaveClass("icon");
  });

  it("forwards className", () => {
    const { container } = render(
      <Icon type="document-0" className="custom" />
    );
    expect(container.querySelector("img")).toHaveClass("custom");
  });

  it("forwards additional HTML attributes", () => {
    const { container } = render(
      <Icon type="document-0" aria-hidden="true" />
    );
    expect(container.querySelector("img"))
      .toHaveAttribute("aria-hidden", "true");
  });
});
