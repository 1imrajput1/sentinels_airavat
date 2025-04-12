"use client";

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isAuthenticated, getUserData, logout } from '@/utils/auth'

export function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated()
      setIsLoggedIn(authStatus)
      if (authStatus) {
        setUserData(getUserData())
      }
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setUserData(null)
    router.push('/')
  }

  // Check if current page is landing, login, or signup
  const isAuthPage = pathname === '/' || pathname === '/auth/login' || pathname === '/auth/signup'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Text Logo - Top Left */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="https://i.ibb.co/WWcGPnM7/aarthiq-text-logo-removebg.png"
                alt="AARTHIQ Text Logo"
                width={100}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Right side navigation items */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    isAuthPage 
                      ? 'bg-[#07a6ec] text-white hover:bg-[#0596d3]' 
                      : 'text-gray-600 hover:text-[#07a6ec]'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-[#07a6ec] text-white hover:bg-[#0596d3] px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-600 px-4 py-2 text-sm font-medium">
                  Welcome, {userData?.name || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-[#07a6ec] px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 