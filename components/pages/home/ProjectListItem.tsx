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
    <div className={`flex flex-col p-2 py-16 -ml-20 md:p-6 transition text-green-50 md:ml-16`}>
       
       {odd ? (
        <div className="flex mt-[35vh] md:mt-[10vh] p-1 hover:bg-green-100/30">
          <TextBox project={project} />
        </div>
      ): null}
      <div className="w-full h-full  hover:bg-green-100/30">
        <ImageBox
          image={project.coverImage}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative aspect-[16/9] p-1  shadow-md shadow-green-200"
        />
      </div>
      {!odd ? (
        <div className="flex p-1 hover:bg-green-100/30">
          <TextBox project={project} />
        </div>
      ) : null}
    </div>
  )
}

function TextBox({ project }: { project: ShowcaseProject }) {
  return (
    <div className="relative flex w-full flex-col justify-between py-2 md:py-4 ">
      <div>
        {/* Title */}
        <div className=" text-xl font-arsenal tracking-tight md:text-3xl">
          {project.title}
        </div>
        {/* Overview  */}
        <div className="hidden md:block text-gray-200 ">
          <CustomPortableText value={project.overview as PortableTextBlock[]} />
        </div>
      </div>
    </div>
  )
}
