import { PortableText, PortableTextBlock, PortableTextComponents } from 'next-sanity'
import ImageBox from '@/components/shared/ImageBox'
import { TimelineSection } from '@/components/shared/TimelineSection'
import Image from 'next/image'

export function CustomPortableText({
  paragraphClasses,
  value,
  components,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
  components?: PortableTextComponents // Accept custom components
}) {
  // Split content into two columns
  const halfwayPoint = Math.ceil(value.length / 2)
  const firstColumn = value.slice(0, halfwayPoint)
  const secondColumn = value.slice(halfwayPoint)

  // Default components if none are provided
  const defaultComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50 z-5"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        return (
          <div className="my-4 space-y-2 z-5">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-black">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
    },
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* First Column */}
      <div className="w-full md:w-1/2">
        <PortableText components={components || defaultComponents} value={firstColumn} />
      </div>

      {/* Second Column */}
      <div className="w-full md:w-1/2">
        <PortableText components={components || defaultComponents} value={secondColumn} />
      </div>
    </div>
  )
}
