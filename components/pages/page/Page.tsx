import Image from 'next/image'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title } = data ?? {}

  return (
    <div>
      <div className="py-7 md:py-6  md:max-w-[65vw] md:mx-auto">
        {/* Header */}
        <Header title={title} description={undefined} />

        {/* Body */}
        {body && (
          <div className="h-full w-full flex justify-center items-center">
            <div className="md:pt-6 min-[1800px]:pt-8 min-[1800px]:mx-40">
              <CustomPortableText
                paragraphClasses="font-barlow max-w-3xl text-gray-800 text-lg "
                value={body}
              />
            </div>
          </div>
        )}

        {/* Footer - only display if the title is "Infos" */}
        {title === 'Infos' && (
          <div className="w-full flex justify-center">
            {/* Logos */}
            <div className="flex justify-end md:justify-start items-center space-x-4 md:space-x-6 my-6">
              <Image
                src="/dgartes.jpg"
                alt="Logo 1"
                width={100}
                height={100}
                className="h-16 md:h-24"
              />
              <Image
                src="/RepPortuguesa.jpg"
                alt="Logo 2"
                width={150}
                height={100}
                className="h-16 md:h-24"
              />
            </div>

            <footer className="md:fixed bottom-0 right-0 md:left-6 z-50 pb-2 text-right md:text-left">
              <p className="text-red-700 md:text-sm">
                Website by Vivien Ingrams
              </p>
            </footer>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
