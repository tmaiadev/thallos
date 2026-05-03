import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("returns an empty string when called with no arguments", () => {
    expect(cn()).toBe("");
  });

  it("returns a single class name", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("joins multiple class names with a space", () => {
    expect(cn("foo", "bar", "baz")).toBe("foo bar baz");
  });

  it("filters out null", () => {
    expect(cn("foo", null, "bar")).toBe("foo bar");
  });

  it("filters out undefined", () => {
    expect(cn("foo", undefined, "bar")).toBe("foo bar");
  });

  it("filters out empty strings", () => {
    expect(cn("foo", "", "bar")).toBe("foo bar");
  });

  it("filters out 0", () => {
    expect(cn("foo", 0, "bar")).toBe("foo bar");
  });

  it("includes truthy numbers", () => {
    expect(cn("foo", 1, "bar")).toBe("foo 1 bar");
  });

  it("handles mixed valid and falsy values", () => {
    expect(cn("a", null, "b", undefined, "", "c", 0)).toBe("a b c");
  });
});
