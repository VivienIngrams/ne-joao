'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import React, { useEffect,useRef } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = '' } = data ?? {}
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)
  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: '-100vw', //depends on number of projectlistitems!!
        ease: 'none',
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '2000 top',
          scrub: false,
          pin: true,
        },
      },
    )
    return () => {
      {
        /* A return function for killing the animation on component unmount */
      }
      pin.kill()
    }
  }, [])
  return (
    <section className="overflow-hidden">
      <div ref={triggerRef}>
        {/* Showcase projects */}
        {showcaseProjects && showcaseProjects.length > 0 && (
          <div ref={sectionRef} className="w-[200vw] h-screen relative flex z-5">
            {showcaseProjects.map((project, key) => {
              const href = resolveHref(project?._type, project?.slug)
              if (!href) {
                return null
              }
              return (
                <Link
                  className="h-screen w-screen"
                  key={key}
                  href={href}
                  data-sanity={encodeDataAttribute?.([
                    'showcaseProjects',
                    key,
                    'slug',
                  ])}
                >
                  <ProjectListItem project={project} odd={key % 2} />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default HomePage
