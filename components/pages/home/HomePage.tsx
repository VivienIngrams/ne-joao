'use client'

import React from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  const imageUrl =
    data?.coverImage &&
    urlForImage(data.coverImage)
      ?.height(2000) // Adjust height as needed
      .width(3500) // Adjust width as needed
      .fit('crop') // Adjust fit as needed
      .url()

  return (
    <section className="h-screen mx-auto md:ml-[200px] bg-black">
      {/* Background Image using Next.js Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Background Image"
          layout="fill" // Makes the image cover the entire container
          objectFit="cover" // Ensures the image covers the area proportionally
          className="absolute top-0 left-0 md:left-[25vw] z-1"
          priority // Prioritize loading this image
        />
      )}
      {/* Content over the background */}
      <div className="absolute top-0 left-0  w-full h-full flex justify-center items-end  z-5">
      <div className=" flex flex-col py-8 pl-6 w-1/3">
     
      <h1 className="font-barlowC font-thin text-6xl text-red-700 align-left ">
          LabIO
        </h1> {data?.overview && (
          <h3 className='  text-xl py-4  text-white '> {data?.overview}</h3>
        )}</div>
      </div>
    </section>
  )
}

export default HomePage
