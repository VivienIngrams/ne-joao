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
    <footer className=" md:fixed bottom-0 right-0 md:left-0 z-50 md:w-[200px] md:h-[30px] p-2 text-right md:text-left ">
        
      {footer && (
        <CustomPortableText
          paragraphClasses="text-red-700  md:text-[10px]"
          value={footer}
        />
      )}
    </footer>
  )
}
