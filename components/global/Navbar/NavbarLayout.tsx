import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  return (
    <div className="fixed top-0 bottom-0 z-10 min-h-screen flex flex-col items-center bg-black px-4 py-4 backdrop-blur md:px-16 md:py-6 ">
      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`font-arsenal text-lg hover:text-blue-200 md:text-xl ${
                menuItem?._type === 'home'
                  ? 'font-extrabold text-gray-500'
                  : 'text-white'
              }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          )
        })}
    </div>
  )
}
