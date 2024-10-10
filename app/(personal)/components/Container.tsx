'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

import NavMenu from './NavMenu'

export default function Container({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isHomePage = path === '/'
  const isStudioPage = path.startsWith('/studio') // Check if the path starts with /studio

  if (isStudioPage) {
    // If it's the /studio path, return only the children without the container
    return <>{children}</>
  }

  return (
    <div className="w-screen h-full font-arsenal">
      <div className={`flex flex-col items-center justify-center pt-8  `}>
        <Link href="/" className="hover:bg-white/10">
          <h1 className="uppercase md:text-5xl pb-4">Né Barros</h1>
          <h1 className="uppercase md:text-5xl pb-4">João Martinho Moura</h1>
          <h2 className="text-white text-xl md:text-2xl font-light text-center">
            Artistic Collaborations
          </h2>
        </Link>
      </div>

      <main className="w-full font-arsenal ">{children}</main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-gradient-to-b from-transparent via-neutral-900  to-black px-4 md:pt-16 pb-4 flex items-center justify-between">
        <div>
          <p className="hidden md:flex  text-[11px]  xs:tracking-normal  z-50 leading-loose w-40 pt-8">
            Website by Vivien Ingrams
          </p>
        </div>
        <NavMenu />
        <div className="flex flex-col items-end gap-y-2">
          <div className="flex gap-x-2 ">
            <Socials />
          </div>
          <span className=" text-sm  text-white">info@labio.com</span>
        </div>
      </footer>
    </div>
  )
}

interface Social {
  label: string
  Icon: React.ComponentType<{ className: string }>
  href: string
}

const socialLinks: Social[] = [
  {
    label: 'Instagram',
    Icon: FaInstagram,
    href: 'https://instagram.com/',
  },
  {
    label: 'Facebook',
    Icon: FaFacebook,
    href: 'https://facebook.com/',
  },
]

function Socials() {
  return (
    <>
      {socialLinks.map(({ label, Icon, href }) => (
        <Link
          aria-label={label}
          className="-m-1.5 rounded-md p-1.5 transition-all duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500  sm:-m-3 sm:p-3"
          href={href}
          key={label}
        >
          <Icon className="h-5 w-5 align-baseline sm:h-6 sm:w-6" />
        </Link>
      ))}
    </>
  )
}
