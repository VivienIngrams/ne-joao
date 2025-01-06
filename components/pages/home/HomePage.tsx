'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useLanguage} from '@/app/contexts/LanguageContext'
import { urlForImage } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
  
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  const imageUrl =
    data?.coverImage &&
    urlForImage(data.coverImage)
      ?.height(1000) // Adjust height as needed
      .width(2000) // Adjust width as needed
      .fit('crop') // Adjust fit as needed
      .url()

      const { language } = useLanguage();
      const overviewText = language === 'en' ? data?.overview : data?.overview_pt;
  
  return (
    <section className="relative h-screen w-screen bg-black overflow-hidden -ml-4">
  {/* Background Image using Next.js Image */}
  {imageUrl && (
    <Image
      src={imageUrl}
      alt="Background Image"
      fill
      sizes="100vw"
      className="object-cover object-center z-1"
      priority // Prioritize loading this image
    />
  )}

  {/* Content Over Background */}
  <Link
    href="/projects"
    className="absolute bg-gradient-to-l from-[rgba(9,38,40,0.29)]    to-black inset-0 "
  >
  <div
    className="absolute inset-0 flex flex-col justify-end items-center  md:ml-[19%] md:max-w-[32%] md:justify-center z-5"
  >
    <div className=" p-4 md:p-12 w-full   sm:w-full text-center md:text-left">
      {/* Title */}
      <h1 className="font-barlowC font-light text-6xl text-[#006c75]  md:text-9xl ">
        LabIO
      </h1>
      {/* Description */}
      {overviewText && (
        <h3 className="text-md py-2 text-[#006c75] leading-relaxed md:text-xl md:py-4">
          {overviewText}
        </h3>
      )}
    </div>
    </div>
  </Link>
</section>

  )
}

export default HomePage
