'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'
import React from 'react'

import { ProjectListItem } from '@/components/pages/projects/ProjectListItem'
import { resolveHref } from '@/sanity/lib/utils'
import type { ProjectsPagePayload } from '@/types'

export interface ProjectsPageProps {
  data: ProjectsPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function ProjectsPage({ data, encodeDataAttribute }: ProjectsPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { showcaseProjects = [] } = data ?? {}

  return (
    <section className=" md:pl-12">
     
      {/* Showcase projects */}
      {showcaseProjects && showcaseProjects.length > 0 && (
        <div className=" my-7 md:my-6 project-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 min-[1800px]:gap-7">
          {showcaseProjects.map((project, key) => {
            const href = resolveHref(project?._type, project?.slug)
            if (!href) return null

            return (
              <Link
                className="w-full"
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.([ 'showcaseProjects', key, 'slug' ])}
              >
                <ProjectListItem project={project} />
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ProjectsPage
