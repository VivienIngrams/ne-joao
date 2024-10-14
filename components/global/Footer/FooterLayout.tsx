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
    <footer className="hidden md:fixed bottom-0 left-2 z-10 w-[200px] h-[30px] py-2 text-left ">
      {footer && (
        <CustomPortableText
          paragraphClasses="text-gray-400 text-2xs md:text-xs"
          value={footer}
        />
      )}
    </footer>
  )
}
