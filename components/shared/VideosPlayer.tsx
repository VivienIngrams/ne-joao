'use client'

import React, { useRef } from 'react'

interface VideoPlayerProps {
  videoSrc: string
  videoTitle?: string
  poster?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  videoTitle,
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-tl-md rounded-br-md border-2 border-red-600">
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        className="absolute object-cover w-full h-full"
        controls
      >
        Your browser does not support the video tag.
      </video>
     
    </div>
  )
}

export default VideoPlayer
