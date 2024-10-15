import { CustomPortableText } from '@/components/shared/CustomPortableText'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
}
export function Header(props: HeaderProps) {
  const { title, description, centered = false } = props
  if (!description && !title) {
    return null
  }
  return (
    <div className={`font-arsenal text-center`}>
    {/* <div className={`font-arsenal ${centered ? 'text-center' : 'w-5/6 lg:w-3/5'}`}> */}
      {/* Title */}
      {title && (
        <div className="text-4xl font-medium  tracking-tight md:text-6xl">
          {title}
        </div>
      )}
      {/* Description */}
      {description && (
        <div className="mt-2 text-xl text-green-100 md:text-2xl">
          <CustomPortableText value={description} />
        </div>
      )}
    </div>
  )
}
