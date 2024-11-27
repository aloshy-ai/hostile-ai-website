import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import '@/app/globals.css'

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Warning Landing',
  description: 'Urgent public advisory about an experimental AI system',
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

