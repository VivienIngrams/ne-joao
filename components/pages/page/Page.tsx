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
      <div className="pt-7 pb-4 md:py-6 md:max-w-[65vw] md:mx-auto">
        {/* Header */}
        <Header title={titleText} description={undefined} />

        {/* Body */}
        {bodyText && (
          <div className="md:pt-6 min-[1800px]:pt-8 min-[1800px]:mx-40">
            <CustomPortableText
              paragraphClasses="font-barlow max-w-3xl text-gray-800 text-base md:text-lg"
              value={bodyText}
            />
          </div>
        )}

        {/* Footer - only display if the title is "Infos" */}
        {title === 'Info' && (
          <div className="max-w-full flex flex-col justify-center md:mb-12 font-barlow -mt-6 md:mt-6 font-bold text-base md:text-lg ">
           <h1 className=''>{language === 'en' ? 'Sponsors' : 'Apoios'}</h1>
            {/* Logos */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 mb-6 md:m-4">
              <Image
                src="/porto.jpg"
                alt="Câmara Municipal do Porto Logo"
                width={200}
                height={100}
                className="h-auto"
              />
              <div className="flex flex-col text-base uppercase mt-4 leading-none font-semibold">
                Garantir Cultura
                <Image
                  src="/RepPortuguesa.jpg"
                  alt=" Garantir Cultura da República Portuguesa"
                  width={150}
                  height={100}
                  className="h-auto -ml-1"
                />
              </div>
              <Image
                src="/Balleteatro_Logo_Positivo.png"
                alt="Balleteatro_Logo_Positivo"
                width={250}
                height={100}
                className="h-auto md:mt-[45px] ml-[18vw] md:ml-0"
              />
              <Image
                src="/dgartes_vertical cmyk.png"
                alt="dgartes_vertical"
                width={450}
                height={100}
                className="h-auto col-span-2 md:mt-2"
              />
            </div>

            <div className='md:mt-6 '>
              <h1 className=''>{language === 'en' ? 'Collaborations' : 'Parcerias'}</h1>
              {/* Logos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 m-4 md:mx-6">
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
                  height={150}
                  className="h-auto ml-[10vw] md:ml-0"
                />
                <Image
                  src="/IF_LOGO.PNG"
                  alt="IF Logo"
                  width={250}
                  height={200}
                  className="h-auto md:-ml-6"
                />
              </div>
            </div>

            <footer className="md:fixed md:bottom-0 md:left-6 z-50 pt-6 font-normal md:pb-2">
              <p className="text-red-700 md:text-sm">
                Website: Vivien Ingrams
              </p>
            </footer>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
