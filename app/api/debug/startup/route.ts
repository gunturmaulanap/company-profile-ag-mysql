import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      event?: string;
      ts?: number;
      mode?: string;
      path?: string;
      payload?: Record<string, unknown>;
      ua?: string;
    };

    const compact = {
      event: body?.event ?? "unknown",
      ts: body?.ts ?? Date.now(),
      mode: body?.mode ?? "OFF",
      path: body?.path ?? "",
      ua: body?.ua ?? "",
      payload: body?.payload ?? {},
    };

    // Keep this lightweight for crash telemetry; no heavy processing.
    console.info("[StartupBeacon]", JSON.stringify(compact));
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
