import { NextResponse } from "next/server";
import { pixverseTextToVideo } from "@/lib/pixverse";

export async function POST(req) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.prompt !== "string" || body.prompt.trim().length === 0) {
    return NextResponse.json({ error: "prompt is required" }, { status: 400 });
  }

  const payload = {
    aspect_ratio: body.aspect_ratio || "16:9",
    duration: Number(body.duration ?? 5),
    model: body.model || "v6",
    prompt: body.prompt,
    quality: body.quality || "540p",
    seed: body.seed ?? 0,
    water_mark: Boolean(body.water_mark ?? false)
  };

  try {
    const { videoId, traceId } = await pixverseTextToVideo(payload);
    return NextResponse.json({ videoId, traceId });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "pixverse_error" }, { status: 500 });
  }
}

