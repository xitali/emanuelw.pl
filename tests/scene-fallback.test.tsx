// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
vi.mock("@react-three/fiber", () => ({ Canvas: () => { throw new Error("WebGL unavailable"); }, useFrame: vi.fn(), useThree: vi.fn() }));
import ExplodedScene from "@/components/portfolio/three/ExplodedScene";
import { createSceneState } from "@/components/portfolio/three/layers";
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
it("shows the complete static product when WebGL creation fails", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  render(<ExplodedScene state={createSceneState()} active compact={false} reduced={false} />);
  expect(screen.getByText(/Twoja oferta/)).toBeTruthy();
  expect(document.querySelector("canvas")).toBeNull();
});
