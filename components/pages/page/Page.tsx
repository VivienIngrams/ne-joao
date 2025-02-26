'use client'

import Image from 'next/image'
import Link from 'next/link'

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
      <div className="py-7 md:py-4 md:max-w-[65vw] md:mx-auto">
        {/* Header */}
        <Header title={titleText} description={undefined} />

        {/* Body */}
        {bodyText && (
          <div className="md:pt-4  md:max-w-[65vw] ">
            <CustomPortableText
              paragraphClasses="font-barlow max-w-3xl text-gray-800 text-justify text-base"
              value={bodyText}
            />
          </div>
        )}

        {/* Footer - only display if the title is "Infos" */}
               {/* Footer - only display if the title is "Infos" */}
               {title === 'Info' && (
          <>
            <div className="max-w-full  p-2 border-[2px] md:border-[2px] text-[#2a687d]  border-[#2a687d]  flex flex-col justify-center md:mb-4 font-barlow mt-4 font-bold text-sm md:text-base">
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
                <div className="flex flex-col text-sm pt-2 pr-2 uppercase leading-none text-gray-700 font-semibold items-start">
                  <span>Garantir Cultura</span>
                  <Image
                    src="/RepPortuguesa.jpg"
                    alt="Garantir Cultura da República Portuguesa"
                    width={100}
                    height={50}
                    className="h-auto"
                  />
                </div>
                <div className='col-span-2 md:col-span-1'>
                <Image
                  src="/Balleteatro_Logo_Positivo.png"
                  alt="Balleteatro Logo"
                  width={150}
                  height={50}
                  className="h-auto mx-auto py-3"
                />
                </div>
                <Image
                  src="/dgartes_vertical cmyk.png"
                  alt="dgartes_vertical"
                  width={250}
                  height={50}
                  className="h-auto mx-auto pt-2 col-span-2"
                />
              </div>

              <div className="mt-2">
                <h1 className="mb-2">{language === 'en' ? 'Collaborations' : 'Parcerias'}</h1>
                {/* Logos */}
                <div className="grid grid-cols-1 md:mx-[15vw] md:grid-cols-2 gap-5 md:gap-3">
                  
                  <Image
                    src="/UMinho-C.png"
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
            <footer className="md:fixed md:bottom-0 md:left-6 z-50 py-3 font-bold md:font-medium ">
              <Link href="https://vivieningrams.com" target="_blank"
            rel="noopener noreferrer" className="text-[#2a687d] md:text-white font-barlow text-xs">Website: Vivien Ingrams</Link>
            </footer>
          </>
        )}

      </div>
    </div>
  )
}

export default Page
