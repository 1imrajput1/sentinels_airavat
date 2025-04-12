"use client"

import Link from "next/link"
import { LayoutDashboard, MessageSquare, Settings, Shield, Trophy, Users, Wallet } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

interface SidebarNavProps {
  currentPath: string
  isMobile: boolean
}

export function SidebarNav({ currentPath, isMobile }: SidebarNavProps) {
  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      title: "Transactions",
      icon: Wallet,
      href: "/transactions",
    },
    {
      title: "Challenges & Quests",
      icon: Trophy,
      href: "/challenges",
    },
    {
      title: "Community Center",
      icon: Users,
      href: "/community",
    },
    {
      title: "Insights & Coach",
      icon: MessageSquare,
      href: "/insights",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  if (isMobile) {
    return (
      <nav className="flex-1 overflow-auto py-4">
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Rahul Agarwal</p>
              <p className="text-xs text-slate-500">Premium Member</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md border border-slate-200 bg-white py-2 pl-8 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="space-y-1 px-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={`w-full justify-start gap-2 ${currentPath === item.href ? "text-blue-600" : "text-slate-600"}`}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </nav>
    )
  }

  return (
    <aside className="hidden w-64 flex-col bg-white border-r border-slate-200 md:flex">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2 font-semibold text-xl">
          <Shield className="h-6 w-6 text-orange-500" />
          <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">AARTHIQ</span>
        </div>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Rahul Agarwal</p>
              <p className="text-xs text-slate-500">Premium Member</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md border border-slate-200 bg-white py-2 pl-8 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="space-y-1 px-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={`w-full justify-start gap-2 ${currentPath === item.href ? "text-blue-600" : "text-slate-600"}`}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
        <div className="mt-6 px-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-blue-600">Chat with Rumi, your AI financial assistant</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with Rumi
              </Button>
            </CardFooter>
          </Card>
        </div>
      </nav>
    </aside>
  )
}
