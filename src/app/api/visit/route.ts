import { recordPageVisit } from "@/lib/turso";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userAgent = req.headers.get("user-agent") || undefined;
    const body = await req.json().catch(() => ({}));
    const path = body.path || "/";

    await recordPageVisit(path, userAgent);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
