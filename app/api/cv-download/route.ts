import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const KV_READY =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

/**
 * POST /api/cv-download — increment the CV-download counter (visible in the
 * Vercel KV dashboard). Fails silently when KV isn't configured so the CV
 * download itself is never affected.
 */
export async function POST() {
  if (!KV_READY) {
    return new NextResponse(null, { status: 204 });
  }
  try {
    const { kv } = await import("@vercel/kv");
    const count = await kv.incr("cv_downloads");
    return NextResponse.json({ ok: true, count });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
