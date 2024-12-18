'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { useLanguage } from '@/app/contexts/LanguageContext'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import VideoPlayer from '@/components/shared/VideosPlayer'
import type { ProjectPayload } from '@/types'

export interface ProjectPageProps {
  data: ProjectPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}
export function ProjectPage({ data, encodeDataAttribute }: ProjectPageProps) {
  const {
    title,
    title_pt,
    description,
    description_pt,
    duration,
    overview,
    overview_pt,
    coverImage,
    client,
    site,
    tags,
  } = data ?? {}

  const startYear = duration?.start
    ? new Date(duration.start).getFullYear()
    : undefined
  const endYear = duration?.end ? new Date(duration.end).getFullYear() : 'Now'
  
    const { language } = useLanguage();
          const overviewText = language === 'en' ? data?.overview : data?.overview_pt;
          const titleText = language === 'en' ? data?.title : data?.title_pt;
          const descriptionText = language === 'en' ? data?.description : data?.description_pt;
   
  
  // Define the type for video items
  interface Video {
    src: string
    poster: string
    title: string
    title_pt: string
  }

  // Define videos array
  const videos = (() => {
    if (title === 'Laboratório') {
      return [
        {
          src: '/1.mov',
          poster: '/1.jpg',
          title: language === 'en' ? 'Laboratory Video 1' : 'Laboratório Vídeo 1',
        },
        {
          src: '/2.mp4',
          poster: '/2.png',
          title: language === 'en' ? 'Laboratory Video 2' : 'Laboratório Vídeo 2',
        },
        {
          src: '/3.mp4',
          poster: '/3.png',
          title: language === 'en' ? 'Laboratory Interview' : 'Entrevista Laboratório',
        },
      ]
    } else if (title === 'LabIO Performance') {
      return [
        {
          src: '/LabIO.mp4',
          poster: '/LabIO.png',
          title: language === 'en' ? 'LabIO Performance Video 1' : 'LabIO Performance Vídeo 1',
        },
        {
          src: '/LabIO2.mp4',
          poster: '/LabIO2.png',
          title: language === 'en' ? 'LabIO Performance Video 2' : 'LabIO Performance Vídeo 2',
        },
      ]
    }
    return []
  })()

  return (
    <div>
      <div className="mt-12 md:mt-0 py-4 md:mx-24 space-y-4">
        {/* Header with duration */}
        <Header
          title={titleText}
          description={overviewText}
          startYear={startYear}
          endYear={endYear}
        />

        {/* Description */}
        {descriptionText && (
          <CustomPortableText
            paragraphClasses="font-barlow leading-[1.2] md:leading-[1.1] text-justify text-base md:text-lg "
            value={descriptionText}
          />
        )}
      </div>

      {/* Videos Section */}
      {videos.length > 0 && (
        <div className="py-8 md:py-12 md:mx-24 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {videos.map((video, index) => (
              <div key={index} className="video-item">
                <h2 className="text-center text-2xl font-arsenal text-[#6a6a6a] mb-4">
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
