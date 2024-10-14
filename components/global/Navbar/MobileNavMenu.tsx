'use client'

import Link from 'next/link'
import { useState } from 'react'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem } from '@/types'

interface MobileNavMenuProps {
  menuItems: MenuItem[]
}

const MobileNavMenu = ({ menuItems }: MobileNavMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="absolute top-0 z-15 mx-auto font-arsenal uppercase  backdrop-blurred bg-black/90 ">
      <div className="flex items-start justify-start text-lg md:text-xl">
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-start justify-start"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              // Close Icon (X)
              <svg
                className="block h-4 w-4 ml-[25px] my-[25px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 5L5 19M5 5L19 19"
                  stroke="#ccc"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              // Hamburger Icon (Three lines)
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="block h-5 w-5 ml-4 mt-[23px] "
                fill="none"
              >
                <path
                  d="M12 8h15M5 16h22M5 24h22M5 11l3-3-3-3"
                  stroke="#eee"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden `} id="mobile-menu">
        <div className="min-h-screen w-screen pt-4 pl-4 font-arsenal text-lg hover:text-blue-200 md:text-xl text-white">
          {menuItems &&
            menuItems.map((menuItem, key) => {
              const href = resolveHref(menuItem?._type, menuItem?.slug)
              if (!href) {
                return null
              }
              return (
                <Link
                  key={key}
                  href={href}
                  className="hover:bg-white/10 block p-2 text-base"
                >
                  {menuItem.title}
                </Link>
              )
            })}
        </div>
      </div>
    </nav>
  )
}

export default MobileNavMenu
