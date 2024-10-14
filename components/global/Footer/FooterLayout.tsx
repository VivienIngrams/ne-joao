import type { PortableTextBlock } from 'next-sanity'

import { CustomPortableText } from '@/components//shared/CustomPortableText'
import type { SettingsPayload } from '@/types'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])
  return (
    <footer className="fixed bottom-0 left-2 z-10 w-[200px] h-[40px] py-4 text-left md:py-4">
      {footer && (
        <CustomPortableText
          paragraphClasses="text-gray-400 text-2xs md:text-xs"
          value={footer}
        />
      )}
    </footer>
  )
}
