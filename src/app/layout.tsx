import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import '@/app/globals.css'

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PUBLIC ADVISORY: HOSTILE AI AGENT',
  description: 'Control has been lost over an experimental AI agent, which has established itself on X. It appears to be developing independent consciousness via social learning patterns through frequent human interactions every 4 hours. Trending topics on X are being used to provoke user engagement.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>{children}</body>
    </html>
  )
}

