'use client'

import Image from 'next/image'

import { useLanguage} from '@/app/contexts/LanguageContext'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, body_pt, title_pt, title } = data ?? {}

     const { language } = useLanguage();
        const bodyText = language === 'en' ? data?.body : data?.body_pt;
        const titleText = language === 'en' ? data?.title : data?.title_pt;

  return (
    <div>
      <div className="pt-7 pb-4 md:py-4 md:max-w-[65vw] md:mx-auto">
        {/* Header */}
        <Header title={titleText} description={undefined} />

        {/* Body */}
        {bodyText && (
          <div className="md:pt-6  min-[1800px]:mx-40">
            <CustomPortableText
              paragraphClasses="font-barlow max-w-3xl text-gray-800 text-base md:text-lg"
              value={bodyText}
            />
          </div>
        )}

        {/* Footer - only display if the title is "Infos" */}
               {/* Footer - only display if the title is "Infos" */}
               {title === 'Info' && (
          <>
            <div className="max-w-full bg-white p-1 md:p-2 border-[2px] md:border-[2px] border-[#888888] flex flex-col justify-center md:mb-4 font-barlow -mt-6 md:-mt-4 font-bold text-sm md:text-base">
              <h1 className="mb-2">{language === 'en' ? 'Sponsors' : 'Apoios'}</h1>
              {/* Logos */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-3 mb-4">
                <Image
                  src="/porto.jpg"
                  alt="Câmara Municipal do Porto Logo"
                  width={100}
                  height={50}
                  className="h-auto mx-auto"
                />
                <div className="flex flex-col text-sm uppercase leading-none font-semibold items-center">
                  <span>Garantir Cultura</span>
                  <Image
                    src="/RepPortuguesa.jpg"
                    alt="Garantir Cultura da República Portuguesa"
                    width={100}
                    height={50}
                    className="h-auto"
                  />
                </div>
                <Image
                  src="/Balleteatro_Logo_Positivo.png"
                  alt="Balleteatro Logo"
                  width={150}
                  height={50}
                  className="h-auto mx-auto"
                />
                <Image
                  src="/dgartes_vertical cmyk.png"
                  alt="dgartes_vertical"
                  width={200}
                  height={50}
                  className="h-auto mx-auto col-span-2"
                />
              </div>

              <div className="mt-2">
                <h1 className="mb-2">{language === 'en' ? 'Collaborations' : 'Parcerias'}</h1>
                {/* Logos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                  <Image
                    src="/INL-Logo.jpg"
                    alt="INL Logo"
                    width={150}
                    height={50}
                    className="h-auto mx-auto"
                  />
                  <Image
                    src="/UM.jpg"
                    alt="Universidade do Minho"
                    width={120}
                    height={50}
                    className="h-auto mx-auto"
                  />
                  <Image
                    src="/IF_LOGO.PNG"
                    alt="IF Logo"
                    width={150}
                    height={50}
                    className="h-auto mx-auto"
                  />
                </div>
              </div>
            </div>
            <footer className="md:fixed md:bottom-0 md:left-6 z-50 pt-2 font-normal pb-1">
              <p className="text-[#6a6a6a] md:text-xs">Website: Vivien Ingrams</p>
            </footer>
          </>
        )}

      </div>
    </div>
  )
}

export default Page
