import { PortableText, PortableTextBlock, PortableTextComponents } from 'next-sanity'

interface HeaderProps {
  centered?: boolean
  description?: PortableTextBlock[] // 'description' can now be rendered with PortableText directly
  title?: string
  startYear?: number
  endYear?: number | string // Use 'Now' as a string if applicable
}

export function Header(props: HeaderProps) {
  const { title, description, centered = false, startYear, endYear } = props

  if (!description && !title) {
    return null
  }

  // Define custom PortableTextComponents for rendering within the Header
  const headerPortableTextComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className="text-xl md:text-2xl leading-[1.3rem] md:leading-[1.5rem] text-gray-500">{children}</p>,
      h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-100">{children}</h1>,
      h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-200">{children}</h2>,
    },
    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          className=""
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  }

  return (
    <div className={`font-arsenal ${centered ? 'md:text-center' : ''} mt-4 md:-ml-6`}>
      {/* Title with Duration */}
      {title && (
        <div className="mb-4 flex items-baseline md:justify-center text-4xl md:text-6xl font-medium tracking-tight">
          <span>{title}</span>
          {startYear && (
            <span className="ml-2 text-lg text-gray-400">
              {startYear}
            </span>
          )}
        </div>
      )}

      {/* Description using PortableText directly */}
      {description && (
        <div className="mb-4  md:max-w-[50vw] md:mx-auto md:text-center">
          <PortableText 
            value={description}  // Use the description prop directly here
            components={headerPortableTextComponents}  // Pass the custom components
          />
        </div>
      )}
    </div>
  )
}
