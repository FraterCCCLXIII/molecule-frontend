import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import AgeVerificationModal from "@modules/common/components/age-verification-modal"
import { chakraPetch, gildaDisplay, spaceMono } from "@lib/fonts"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${chakraPetch.variable} ${gildaDisplay.variable} ${spaceMono.variable}`}>
      <body>
        <main className="relative">{props.children}</main>
        <AgeVerificationModal />
      </body>
    </html>
  )
}
