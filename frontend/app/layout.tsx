import type { Metadata } from 'next'
import { LayoutContent } from '@/components/layout-content'
import { ThemeProvider } from '@/components/theme-provider'
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutContent>
            {children}
          </LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  )
}
