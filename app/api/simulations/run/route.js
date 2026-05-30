import { NextResponse } from "next/server";
import { buildMultipleRuns, buildRun, isCompleteDecisionState } from "@/lib/decisionEngine";
import { buildPrompt } from "@/lib/prompt";
import { normalizeDecisionState, validateDecisionState } from "@/lib/validation";
import { pixverseTextToVideo } from "@/lib/pixverse";

export async function POST(req) {
    const body = await req.json().catch(() => null);
    const state = normalizeDecisionState(body?.state);
    const validation = validateDecisionState(state);
    if (!validation.ok) return NextResponse.json({ error: "invalid_state", details: validation.errors }, { status: 400 });

    const mode = body?.mode === "multiple" ? "multiple" : "single";
    const generateVideo = Boolean(body?.generateVideo ?? false);

    if (!isCompleteDecisionState(state)) {
        return NextResponse.json({ error: "incomplete_state" }, { status: 400 });
    }

    const runs = mode === "multiple" ? buildMultipleRuns({ state, count: 3 }) : [buildRun({ state })];

    if (!generateVideo) return NextResponse.json({ runs });

    try {
        const enriched = [];
        for (const run of runs) {
            const prompt = buildPrompt({ scenarioId: run.scenarioId, state });
            const { videoId, traceId } = await pixverseTextToVideo({
                aspect_ratio: "16:9",
                duration: 5,
                model: "v6",
                prompt,
                quality: "540p",
                seed: run.seed ?? 0,
                water_mark: false
            });
            enriched.push({ ...run, pixverse: { videoId, traceId } });
        }
        return NextResponse.json({ runs: enriched });
    } catch (e) {
        return NextResponse.json({ error: e?.message || "pixverse_error", runs }, { status: 500 });
    }
}

