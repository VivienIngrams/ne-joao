import { PortableText, PortableTextBlock, PortableTextComponents } from 'next-sanity'
import ImageBox from '@/components/shared/ImageBox'
import { TimelineSection } from '@/components/shared/TimelineSection'

export function CustomPortableText({
  paragraphClasses,
  value,
  components,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
  components?: PortableTextComponents
}) {
  const defaultComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={`${paragraphClasses} pb-2`}>{children}</p>
      },
      bullet: ({ children }) => {
        return <ul className="">{children}</ul>
      },
    },
    list: {
      bullet: ({ children }) => {
        return <li className="font-barlow text-sm list-none pb-1">{children}</li>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
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
        value: { asset: { _ref: string; _type: string }; alt?: string; caption?: string }
      }) => {
        return (
          <div className="mb-4">
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
    <div className="max-w-2xl mx-auto text-base leading-relaxed">
      <PortableText components={components || defaultComponents} value={value} />
    </div>
  )
}
