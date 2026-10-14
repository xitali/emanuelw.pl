import { describe, expect, it } from "vitest";
import { unstable_getResponseFromNextConfig } from "next/experimental/testing/server";
import nextConfig from "../next.config";

describe("camera domain redirect", () => {
  it.each(["/", "/podglad"])("sends camera visitors from %s to the existing gateway", async (path) => {
    const response = await unstable_getResponseFromNextConfig({
      url: `https://kamera.emanuelwloch.pl${path}`,
      nextConfig,
    });
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://kamera-brama.tailcc6301.ts.net/");
  });

  it.each(["emanuelwloch.pl", "www.emanuelwloch.pl", "emanuelw-pl.vercel.app", "kameraXemanuelwlochXpl", "kamera.emanuelwloch.pl.example.com"])("keeps %s outside the camera redirect", async (host) => {
    const response = await unstable_getResponseFromNextConfig({
      url: `https://${host}/`,
      nextConfig,
    });
    expect(response.headers.get("location")).toBeNull();
  });
});
