import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

// import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import ImageBox from '@/components/shared/ImageBox'
import type { ProjectPayload } from '@/types'

export interface ProjectPageProps {
  data: ProjectPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function ProjectPage({ data, encodeDataAttribute }: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    tags,
    title,
  } = data ?? {}

  const startYear = new Date(duration?.start!).getFullYear()
  const endYear = duration?.end ? new Date(duration?.end).getFullYear() : 'Now'

  return (
    <div>
      <div className="mt-6 md:mt-0 py-4 md:mx-28 space-y-5">
        {/* Header */}
        <Header title={title} description={undefined} />

        <div className="">
          {/* Image  */}
          <ImageBox
            data-sanity={encodeDataAttribute?.('coverImage')}
            image={coverImage}
            // @TODO add alt field in schema
            alt=""
            classesWrapper="relative aspect-[16/9]"
          />
          {/* Description */}
          <Header title={undefined} description={overview} />

          <div className="divide-inherit grid grid-cols-1 divide-y lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {/* Duration */}
            {!!(startYear && endYear) && (
              <div className="">
                <div className="pt-2 text-md md:text-lg">
                  <span data-sanity={encodeDataAttribute?.('duration.start')}>
                    {startYear}
                  </span>
                 
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {/* {description && (
          <CustomPortableText
            paragraphClasses="font-barlow leading-[1.2] text-justify text-lg md:text-xl text-gray-200"
            value={description}
          />
        )} */}
      </div>
      {/* <div className="absolute left-0 w-screen border-t" /> */}
    </div>
  )
}

export default ProjectPage
