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
    <nav className="fixed top-0  z-50 md:min-h-screen font-barlowC md:bg-gradient-to-1 from-black/80 via-black/70 to-transparent backdrop-blur md:px-6">
      <div className="hidden md:flex md:w-full py-4 justify-start  ">
        <Link href="/" className=" font-barlowC font-thin text-5xl text-green-100">
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
                className={`hidden md:block font-light text-lg hover:text-green-100 md:text-xl `}
                href={href}
              >
                {menuItem.title}
              </Link>
            )
          })}
      </div>
    </nav>
  )
}
