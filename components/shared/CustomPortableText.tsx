import Image from 'next/image'
import { PortableText, PortableTextBlock, PortableTextComponents } from 'next-sanity'

import ImageBox from '@/components/shared/ImageBox'
import { TimelineSection } from '@/components/shared/TimelineSection'

// Helper function to calculate total character count in PortableText blocks
const getCharacterCount = (blocks: PortableTextBlock[]) =>
  blocks.reduce((total, block) => {
    // Treat an image block as a paragraph with an estimated character count
    if (block._type === 'image') {
      return total + 150 // Adjust this value as needed for your layout
    }

    if (typeof block.children !== 'undefined') {
      return total + block.children.reduce((sum, child) => sum + (child.text || '').length, 0)
    }
    return total
  }, 0)

export function CustomPortableText({
  paragraphClasses,
  value,
  components,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
  components?: PortableTextComponents // Accept custom components
}) {
  // Calculate the total character count for all blocks
  const totalCharacterCount = getCharacterCount(value)

  // Find the splitting point
  let currentCharacterCount = 0
  const splitIndex = value.findIndex((block) => {
    currentCharacterCount += getCharacterCount([block])
    return currentCharacterCount >= totalCharacterCount / 2
  })

  // Split content at the calculated index
  const firstColumn = value.slice(0, splitIndex + 1)
  const secondColumn = value.slice(splitIndex + 1)

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
        value: { asset: { _ref: string; _type: string }; alt?: string; caption?: string }
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
    <div className="flex flex-col md:flex-row md:gap-7 text-base">
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
