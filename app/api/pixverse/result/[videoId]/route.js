import { NextResponse } from "next/server";
import { pixverseGetVideoResult } from "@/lib/pixverse";

export async function GET(_req, { params }) {
  const { videoId } = await params;
  if (!videoId) return NextResponse.json({ error: "videoId is required" }, { status: 400 });

  try {
    const result = await pixverseGetVideoResult(videoId);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e?.message || "pixverse_error" }, { status: 500 });
  }
}

