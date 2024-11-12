'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'
import React from 'react'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents

  return (
    <section className="container mx-auto py-2 pl-28">
    
     <h1>{data?.title}</h1>
    {data?.overview && (
          <CustomPortableText
            paragraphClasses="font-barlow leading-[1.2] text-justify text-lg md:text-xl text-gray-200"
            value={data?.overview}
          />
        )}
    </section>
  )
}

export default HomePage
