import './globals.css'

import { Arsenal, Barlow, Barlow_Condensed } from "next/font/google";

const arsenal = Arsenal({  variable: '--font-family-arsenal',  weight: [   "400",  "700" ], style: ["normal", "italic"], subsets: ["latin"],  });
const barlow = Barlow({  variable: '--font-family-barlow',  weight: [ "100", "200",  "400",  "700" ], style: ["normal", "italic"], subsets: ["latin"],  });
const barlowC = Barlow_Condensed({  variable: '--font-family-barlowC',  weight: [ "100", "200",  "400",  "700" ], style: ["normal", "italic"], subsets: ["latin"],  });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowC.variable} ${arsenal.variable} min-h- bg-black`}>
      <body className={`h-full  `}>{children}</body>
    </html>
  )
}