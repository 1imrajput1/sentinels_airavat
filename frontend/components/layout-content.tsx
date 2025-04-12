"use client";

import { Navigation } from '@/components/navigation'
import { SidebarNav } from '@/components/sidebar-nav'
import { usePathname } from 'next/navigation'
import AuthenticatedChatbot from '@/components/AuthenticatedChatbot'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isPublicPath = ['/', '/auth/login', '/auth/signup'].includes(pathname)

  return (
    <body className={!isPublicPath ? 'flex h-screen overflow-hidden' : ''}>
      {isPublicPath ? (
        <>
          <Navigation />
          <main className="pt-20">
            {children}
          </main>
        </>
      ) : (
        <>
          <SidebarNav currentPath={pathname} isMobile={isMobile} />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          <AuthenticatedChatbot />
        </>
      )}
    </body>
  )
} 