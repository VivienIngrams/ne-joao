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
    <div className={`p-2 py-16 -ml-20 md:p-6 md:ml-16 `}>
    <div className={`flex flex-col hover:bg-green-100/40 p-1 rounded-sm`}>
       
       {odd ? (
        <div className="flex mt-[35vh] md:mt-[10vh] p-1">
          <TextBox project={project} />
        </div>
      ): null}
      <div className="w-full h-full ">
        <ImageBox
          image={project.coverImage}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative aspect-[16/9]  shadow-md shadow-green-200 hover:shadow-none"
        />
      </div>
      {!odd ? (
        <div className="flex p-1">
          <TextBox project={project} />
        </div>
      ) : null}
    </div>
    </div>
  )
}

function TextBox({ project }: { project: ShowcaseProject }) {
  return (
    <div className="relative flex w-full flex-col justify-between py-2 md:py-4 ">
      <div>
        {/* Title */}
        <div className=" text-green-100  text-xl font-arsenal tracking-tight md:text-3xl">
          {project.title}
        </div>
        {/* Overview  */}
        <div className="hidden md:block text-gray-200 ">
          {/* <CustomPortableText value={project.overview as PortableTextBlock[]} /> */}
        </div>
      </div>
    </div>
  )
}
