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
    <section className=" h-screen w-screen mx-auto ml-[200px]">
      {/* Background Image using ImageBox */}
      <ImageBox
        image={data?.coverImage}
        alt="Background Image"
        classesWrapper="absolute top-0 left-[30vw]  h-full -z-10 "
      />

      {/* Content over the background */}
      <div className="absolute top-0 left-0  w-full h-full flex justify-center items-end  ">
      <div className=" flex flex-col py-8 pl-6 w-1/3">
     
      <h1 className="font-barlowC font-thin text-6xl text-red-700 align-left ">
          LabIO
        </h1> {data?.overview && (
          <h3 className='  text-2xl py-4  text-white '> {data?.overview}</h3>
        )}</div>
      </div>
    </section>
  )
}

export default HomePage
