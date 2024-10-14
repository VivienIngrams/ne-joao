import './globals.css'

import { Arsenal, Barlow } from "next/font/google";

const arsenal = Arsenal({  variable: '--font-family-arsenal',  weight: [   "400",  "700" ], style: ["normal", "italic"], subsets: ["latin"],  });
const barlow = Barlow({  variable: '--font-family-barlow',  weight: [ "100", "200",  "400",  "700" ], style: ["normal", "italic"], subsets: ["latin"],  });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${arsenal.variable}`}>
      <body className={`h-full bg-neutral-900 `}>{children}</body>
    </html>
  )
}