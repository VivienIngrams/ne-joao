import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

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
            paragraphClasses="font-barlow leading-[1.2] text-justify text-lg  text-gray-700"
            value={description}
          />
        )}
      </div>

    </div>
  )
}

export default ProjectPage
