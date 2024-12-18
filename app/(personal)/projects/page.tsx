import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'

import { ProjectsPage } from '@/components/pages/projects/ProjectsPage'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadProjectsPage } from '@/sanity/loader/loadQuery'

const ProjectsPagePreview = dynamic(
  () => import('@/components/pages/projects/ProjectsPagePreview'),
)

export function generateStaticParams() {
  return generateStaticSlugs('projects')
}


export default async function ProjectsPageRoute() {
  const initial = await loadProjectsPage()
  // if (draftMode().isEnabled) {
  //   return <ProjectsPagePreview initial={initial} />
  // }

  return <ProjectsPage data={initial.data} />
}