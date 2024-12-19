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
      <div
        className={`fixed top-0 left-0 z-10  flex w-full px-16 mx-auto  py-2 pb-5 justify-center  h-[90px]  ${!isHomepage ? 'bg-gradient-to-b from-[#dce3e0] via-[rgb(220,227,224)]  to-[rgba(220,227,224,0.1)]   ' : ''} `}
      >
        {!isHomepage && (
          <Link
            href="/"
            className="font-barlowC font-thin text-4xl mb-1 px-2 rounded-tl-md rounded-br-md border-[1px] border-[#919191]"
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
            {!isOpen && (
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="block h-5 w-5 ml-4 mt-[23px] z-100"
                fill="none"
              >
                <path
                  d="M12 8h15M5 16h22M5 24h22M5 11l3-3-3-3"
                  stroke={isHomepage ? '#bfc8c4' : '#000000'} // Conditionally set the stroke color
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
  className={`${
    isOpen ? 'block' : 'hidden'
  } font-arsenal z-50 fixed top-0 left-0 min-h-screen w-screen bg-gradient-to-r from-[rgb(220,227,224)]   to-[rgb(220,227,224,0.2)]   backdrop-blur`}
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
        stroke="#000000" // You can also conditionally set this to white (#ffffff) if needed
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>

  {/* Language Toggle Button */}
  <button
    onClick={toggleLanguage}
    className="fixed top-4 right-4 p-1 text-xs  z-55 bg-[rgba(201,226,215,0.5)] rounded-tl-md rounded-br-md border-[1px] border-[#4c4c4c]"
  >
    {language === 'en' ? 'PT' : 'EN'}
  </button>

  {/* Menu Items */}
  <div className="pt-20 pl-4 text-lg md:text-xl text-black">
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
        const startYear = startDate ? new Date(startDate).getFullYear() : null

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
            {startYear && (
              <span className="text-xs text-gray-600"> {startYear}</span>
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
