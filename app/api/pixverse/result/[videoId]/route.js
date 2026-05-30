import { NextResponse } from "next/server"
import { pixverseGetVideoResult } from "@/lib/pixverse"
import path from "node:path"
import fs from "node:fs"
import { Readable } from "node:stream"

export const runtime = "nodejs"

function isNumericId(value) {
  return typeof value === "string" && /^[0-9]+$/.test(value)
}

function contentTypeForFilename(filename) {
  const ext = path.extname(filename).toLowerCase()
  if (ext === ".mp4") return "video/mp4"
  if (ext === ".webm") return "video/webm"
  if (ext === ".mov") return "video/quicktime"
  return ""
}

function findFileRecursive(rootDir, filename, maxDepth = 6) {
  const safeName = path.basename(filename)
  if (safeName !== filename) return null

  const contentType = contentTypeForFilename(safeName)
  if (!contentType) return null

  const queue = [{ dir: rootDir, depth: 0 }]
  while (queue.length > 0) {
    const { dir, depth } = queue.shift()
    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      continue
    }

    for (const entry of entries) {
      if (entry.isFile() && entry.name === safeName) return path.join(dir, entry.name)
    }

    if (depth >= maxDepth) continue
    for (const entry of entries) {
      if (entry.isDirectory()) queue.push({ dir: path.join(dir, entry.name), depth: depth + 1 })
    }
  }

  return null
}

function parseRange(rangeHeader, size) {
  if (!rangeHeader) return null
  const match = /^bytes=(\d*)-(\d*)$/i.exec(rangeHeader.trim())
  if (!match) return null
  const startRaw = match[1]
  const endRaw = match[2]
  const start = startRaw === "" ? null : Number(startRaw)
  const end = endRaw === "" ? null : Number(endRaw)
  if ((start != null && Number.isNaN(start)) || (end != null && Number.isNaN(end))) return null

  let resolvedStart = start ?? Math.max(size - (end ?? 0), 0)
  let resolvedEnd = end ?? size - 1

  if (resolvedStart < 0) resolvedStart = 0
  if (resolvedEnd >= size) resolvedEnd = size - 1
  if (resolvedStart > resolvedEnd) return null

  return { start: resolvedStart, end: resolvedEnd }
}

export async function GET(req, { params }) {
  const resolvedParams = typeof params?.then === "function" ? await params : params
  const videoId = resolvedParams?.videoId
  if (!videoId) return NextResponse.json({ error: "videoId is required" }, { status: 400 })

  if (isNumericId(videoId)) {
    try {
      const result = await pixverseGetVideoResult(videoId)
      return NextResponse.json(result)
    } catch (e) {
      return NextResponse.json({ error: e?.message || "pixverse_error" }, { status: 500 })
    }
  }

  const rootDir = path.join(/*turbopackIgnore: true*/ process.cwd(), "pixverse-output")
  const filePath = findFileRecursive(rootDir, videoId)
  if (!filePath) return NextResponse.json({ error: "video_not_found" }, { status: 404 })

  let stat
  try {
    stat = fs.statSync(filePath)
  } catch {
    return NextResponse.json({ error: "video_not_found" }, { status: 404 })
  }

  const contentType = contentTypeForFilename(filePath)
  const range = parseRange(req.headers.get("range"), stat.size)
  if (range) {
    const stream = Readable.toWeb(fs.createReadStream(filePath, range))
    return new Response(stream, {
      status: 206,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(range.end - range.start + 1),
        "Content-Range": `bytes ${range.start}-${range.end}/${stat.size}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-store",
      },
    })
  }

  const stream = Readable.toWeb(fs.createReadStream(filePath))
  return new Response(stream, {
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(stat.size),
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-store",
    },
  })
}
