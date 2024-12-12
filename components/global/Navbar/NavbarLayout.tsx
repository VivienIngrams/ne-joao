'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'
import MobileNavMenu from './MobileNavMenu'
import { useEffect } from 'react'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])

  // Track the current language (default to 'pt')
  const [language, setLanguage] = useState<'en' | 'pt'>('pt')

  // Get the current path to check for homepage
  const path = usePathname()
  const isHomePage = path === '/'

  // Function to toggle between English and Portuguese
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'pt' : 'en'))
  }

  // Update language on page load, if it's already in localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage as 'en' | 'pt')
    }
  }, [])

  // Save language to localStorage on change
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  return (
    <nav
      className={`fixed top-0 bottom-0 z-50 md:min-h-screen max-h-screen font-barlowC ${
        isHomePage
          ? ' md:px-[10vw] bg-gradient-to-r from-white via-white to-black'
          : 'md:px-6 '
      }`}
    >
      {/* Language Switcher Button */}
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 p-1  text-red-700  rounded-tl-md rounded-br-md border-[1px] border-red-700 "
      >
        {language === 'en' ? 'PT' : 'EN'}
      </button>

      <div className="hidden md:flex w-full mt-4 py-5 justify-start">
        <Link
          href="/"
          className={`${
            isHomePage
              ? 'hidden'
              : 'font-barlowC font-thin sm:text-4xl text-6xl text-red-700 p-2 rounded-tl-md rounded-br-md border-2 border-red-700'
          }`}
        >
          LabIO
        </Link>
      </div>

      <MobileNavMenu menuItems={menuItems}  />
      {/* <MobileNavMenu menuItems={menuItems} language={language} /> */}

      <div className="lg:h-[70vh] flex flex-col items-start justify-center gap-y-2">
        {menuItems &&
          menuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }

            const isBold =
              menuItem.title === 'All Projects' ||
              menuItem.title === 'Infos' ||
              menuItem.title === 'About' ||
              menuItem.title === 'CVs'

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
                  isBold ? 'font-bold' : 'font-light'
                } text-lg hover:text-red-700 lg:text-xl`}
                href={href}
              >
                {title}
                {startYear && (
                  <span className="text-xs text-gray-400"> {startYear}</span>
                )}
              </Link>
            )
          })}
      </div>
    </nav>
  )
}
