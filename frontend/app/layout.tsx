import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'AARTHIQ - Your Money? Understood',
  description: 'AARTHIQ is your AI-powered personal finance companion that helps you understand and manage your money better.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  )
}
