"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"

export function VideoPlayer({ videoId, filename, className = "" }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Endpoint logic based on input
  const src = useMemo(() => {
    return videoId
      ? `/api/pixverse/result/${videoId}`
      : filename
        ? `/api/pixverse/result/${filename}`
        : null
  }, [videoId, filename])

  const sourceError = !src ? "No video source provided" : null

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const finalError = error || sourceError

  if (!src)
    return (
      <div
        className={`relative group overflow-hidden rounded-xl bg-zinc-900 aspect-video flex items-center justify-center text-zinc-400 p-4 text-center ${className}`}
      >
        <p>{sourceError}</p>
      </div>
    )

  return (
    <div
      className={`relative group overflow-hidden rounded-xl bg-zinc-900 aspect-video ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-zinc-900/50">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      )}

      {finalError && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-zinc-900 text-zinc-400 p-4 text-center">
          <p>{finalError}</p>
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setError("Failed to load video. Please try again later.")
          setIsLoading(false)
        }}
        playsInline
      />

      {/* Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="hover:text-zinc-300 transition-colors">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={handleRestart} className="hover:text-zinc-300 transition-colors">
              <RotateCcw size={20} />
            </button>
          </div>
          <button onClick={toggleMute} className="hover:text-zinc-300 transition-colors">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  )
}
