'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { useEffect, useState } from 'react'

import { useLanguage } from '@/app/contexts/LanguageContext'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import VideoPlayer from '@/components/shared/VideosPlayer'
import type { ProjectPayload } from '@/types'

const fetchVideosFromBlobStore = async () => {
  const response = await fetch('/api/get-blob');
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  return await response.json();
};


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

  const [longVideos, setLongVideos] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const blobs = await fetchVideosFromBlobStore();
        setLongVideos(blobs);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }
    fetchData();
  }, []);
 
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


  const videos = (() => {
    // Define hardcoded videos for different titles
    const hardcodedVideos = title === 'Laboratório' ? [
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
    ] : title === 'LabIO Performance' ? [
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
    ] : [];
  
    // Only add fetched longVideos if the title is "Laboratório"
    if (title === 'Laboratório') {
      const fetchedVideos = longVideos.map((video: any) => ({
        src: video.src,
        poster: video.poster,
        title: language === 'en' ? 'Laboratório Interview' : `Entrevista Laboratório`,
      }));
      return [...hardcodedVideos, ...fetchedVideos];
    }
  
    return hardcodedVideos;
  })();
  

  return (
    <div>
      <div className="mt-12 md:mt-0 pt-4 md:mx-24 space-y-4 ">
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
            paragraphClasses="font-barlow leading-[1.2]  text-justify text-base "
            value={descriptionText}
          />
        )}
      </div>

      {/* Videos Section */}
      {videos.length > 0 && (
        <div className=" my-4 max-w-2xl mx-auto">
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div key={index} className="video-item">
                {/* <h2 className="text-center text-2xl font-arsenal text-[#2a687d] mb-4">
                  {video.title}
                </h2> */}
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
