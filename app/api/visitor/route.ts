import { NextResponse } from "next/server";

// Always run on the server at request time (counter must not be cached).
export const dynamic = "force-dynamic";

// KV is only available when these env vars are set (Vercel KV / Upstash).
const KV_READY =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

/**
 * GET /api/visitor — increment and return the visit counter.
 * Fails silently (404) when KV isn't configured, so the footer simply hides
 * the counter instead of erroring.
 */
export async function GET() {
  if (!KV_READY) {
    return NextResponse.json({ error: "kv not configured" }, { status: 404 });
  }
  try {
    const { kv } = await import("@vercel/kv");
    const count = await kv.incr("visitor_count");
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "kv error" }, { status: 404 });
  }
}
