import Image from 'next/image'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, title } = data ?? {}

  return (
    <div>
      <div className="py-7 md:py-6 md:max-w-[65vw] md:mx-auto">
        {/* Header */}
        <Header title={title} description={undefined} />

        {/* Body */}
        {body && (
          <div className="md:pt-6 min-[1800px]:pt-8 min-[1800px]:mx-40">
            <CustomPortableText
              paragraphClasses="font-barlow max-w-3xl text-gray-800 text-lg"
              value={body}
            />
          </div>
        )}

        {/* Footer - only display if the title is "Infos" */}
        {title === 'Infos' && (
          <div className="w-full flex flex-col justify-center">
            <h1>Apoios</h1>
            {/* Logos */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 mb-6 md:m-4">
              <Image
                src="/porto.jpg"
                alt="Câmara Municipal do Porto Logo"
                width={200}
                height={100}
                className="h-auto"
              />
              <div className="flex flex-col text-xl uppercase mt-4 leading-none font-semibold">
                Garantir Cultura
                <Image
                  src="/RepPortuguesa.jpg"
                  alt=" Garantir Cultura da República Portuguesa"
                  width={120}
                  height={70}
                  className="h-auto md:-ml-1"
                />
              </div>
              <Image
                src="/dgartes_vertical cmyk.png"
                alt="dgartes_vertical"
                width={450}
                height={100}
                className="h-auto col-span-2"
              />
              <Image
                src="/Balleteatro_Logo_Positivo.png"
                alt="Balleteatro_Logo_Positivo"
                width={250}
                height={100}
                className="h-auto md:mt-4"
              />
            </div>

            <h1>Parcerias</h1>
            {/* Logos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 my-4 md:m-6">
              <Image
                src="/INL-Logo.jpg"
                alt="INL Logo"
                width={300}
                height={100}
                className="h-auto my-4"
              />
              <Image
                src="/UM.jpg"
                alt="UNiversidade do Minho"
                width={200}
                height={200}
                className="h-auto"
              />
              <Image
                src="/IF_LOGO.PNG"
                alt="IF Logo"
                width={250}
                height={200}
                className="h-auto md:-ml-6"
              />
            </div>

            <footer className="md:fixed md:bottom-0 md:left-6 z-50 pb-2">
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
