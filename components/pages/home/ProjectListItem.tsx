import type { PortableTextBlock } from 'next-sanity'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import ImageBox from '@/components/shared/ImageBox'
import type { ShowcaseProject } from '@/types'

interface ProjectProps {
  project: ShowcaseProject
  odd: number
}

export function ProjectListItem(props: ProjectProps) {
  const { project, odd } = props

  return (
    <div className={`flex flex-col p-2 py-24 md:p-6 transition hover:bg-green-100/30 text-green-50 md:ml-48`}>
       
       {odd ? (
        <div className="flex mt-[25vh]">
          <TextBox project={project} />
        </div>
      ): null}
      <div className="w-full h-full">
        <ImageBox
          image={project.coverImage}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative aspect-[16/9]  border-[1px] border-green-100"
        />
      </div>
      {!odd && (
        <div className="flex">
          <TextBox project={project} />
        </div>
      )}
    </div>
  )
}

function TextBox({ project }: { project: ShowcaseProject }) {
  return (
    <div className="relative flex w-full flex-col justify-between py-3 md:py-12 ">
      <div>
        {/* Title */}
        <div className="mb-2 text-xl font-arsenal tracking-tight md:text-3xl">
          {project.title}
        </div>
        {/* Overview  */}
        <div className="font-serif text-gray-200 ">
          <CustomPortableText value={project.overview as PortableTextBlock[]} />
        </div>
      </div>
    </div>
  )
}
