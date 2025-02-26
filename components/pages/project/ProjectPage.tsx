'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useLanguage } from '@/app/contexts/LanguageContext'
import ProjectNavigation from '@/components/global/ProjectNav'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import VideoPlayer from '@/components/shared/VideosPlayer'
import type { ProjectPayload } from '@/types'

export interface ProjectPageProps {
  data: ProjectPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}
const fetchVideosFromBlobStore = async () => {
  const response = await fetch('/api/get-blob')
  if (!response.ok) {
    throw new Error('Failed to fetch videos')
  }
  const videos = await response.json()

   // Check if poster URL exists, otherwise provide a default
   return videos.map((video: any) => ({
    src: video.src,
    poster: '/3.png', // Ensure a valid poster
    title: video.title,
  }))
}

export function ProjectPage({ data, encodeDataAttribute }: ProjectPageProps) {
  const [longVideos, setLongVideos] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const blobs = await fetchVideosFromBlobStore()
        setLongVideos(blobs)
        console.log('Fetched videos:', blobs)
      } catch (error) {
        console.error('Error fetching videos:', error)
      }
    }
    fetchData()
  }, [])
  const { language } = useLanguage()
  if (!data) return <div>Loading...</div>

  // Destructure the new data structure
  const { project, allProjects } = data ?? {}
  const {
    title,
    title_pt,
    description,
    description_pt,
    duration,
    overview,
    overview_pt,
  } = project ?? {}
  if (!project) return <div>Project not found</div>
  const overviewText = language === 'en' ? overview : overview_pt
  const titleText = language === 'en' ? title : title_pt
  const descriptionText = language === 'en' ? description : description_pt

  const startYear = duration?.start
    ? new Date(duration.start).getFullYear()
    : undefined
  const endYear = duration?.end ? new Date(duration.end).getFullYear() : 'Now'

  // Define the type for video items
  interface Video {
    src: string
    poster: string
    title: string
    title_pt: string
  }

  const videos = (() => {
    // Define hardcoded videos for different titles
    const hardcodedVideos =
      title === 'Laboratório'
        ? [
            {
              src: '/1.mov',
              poster: '/1.png',
              title:
                language === 'en'
                  ? 'Laboratory Video 1'
                  : 'Laboratório Vídeo 1',
            },
            {
              src: '/2.mp4',
              poster: '/2.png',
              title:
                language === 'en'
                  ? 'Laboratory Video 2'
                  : 'Laboratório Vídeo 2',
            },
          ]
        : title === 'LabIO Performance'
          ? [
              {
                src: '/LabIO.mp4',
                poster: '/LabIO.png',
                title:
                  language === 'en'
                    ? 'LabIO Performance Video 1'
                    : 'LabIO Performance Vídeo 1',
              },
              {
                src: '/LabIO2.mp4',
                poster: '/LabIO2.png',
                title:
                  language === 'en'
                    ? 'LabIO Performance Video 2'
                    : 'LabIO Performance Vídeo 2',
              },
            ]
          : []

    // Only add fetched longVideos if the title is "Laboratório"
    if (title === 'Laboratório') {
      const fetchedVideos = longVideos.map((video: any) => ({
        src: video.src,
        poster: video.poster,
        title:
          language === 'en'
            ? 'Laboratório Interview'
            : `Entrevista Laboratório`,
      }))
      return [...hardcodedVideos, ...fetchedVideos]
    }

    return hardcodedVideos
  })()
  return (
    
    <div className="mt-20 md:my-6 md:mx-24 ">
      <div>
        <div className="-mb-3 md:hidden">
          <Link
            href="/projects"
            className=" text-sm font-arsenal underline-offset-2 underline text-[#2a687d]  transition-colors hover:text-black hover:font-bold "
          >
            {language === 'en' ? 'PROJECTS' : 'PROJETOS'}
          </Link>
        </div>

        <div className="md:space-y-6 ">
          {/* Header with duration */}
          <Header
            title={titleText}
            description={overviewText || []}
            startYear={startYear}
            endYear={endYear}
          />

          {/* Description */}
          {descriptionText && (
            <CustomPortableText
              paragraphClasses="font-barlow leading-[1.2]  text-justify text-base "
              value={descriptionText}
            />
          )}
        </div>
      </div>
      {/* Videos Section */}
      {videos.length > 0 && (
        <div className="my-4 mx-auto w-full max-w-4xl">
          {' '}
          {/* Ensures consistent width */}
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div key={index} className="w-full">
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

      {/* Project Nav Footer */}
      {allProjects && project?.slug && (
        <ProjectNavigation
          projects={allProjects}
          currentProjectSlug={project.slug}
        />
      )}
    </div>
  )
}

export default ProjectPage
