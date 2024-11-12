'use client'

import Link from 'next/link'
import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'
import MobileNavMenu from './MobileNavMenu'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  const path = usePathname()
  const isHomePage = path === '/'

  return (
    <nav
    className={`fixed top-0 z-50 md:min-h-screen font-barlowC md:px-6 ${
      isHomePage ? 'ml-[100px]' : '' // Add a margin-left of 100px on the homepage
    }`}
  >      <div className="hidden md:flex md:w-full py-4 justify-start">
        <Link href="/" className="font-barlowC font-thin text-5xl text-green-900">
          LabIO
        </Link>
      </div>

      <MobileNavMenu menuItems={menuItems} />

      <div className="md:h-[85vh] flex flex-col items-start justify-center gap-y-2 ">
        {/* Make the Home and Info items bolder than project items - conditional css */}
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
            const startYear = startDate ? new Date(startDate).getFullYear() : null

            return (
              <Link
                key={key}
                className={`hidden md:block ${
                  isBold ? 'font-bold' : 'font-light'
                } text-lg hover:text-green-100 md:text-xl`}
                href={href}
              >
                {menuItem.title}
                {/* Display the year if available */}
                {startYear && (
                  <span className="text-xs text-gray-400">  {startYear}</span>
                )}
              </Link>
            )
          })}
      </div>
    </nav>
  )
}
