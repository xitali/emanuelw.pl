// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useMotionPaused } from "../src/lib/motion/preference";

function Control() {
  const [paused, setPaused] = useMotionPaused();
  return <button aria-pressed={paused} onClick={() => setPaused(!paused)}>Ruch</button>;
}
afterEach(() => { cleanup(); document.documentElement.classList.remove("motion-paused"); });
it("synchronizuje ograniczenie ruchu między kontrolkami i zachowuje je po ponownym montażu", () => {
  const view = render(<><Control /><Control /></>);
  fireEvent.click(screen.getAllByRole("button")[0]);
  expect(screen.getAllByRole("button").every(button => button.getAttribute("aria-pressed") === "true")).toBe(true);
  expect(document.documentElement.classList.contains("motion-paused")).toBe(true);
  view.unmount();
  render(<Control />);
  expect(screen.getByRole("button").getAttribute("aria-pressed")).toBe("true");
  fireEvent.click(screen.getByRole("button"));
  expect(document.documentElement.classList.contains("motion-paused")).toBe(false);
});
