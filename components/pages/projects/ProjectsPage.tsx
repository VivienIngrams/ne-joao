'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'
import React from 'react'
import { Header } from '@/components/shared/Header'

import { useLanguage} from '@/app/contexts/LanguageContext'

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
  const { language } = useLanguage();
        const titleText = language === 'en' ? data?.title : data?.title_pt;
console.log('showcaseProjects', showcaseProjects)
  return (
    <section className="pt-7 pb-4 md:py-4 md:pl-5">
      
      {/* Header */}
             <Header title={titleText} description={undefined} />

      {/* Showcase projects */}
      {showcaseProjects && showcaseProjects.length > 0 && (
        <div className="project-grid pt-2 md:pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-2 ">
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
