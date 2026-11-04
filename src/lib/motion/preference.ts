"use client";
import { useSyncExternalStore } from "react";

const eventName = "portfolio:motion-preference";
const subscribe = (callback: () => void) => {
  window.addEventListener(eventName, callback);
  return () => window.removeEventListener(eventName, callback);
};
const getSnapshot = () => document.documentElement.classList.contains("motion-paused");

export function setMotionPaused(paused: boolean) {
  document.documentElement.classList.toggle("motion-paused", paused);
  window.dispatchEvent(new Event(eventName));
}

export function useMotionPaused() {
  return [useSyncExternalStore(subscribe, getSnapshot, () => false), setMotionPaused] as const;
}
