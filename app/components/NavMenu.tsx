'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const path = usePathname()
  const isHomePage = path === '/'

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="w-full z-50 mx-auto px-4 sm:px-6 lg:px-8 font-arsenal uppercase">
      <div
        className={`flex items-start justify-center  text-lg md:text-xl pt-4`}
      >
        <div className="flex items-center">
          <div className="hidden md:block">
            <div className=" flex items-baseline space-x-4">
              <Link
                href="/posts"
                className="hover:bg-white/10 px-3 py-2  text-md  "
              >
                Oeuvres
              </Link>
              <Link
                href="/livres"
                className="hover:bg-white/10 px-3 py-2  text-md  "
              >
                Livres
              </Link>
              <Link
                href="/expositions"
                className="hover:bg-white/10 px-3 py-2  text-md  "
              >
                Expositions
              </Link>
              <Link
                href="/biography"
                className="hover:bg-white/10 px-3 py-2  text-md  "
              >
                Biography
              </Link>
              <Link
                href="/info"
                className="hover:bg-white/10 px-3 py-2  text-md  "
              >
                Info
              </Link>
            </div>
          </div>
        </div>
        <div className="-mr-2 flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 "
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="block h-6 w-6"
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
                    d="M19 5L4.99998 19M5.00001 5L19 19"
                    stroke="#5b2e16"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{' '}
                </g>
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
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
                  <g id="Menu / Menu_Duo_LG">
                    {' '}
                    <path
                      id="Vector"
                      d="M3 15H21M3 9H21"
                      stroke="#5b2e16"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                  </g>{' '}
                </g>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/posts"
            className="hover:bg-white/10 block px-3 py-2  text-base  "
          >
            Oeuvres
          </Link>
          <Link
            href="/expositions"
            className="hover:bg-white/10 block px-3 py-2  text-base  "
          >
            Expositions
          </Link>
          <Link
            href="/biography"
            className="hover:bg-white/10 block px-3 py-2  text-base  "
          >
            Biography
          </Link>
          <Link
            href="/info"
            className="hover:bg-white/10 block px-3 py-2  text-base  "
          >
            Info
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavMenu