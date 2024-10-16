'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

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
    // Only apply the animation if the window width is above 768 pixels (non-mobile screens)
    if (window.innerWidth > 768) {
      const pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: '-300vw', // depends on the number of ProjectListItems
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '2000 top',
            scrub: true,
            pin: true,
          },
        },
      )
      return () => {
        // A return function for killing the animation on component unmount
        pin.kill()
      }
    }
  }, []) // Empty dependency array means this effect runs only on mount

  return (
    <section className="overflow-x-scroll md:overflow-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div ref={triggerRef}>
        {/* Showcase projects */}
        {showcaseProjects && showcaseProjects.length > 0 && (
          <div
            ref={sectionRef}
            className="w-[500vw] ml-20 h-screen relative flex z-5 md:ml-32"
          >
            {showcaseProjects.map((project, key) => {
              const href = resolveHref(project?._type, project?.slug)
              if (!href) {
                return null
              }
              return (
                <Link
                  className="h-[90vh] w-[70vw] md:w-[60vw] my-[10vh] md:my-0"
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
      {/* Right arrow in corner */}
      <div className="absolute top-0 right-0 h-16 w-24 flex items-center justify-center z-30">
        <div className="pr-3 font-light">scroll</div>
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M13 3H12C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H13M17 8L21 12M21 12L17 16M21 12H9"
              stroke="#eee"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{' '}
          </g>
        </svg>
      </div>
    </section>
  )
}

export default HomePage