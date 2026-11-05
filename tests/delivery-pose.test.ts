import { describe, expect, it } from "vitest";
import { deliveryPose } from "@/components/portfolio/three/delivery-pose";
describe("delivery composition", () => {
  it("assembles the product and phone without residual offsets", () => {
    expect(deliveryPose(1)).toMatchObject({ spread: 0, reveal: 1, phone: 1 });
    expect(deliveryPose(0)).toMatchObject({ spread: 0, reveal: 0, phone: 0 });
  });
  it("keeps modules out of the goal and design stages", () => {
    for (let p = 0; p < 0.5; p += 0.01) expect(deliveryPose(p).spread).toBe(0);
    expect(deliveryPose(0.76).spread).toBe(0);
  });
  it("is bounded, reversible and finite for every scroll position", () => {
    for (let p = -0.1; p <= 1.1; p += 0.01) {
      const pose = deliveryPose(p);
      expect(pose).toEqual(deliveryPose(p));
      Object.values(pose).forEach(value => { expect(value).toBeGreaterThanOrEqual(0); expect(value).toBeLessThanOrEqual(1); });
    }
    expect(deliveryPose(0.55).spread).toBe(1);
  });
});
