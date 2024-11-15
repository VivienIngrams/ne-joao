import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { PortableTextBlock, PortableTextComponents } from 'next-sanity'

interface HeaderProps {
  centered?: boolean
  description?: PortableTextBlock[]
  title?: string
}

export function Header(props: HeaderProps) {
  const { title, description, centered = false } = props

  if (!description && !title) {
    return null
  }

  // Define custom PortableTextComponents for rendering within the Header
  const headerPortableTextComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className="text-base text-gray-300">{children}</p>,
      h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-100">{children}</h1>,
      h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-200">{children}</h2>,
    },
    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          className="underline text-blue-500 hover:text-blue-400"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  }

  return (
    <div className={`font-arsenal ${centered ? 'text-center' : ''} mt-2`}>
      {/* Title */}
      {title && (
        <div className="text-4xl text-left md:text-center font-medium tracking-tight md:text-6xl">
          {title}
        </div>
      )}

      {/* Description with Custom Portable Text Rendering */}
      {description && (
        <div className="mt-2 text-xl text-red-700 leading-[1.3rem] md:text-xl">
          <CustomPortableText
            value={description}
            paragraphClasses="mt-4"
            components={headerPortableTextComponents} // Pass custom components here
          />
        </div>
      )}
    </div>
  )
}
