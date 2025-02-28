'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { useLanguage } from '@/app/contexts/LanguageContext'
import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem } from '@/types'

interface MobileNavMenuProps {
  menuItems: MenuItem[]
}

const MobileNavMenu = ({ menuItems }: MobileNavMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()

  const path = usePathname()
  const isHomepage = path === '/'

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  // Filter only the bold items for the bottom nav
  const bottomNavItems = menuItems.filter((item) =>
    ['Projects', 'Info', 'About', 'Biographies', 'Publications'].includes(item.title ?? '')
)


  return (
    <nav className="fixed top-0 left-0 w-full z-20 md:hidden">
      {/* Top Navigation Bar */}
      <div
        className={`fixed top-0 left-0 z-10 flex w-full px-16 mx-auto py-4 pb-3 justify-center h-[84px] ${
          !isHomepage ? 'bg-[#d8e2dc]' : ''
        }`}
      >
        {!isHomepage && (
          <Link
            href="/"
            className="font-barlowC font-thin text-4xl mb-3 px-2 rounded-tl-md text-[#2a687d] rounded-br-md border-[1px] border-[#2a687d]"
          >
            LabIO
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="z-20 flex items-start pt-2 justify-start text-lg md:text-xl">
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-start justify-start z-40"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen && (
              <svg
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
                className="block h-8 w-8 ml-4 mt-[8px] z-100"
                fill="none"
              >
                <path
                  d="M12 8h15M5 16h22M5 24h22M5 11l3-3-3-3"
                  stroke={isHomepage ? '#bfc8c4' : '#2a687d'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div onClick={toggleMenu}
        className={`${
          isOpen ? 'block' : 'hidden'
        } font-arsenal z-50 fixed top-0 left-0 min-h-screen w-screen bg-gradient-to-r from-[rgb(6,62,67)] to-[rgba(38,70,83,0.5)] backdrop-blur`}
        id="mobile-menu"
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="absolute top-4 left-4 z-60 flex items-center justify-center"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Close main menu</span>
          <svg
            className="block h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 5L5 19M5 5L19 19"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="fixed top-4 right-4 p-1 text-xs text-[#2a687d] z-55 bg-[rgba(184,200,194),0.5)] rounded-tl-md rounded-br-md border-[1px] border-[rgb(38,70,83)]"
        >
          {language === 'en' ? 'PT' : 'EN'}
        </button>

        {/* Menu Items */}
        <div className="pt-20 pl-4 text-lg md:text-xl text-[rgb(216,226,220)]">
          {menuItems &&
            menuItems.map((menuItem, key) => {
              const href = resolveHref(menuItem?._type, menuItem?.slug)
              if (!href) return null

              const isBold =
                ['Projects', 'Info', 'About', 'Biographies', 'Publications'].includes(
                  menuItem.title ?? ''
                )

              const startYear = menuItem?.duration?.start
                ? new Date(menuItem.duration.start).getFullYear()
                : null

              const title = language === 'en' ? menuItem.title : menuItem.title_pt
              return (
                <Link
                  key={key}
                  href={href}
                  className={`hover:bg-[#6a6a6a]/20 block p-1 ${
                    isBold ? 'font-bold' : 'font-light'
                  }`}
                  onClick={toggleMenu}
                >
                  {title}
                  {startYear && <span className="text-xs text-white"> {startYear}</span>}
                </Link>
              )
            })}
        </div>
      </div>

      {/* Bottom Navigation (Filtered for Bold Items) */}
      {!isHomepage && (
      <div className="fixed bottom-0 left-0 w-full bg-[#d8e2dc] py-2 flex justify-around ">
        {bottomNavItems.map((item, index) => {
          const href = resolveHref(item?._type, item?.slug)
          if (!href) return null

          return (
            <Link key={index} href={href} className="text-[#2a687d] font-medium text-sm">
              {language === 'en' ? item.title : item.title_pt}
            </Link>
          )
        })}
      </div>
      )}
    </nav>
  )
}

export default MobileNavMenu
