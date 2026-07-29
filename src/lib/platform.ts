export function isAndroidPlatform(
  userAgent: string,
  userAgentDataPlatform?: string,
) {
  return (
    userAgentDataPlatform?.toLowerCase() === "android" ||
    /\bandroid\b/i.test(userAgent)
  );
}
