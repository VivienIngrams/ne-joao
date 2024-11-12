'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { projectsPageQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { HomePagePayload } from '@/types'

import ProjectsPage from './ProjectsPage'

type Props = {
  initial: QueryResponseInitial<HomePagePayload | null>
}

export default function ProjectsPagePreview(props: Props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery<HomePagePayload | null>(
    projectsPageQuery,
    {},
    { initial },
  )

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Projects document to see the preview!
      </div>
    )
  }

  return <ProjectsPage data={data} encodeDataAttribute={encodeDataAttribute} />
}
