import {
  createMobileAdminToken,
  MOBILE_SESSION_SECONDS,
} from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { verifyAdminPassword } from "@/lib/turso";
import { mobileLoginSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Nieprawidłowe dane logowania." },
      { status: 400 },
    );
  }

  const validation = mobileLoginSchema.safeParse(body);
  if (!validation.success) {
    return Response.json(
      { success: false, error: "Wprowadź hasło administratora." },
      { status: 400 },
    );
  }

  const rateLimit = await checkRateLimit({
    namespace: "android-login",
    identifier: getClientIp(request.headers),
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return Response.json(
      {
        success: false,
        error: "Zbyt wiele prób. Spróbuj ponownie później.",
      },
      { status: 429 },
    );
  }

  if (!(await verifyAdminPassword(validation.data.password))) {
    return Response.json(
      { success: false, error: "Nieprawidłowe hasło administratora." },
      { status: 401 },
    );
  }

  const token = await createMobileAdminToken();
  return Response.json(
    {
      success: true,
      token,
      expiresIn: MOBILE_SESSION_SECONDS,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
