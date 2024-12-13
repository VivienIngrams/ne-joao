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

  return (
    <nav className="fixed top-0 left-0 w-full z-20  md:hidden">
      <div className= {`fixed top-0 left-0 z-10 flex w-full px-16 mx-auto  py-4 justify-center  ${!isHomepage ? 'h-[80px] bg-white' : 'bg-gradient-to-r from-white to-transparent h-[71px] '} `}>
        {!isHomepage && (
          <Link
            href="/"
            className="font-barlowC font-thin text-4xl text-red-700 -mt-2 px-2 rounded-tl-md rounded-br-md border-[1px] border-red-700"
          >
            LabIO
          </Link>
        )}
      </div>
      <div className="z-20 flex items-start justify-start text-lg md:text-xl">
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-start justify-start z-40"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="block h-4 w-4 ml-[25px] my-[25px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 5L5 19M5 5L19 19"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="block h-5 w-5 ml-4 mt-[23px] z-100"
                fill="none"
              >
                <path
                  d="M12 8h15M5 16h22M5 24h22M5 11l3-3-3-3"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`${isOpen ? 'block' : 'hidden'} font-arsenal z-50 bg-gradient-to-r from-white to-transparent backdrop-blur`}
        id="mobile-menu"
      >
          <button
            onClick={toggleLanguage}
            className="fixed top-4 right-4 p-1 text-xs text-red-700 z-55 bg-white/70 rounded-tl-md rounded-br-md border-[1px] border-red-700 "
          >
            {language === 'en' ? 'PT' : 'EN'}
          </button>{' '}
        <div className="min-h-screen w-screen pt-4 pl-4 font-arsenal text-lg active:text-red-700 md:text-xl text-black">
          {/* Language Switcher Button */}
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

              const startDate = menuItem?.duration?.start
              const startYear = startDate
                ? new Date(startDate).getFullYear()
                : null

              // Conditionally render title based on the selected language
              const title =
                language === 'en' ? menuItem.title : menuItem.title_pt

              return (
                <Link
                  key={key}
                  href={href}
                  className={`hover:bg-red-700/20 block p-1 ${
                    isBold ? 'font-bold' : 'font-light'
                  }`}
                  onClick={toggleMenu}
                >
                  {title}
                  {startYear && (
                    <span className="text-xs text-gray-400"> {startYear}</span>
                  )}
                </Link>
              )
            })}
        </div>
      </div>
    </nav>
  )
}

export default MobileNavMenu
