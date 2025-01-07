'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'
import MobileNavMenu from './MobileNavMenu'

import { useLanguage } from '@/app/contexts/LanguageContext'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  const { language, toggleLanguage } = useLanguage();

  // Get the current path to check for homepage
  const path = usePathname()
  const isHomePage = path === '/'

 


  return (
    
    <nav
      className={`fixed top-0 bottom-0 z-50 md:min-h-screen max-h-screen font-barlowC ${
        isHomePage
          ? ' md:pr-[14vw] md:pl-[9vw] bg-gradient-to-r from-[rgb(38,70,83)]    to-black'
          : 'md:px-6 bg-[rgb(38,70,83)]'
      }`}
    >
      {/* Language Switcher Button */}
      <button
        onClick={toggleLanguage}
        className="hidden md:block md:fixed top-3 right-3 p-1 bg-white/10 text-small text-[#264653]  rounded-tl-md rounded-br-md border-[1px] border-[#264653] "
      >
        {language === 'en' ? 'PT' : 'EN'}
      </button>
      <div className="hidden md:flex w-full mt-4 py-5 justify-start">
        <Link
          href="/"
          className={`${
            isHomePage
              ? 'hidden'
              : 'font-barlowC font-light sm:text-4xl text-6xl text-[rgb(216,226,220)] p-2 rounded-tl-md rounded-br-md border-2 border-[rgb(216,226,220)]'
          }`}
        >
          LabIO
        </Link>
      </div>

      <MobileNavMenu menuItems={menuItems}  />

      <div className="lg:h-[70vh] flex flex-col items-start justify-center text-[rgb(216,226,220)] gap-y-2">
        {menuItems &&
          menuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }

            const isBold =
              menuItem.title === 'All Projects' ||
              menuItem.title === 'Info' ||
              menuItem.title === 'About' ||
              menuItem.title === 'Biographies' ||
              menuItem.title === 'Publications'

            // Access the start date from the duration field
            const startDate = menuItem?.duration?.start

            // Extract the year from the start date, if available
            const startYear = startDate
              ? new Date(startDate).getFullYear()
              : null

            // Conditionally render title based on the selected language
            const title = language === 'en' ? menuItem.title : menuItem.title_pt

            return (
              <Link
                key={key}
                className={`hidden md:block ${
                  isBold ? 'font-medium lg:text-xl' : 'font-thin'
                } text-lg hover:text-white `}
                href={href}
              >
                {title}
                {startYear && (
                  <span className="text-xs text-white"> {startYear}</span>
                )}
              </Link>
            )
          })}
      </div>
    </nav>
  )
}
