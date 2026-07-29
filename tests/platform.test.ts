import { describe, expect, it } from "vitest";
import { isAndroidPlatform } from "../src/lib/platform";

describe("wykrywanie platformy panelu administratora", () => {
  it("rozpoznaje Androida na podstawie user agenta", () => {
    expect(
      isAndroidPlatform(
        "Mozilla/5.0 (Linux; Android 15; Pixel 8 Pro) AppleWebKit/537.36 Chrome/138 Mobile Safari/537.36",
      ),
    ).toBe(true);
  });

  it("rozpoznaje Androida na podstawie Client Hints", () => {
    expect(isAndroidPlatform("Mozilla/5.0", "Android")).toBe(true);
  });

  it.each([
    ["Windows", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "Windows"],
    ["iPhone", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X)", "iOS"],
    ["iPad", "Mozilla/5.0 (iPad; CPU OS 18_5 like Mac OS X)", "iOS"],
    ["macOS", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", "macOS"],
  ])("ukrywa baner na platformie %s", (_, userAgent, platform) => {
    expect(isAndroidPlatform(userAgent, platform)).toBe(false);
  });
});
