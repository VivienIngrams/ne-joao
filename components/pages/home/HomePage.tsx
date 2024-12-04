'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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

  return (
    <section className="max-h-screen max-w-screen bg-black">
      {/* Background Image using Next.js Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Background Image"
          fill
          sizes="100vw"
          objectFit="cover" // Ensures the image covers the area proportionally
          className="md:ml-[25vw] z-1"
          priority // Prioritize loading this image
        />
      )}
      {/* Content over the background */}
      <Link href="/projects" className="absolute top-0 left-0 max-h-screen w-full h-full flex justify-center items-end  z-5">
        <div className=" flex flex-col py-8 pl-6 w-1/3">
          <h1 className="font-barlowC font-thin text-6xl text-red-700 align-left ">
            LabIO
          </h1>{' '}
          {data?.overview && (
            <h3 className="  text-xl py-4  text-white "> {data?.overview}</h3>
          )}
        </div>
      </Link>
    </section>
  )
}

export default HomePage
