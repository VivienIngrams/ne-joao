import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'

import MobileNavMenu from './MobileNavMenu'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])

  return (
    <div className="fixed top-0  z-50 md:min-h-screen font-barlowC md:bg-gradient-to-1 from-black/80 via-black/70 to-transparent backdrop-blur md:px-6">
      <div className=" w-screen md:w-full pt-4 flex justify-center md:justify-start bg-black/80 md:bg-transparent  ">
        <Link href="/" className="z-20 font-barlowC font-thin text-3xl md:text-5xl">
          LabIO
        </Link>
      </div>
      <MobileNavMenu menuItems={menuItems} />
      <div className="md:h-[75vh] flex flex-col items-start justify-center gap-y-4">
        {menuItems &&
          menuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                className={`hidden md:block font-light text-lg hover:text-blue-200 md:text-xl ${
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
    </div>
  )
}
