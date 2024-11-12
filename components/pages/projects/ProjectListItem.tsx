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
    <div className="mb-2 relative">
      <div className="flex flex-col items-center">
        {/* Image section */}
        <div className="w-full">
          <ImageBox
            image={project.coverImage}
            alt={`Cover image from ${project.title}`}
            classesWrapper="relative aspect-[16/9] shadow-md hover:shadow-none"
          />
        </div>
        
        {/* Title section (overlay) */}
        <div className="absolute bottom-0 left-0 w-full bg-black/10 text-center py-2">
          <h2 className="text-white text-lg font-semibold md:text-xl">
            {project.title}
            {/* Display the start year if available */}
            {startYear && <span className="text-xs text-gray-400">  {startYear}</span>}
          </h2>
        </div>
      </div>
    </div>
  )
}
