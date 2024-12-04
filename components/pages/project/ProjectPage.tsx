import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import VideoPlayer from '@/components/shared/VideosPlayer'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import type { ProjectPayload } from '@/types'

export interface ProjectPageProps {
  data: ProjectPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}
export function ProjectPage({ data, encodeDataAttribute }: ProjectPageProps) {
  const {
    title,
    description,
    duration,
    overview,
    coverImage,
    client,
    site,
    tags,
  } = data ?? {}

  const startYear = duration?.start
    ? new Date(duration.start).getFullYear()
    : undefined
  const endYear = duration?.end ? new Date(duration.end).getFullYear() : 'Now'

  // Define the type for video items
  interface Video {
    src: string
    poster: string
    title: string
  }

  // Initialize videos array with the correct type
  const videos: Video[] = []

  if (title === 'Laboratório') {
    videos.push(
      {
        src: '/1.mov',
        poster: '/1.jpg',
        title: 'Laboratório Video 1',
      },
      {
        src: '/2.mpg',
        poster: '/2.png',
        title: 'Laboratório Video 2',
      },
    )
  } else if (title === 'LabIO Performance') {
    videos.push(
      {
        src: '/LabIO.mp4',
        poster: '/LabIO.png',
        title: 'LabIO Performance Video 1',
      },
      {
        src: '/LabIO2.mp4',
        poster: '/LabIO2.png',
        title: 'LabIO Performance Video 2',
      },
    )
  }

  return (
    <div>
      <div className="mt-12 md:mt-0 py-4 md:mx-24 space-y-5">
        {/* Header with duration */}
        <Header
          title={title}
          description={overview}
          startYear={startYear}
          endYear={endYear}
        />

        {/* Description */}
        {description && (
          <CustomPortableText
            paragraphClasses="font-barlow leading-[1.2] md:leading-[1.1] text-justify text-base md:text-lg  text-gray-700"
            value={description}
          />
        )}
      </div>

      {/* Videos Section */}
      {videos.length > 0 && (
        <div className="py-12 md:mx-24 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {videos.map((video, index) => (
              <div key={index} className="video-item">
                <h2 className="text-center text-2xl font-arsenal text-gray-500 mb-4">
                  {video.title}
                </h2>
                <VideoPlayer
                  videoSrc={video.src}
                  videoTitle={video.title}
                  poster={video.poster}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectPage
