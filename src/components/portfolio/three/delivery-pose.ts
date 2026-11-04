export function smoothRange(value: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

/** Bounded, reversible poses: the same scroll position always produces the same frame. */
export function deliveryPose(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const spread = smoothRange(p, 0.3, 0.48) * (1 - smoothRange(p, 0.68, 0.88));
  return { spread, reveal: smoothRange(p, 0.08, 0.27), phone: smoothRange(p, 0.78, 0.98), turn: Math.sin(p * Math.PI) * 0.12 };
}
