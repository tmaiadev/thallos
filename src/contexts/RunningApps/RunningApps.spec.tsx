import { render, screen, fireEvent } from "@testing-library/react";
import { RunningAppsProvider, useRunningApps } from "./index";

function Inspector() {
  const { instances, launch, close } = useRunningApps();
  return (
    <div>
      <span data-testid="count">{instances.length}</span>
      {instances.map(i => (
        <span key={i.id} data-testid={`instance-${i.appId}`}>
          {i.id}:{i.offsetIndex}
        </span>
      ))}
      <button onClick={() => launch("appearance")}>Launch</button>
      {instances[0] && (
        <button onClick={() => close(instances[0].id)}>Close First</button>
      )}
    </div>
  );
}

function renderInspector() {
  return render(
    <RunningAppsProvider>
      <Inspector />
    </RunningAppsProvider>
  );
}

describe("RunningAppsContext", () => {
  it("starts with no instances", () => {
    renderInspector();
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("launch adds an instance", () => {
    renderInspector();
    fireEvent.click(screen.getByRole("button", { name: "Launch" }));
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  it("launched instance has correct appId", () => {
    renderInspector();
    fireEvent.click(screen.getByRole("button", { name: "Launch" }));
    expect(screen.getByTestId("instance-appearance")).toBeInTheDocument();
  });

  it("first instance has offsetIndex 0", () => {
    renderInspector();
    fireEvent.click(screen.getByRole("button", { name: "Launch" }));
    const text = screen.getByTestId("instance-appearance").textContent ?? "";
    expect(text).toMatch(/:0$/);
  });

  it("second instance has offsetIndex 1", () => {
    renderInspector();
    fireEvent.click(screen.getByRole("button", { name: "Launch" }));
    fireEvent.click(screen.getByRole("button", { name: "Launch" }));
    const instances = screen.getAllByTestId("instance-appearance");
    expect(instances[1].textContent).toMatch(/:1$/);
  });

  it("close removes the instance", () => {
    renderInspector();
    fireEvent.click(screen.getByRole("button", { name: "Launch" }));
    fireEvent.click(screen.getByRole("button", { name: "Close First" }));
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("close only removes the targeted instance", () => {
    renderInspector();
    fireEvent.click(screen.getByRole("button", { name: "Launch" }));
    fireEvent.click(screen.getByRole("button", { name: "Launch" }));
    fireEvent.click(screen.getByRole("button", { name: "Close First" }));
    expect(screen.getByTestId("count").textContent).toBe("1");
  });
});
