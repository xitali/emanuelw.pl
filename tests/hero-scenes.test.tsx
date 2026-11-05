// @vitest-environment jsdom
import React from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
const { timeline } = vi.hoisted(() => ({ timeline: vi.fn(() => vi.fn()) }));
vi.mock("@/components/portfolio/three/ScrollTimeline", () => ({ createScrollTimeline: timeline }));
vi.mock("next/dynamic", () => ({ default: () => () => <div data-testid="device-renderer" /> }));
import ProductStory from "@/components/portfolio/ProductStory";

beforeEach(() => {
  timeline.mockClear();
  vi.stubGlobal("matchMedia", (query:string) => ({ matches:query.includes("max-width"), addEventListener:vi.fn(), removeEventListener:vi.fn() }));
  vi.stubGlobal("IntersectionObserver", class { observe(){} disconnect(){} unobserve(){} });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); document.documentElement.classList.remove("motion-paused"); });

it("lets a mobile visitor select four distinct scenes without an automatic scroll timeline", async () => {
  render(<ProductStory />);
  await waitFor(() => expect(document.querySelector('.scene-goal')?.getAttribute('data-current')).toBe('true'));
  fireEvent.click(screen.getByRole('button',{name:'Pokaż etap: Projekt'}));
  expect(document.querySelector('.scene-design')?.getAttribute('data-current')).toBe('true');
  expect(document.querySelectorAll('.creative-person')).toHaveLength(3);
  fireEvent.click(screen.getByRole('button',{name:'Pokaż etap: Realizacja'}));
  expect(document.querySelector('.scene-build')?.getAttribute('data-current')).toBe('true');
  expect(document.querySelector('.fallback-tablet')).toBeTruthy();
  expect(document.querySelector('.fallback-phone')).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'Pokaż etap: Wdrożenie'}));
  expect(document.querySelector('.scene-launch')?.getAttribute('data-current')).toBe('true');
  expect(document.querySelectorAll('.hero-stage-scene[data-current=true]')).toHaveLength(1);
  expect(timeline).not.toHaveBeenCalled();
});

it("keeps every scene selectable when motion is paused", async () => {
  document.documentElement.classList.add('motion-paused');
  render(<ProductStory />);
  await waitFor(() => expect(document.querySelector('.scene-launch')?.getAttribute('data-current')).toBe('true'));
  fireEvent.click(screen.getByRole('button',{name:'Pokaż etap: Cel'}));
  expect(document.querySelector('.scene-goal')?.getAttribute('data-current')).toBe('true');
  expect(document.querySelector('.hero-stage-scenes')?.getAttribute('data-running')).toBe('false');
  fireEvent.click(screen.getByRole('button',{name:'Pokaż etap: Realizacja'}));
  expect(document.querySelector('.scene-build')?.getAttribute('data-current')).toBe('true');
  expect(screen.queryByTestId('device-renderer')).toBeNull();
  expect(timeline).not.toHaveBeenCalled();
});
