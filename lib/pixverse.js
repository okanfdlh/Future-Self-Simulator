function getBaseUrl() {
  return process.env.PIXVERSE_API_BASE_URL || "https://app-api.pixverse.ai"
}

function getApiKey() {
  return process.env.PIXVERSE_API_KEY || ""
}

export async function pixverseTextToVideo(payload) {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error("PIXVERSE_API_KEY is not set")

  const url = `${getBaseUrl().replace(/\/$/, "")}/openapi/v2/video/text/generate`
  const traceId = crypto.randomUUID()

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-KEY": apiKey,
      "Ai-trace-id": traceId,
    },
    body: JSON.stringify(payload),
  })

  const json = await res.json().catch(() => null)
  if (!res.ok) throw new Error(`PixVerse HTTP ${res.status}`)
  if (!json || json.ErrCode !== 0) throw new Error(`PixVerse ErrCode ${json?.ErrCode ?? "unknown"}`)

  const videoId = json?.Resp?.video_id
  if (videoId == null) throw new Error("PixVerse missing video_id")
  return { videoId, traceId }
}

export async function pixverseGetVideoResult(videoId) {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error("PIXVERSE_API_KEY is not set")

  const url = `${getBaseUrl().replace(/\/$/, "")}/openapi/v2/video/result/${encodeURIComponent(videoId)}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "API-KEY": apiKey,
    },
  })

  const json = await res.json().catch(() => null)
  if (!res.ok) throw new Error(`PixVerse HTTP ${res.status}`)
  if (!json || json.ErrCode !== 0) throw new Error(`PixVerse ErrCode ${json?.ErrCode ?? "unknown"}`)

  const resp = json.Resp || {}
  return {
    status: resp.status,
    url: resp.url || "",
    raw: resp,
  }
}
