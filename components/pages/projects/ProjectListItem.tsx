import type { ShowcaseProject } from '@/types'
import ImageBox from '@/components/shared/ImageBox'

interface ProjectProps {
  project: ShowcaseProject
}

export function ProjectListItem({ project }: ProjectProps) {
  // Extract the start year from the duration
  const startDate = project?.duration?.start
  const startYear = startDate ? new Date(startDate).getFullYear() : null

  return (
    <div className=" relative">
      <div className="flex flex-col items-center md:mx-4">
        {/* Image section */}
        <div className="w-full">
          <ImageBox
            image={project.coverImage}
            alt={`Cover image from ${project.title}`}
            classesWrapper="relative  w-100 h-40 overflow-hidden" // Wide aspect ratio and overflow hidden
          />
        </div>

        {/* Title section (overlay) */}
        <div className="absolute top0 left-0 w-full ml-2  md:ml-5 p-2">
          <h2 className="text-white text-lg font-semibold md:text-2xl">
            {project.title}
            {/* Display the start year if available */}
            {startYear && <span className="text-xs text-gray-400"> {startYear}</span>}
          </h2>
        </div>
      </div>
    </div>
  )
}
