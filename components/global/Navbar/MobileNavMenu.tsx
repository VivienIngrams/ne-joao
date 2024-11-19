'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem } from '@/types'

interface MobileNavMenuProps {
  menuItems: MenuItem[]
}

const MobileNavMenu = ({ menuItems }: MobileNavMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const path = usePathname()
  const isHomepage = path === '/'

  const color = isHomepage ? 'white' : 'black'
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-20 h-[80px] md:hidden"> {/* Add a background color */}
<div
    className={`fixed top-0 left-0 z-10 flex w-full px-16 mx-auto h-[80px] py-4 justify-center 
      ${isHomepage ? 'bg-transparent' : 'bg-gradient-to-b from-white/80 to-transparent backdrop-blur'}`}
  >      {!isHomepage && ( // Conditionally render the LabIO link
        <Link href="/" className="font-barlowC font-thin text-4xl text-red-700">
          LabIO
        </Link>
      )}
      </div>
      <div className="z-20 flex items-start justify-start text-lg md:text-xl">
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-start justify-start z-20"
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
                  stroke="#000000"
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
                className="block h-5 w-5 ml-4 mt-[23px]"
                fill="none"
              >
                <path
                  d="M12 8h15M5 16h22M5 24h22M5 11l3-3-3-3"
                  stroke={color}
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
        className={`${isOpen ? 'block' : 'hidden'} font-arsenal bg-gradient-to-r from-white/80 to-transparent backdrop-blur`}
        id="mobile-menu"
      >
        <div className="min-h-screen w-screen pt-4 pl-4 font-arsenal text-lg active:text-red-700 md:text-xl text-black">
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
                  className="hover:bg-red-700/20 block p-2 text-base"
                  onClick={toggleMenu}
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
