import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/app/contexts/LanguageContext'

interface ProjectNavigationProps {
  projects: Array<{
    title: string
    title_pt?: string
    slug: string
    _type: string
  }>
  currentProjectSlug: string
}

const ProjectNavigation = ({ projects, currentProjectSlug }: ProjectNavigationProps) => {
  const { language } = useLanguage()
  
  // Find current project index
  const currentIndex = projects.findIndex(p => p.slug === currentProjectSlug)
  
  // Get previous and next projects
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  
  return (
    <footer className="min-w-full py-4 mb-4 md:px-12">
      <div className="max-w-screen-xl mx-auto py-3 flex justify-between items-center">
        {previousProject ? (
          <Link 
            href={`/projects/${previousProject.slug}`}
            className="flex items-center gap-2 text-[#2a687d] group hover:text-black transition-colors"
          >
            <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
            <div>
              <div className="text-sm text-black">
                {language === 'en' ? 'Previous Project' : 'Projeto Anterior'}
              </div>
              <div className="font-semibold  font-arsenal">
                {language === 'en' ? previousProject.title : previousProject.title_pt || previousProject.title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="w-1/3" /> 
        )}
        
        {nextProject ? (
          <Link 
            href={`/projects/${nextProject.slug}`}
            className="flex items-center gap-2 text-right group hover:text-black transition-colors ml-auto"
          >
            <div className=' text-[#2a687d]'>
              <div className="text-sm text-black">
                {language === 'en' ? 'Next Project' : 'Próximo Projeto'}
              </div>
              <div className="font-semibold font-arsenal">
                {language === 'en' ? nextProject.title : nextProject.title_pt || nextProject.title}
              </div>
            </div>
            <ArrowRight className="text-[#2a687d] transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div className="w-1/3" />
        )}
      </div>
    </footer>
  )
}

export default ProjectNavigation