'use client'

import React from 'react'
import ImageBox from '@/components/shared/ImageBox' // Adjust the path if necessary
import type { HomePagePayload } from '@/types'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  return (
    <section className=" h-screen w-screen mx-auto flex justify-center items-center ml-[200px]">
      {/* Background Image using ImageBox */}
      <ImageBox
        image={data?.coverImage}
        alt="Background Image"
        classesWrapper="absolute top-0 left-0 w-full h-full -z-10"
      />

      {/* Content over the background */}
      <div className="backdrop-blur p-12  text-white text-xl w-1/3">
        {data?.overview && (
          <h3>{data?.overview}</h3>
        )}
      </div>
    </section>
  )
}

export default HomePage
