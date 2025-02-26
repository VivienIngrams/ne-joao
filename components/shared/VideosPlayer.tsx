'use client'

interface VideoPlayerProps {
  videoSrc: string
  videoTitle?: string
  poster?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, poster }) => {
  return (
    <div className="w-full max-w-2xl mx-auto"> {/* Enforcing width */}
    <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] overflow-hidden border-2 md:border-[3px] border-[#2a687d]">
      <video
        src={videoSrc}
        poster={poster}
        className="w-full h-full object-cover"
        controls
      >
        Your browser does not support the video tag.
      </video>
    </div>
    </div>
  )
}


export default VideoPlayer

