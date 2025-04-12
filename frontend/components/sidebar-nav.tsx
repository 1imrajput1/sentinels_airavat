"use client"

import Link from "next/link"
import { Bell, LayoutDashboard, MessageSquare, Settings, Shield, Trophy, Users, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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

  const sidebarContent = (
    <nav className="flex-1 overflow-auto py-4">
      {/* Notifications */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-[#E65525]/20 shadow-sm hover:shadow-[0_0_20px_rgba(230,85,37,0.4)] hover:bg-[#E65525] hover:-translate-y-0.5 hover:border-[#E65525] transition-all duration-200 group">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-[#E65525] group-hover:text-black" />
            <span className="text-sm font-medium text-white group-hover:text-black">Notifications</span>
          </div>
          <span className="px-2.5 py-1 text-xs font-medium bg-[#E65525] text-white rounded-full shadow-sm group-hover:bg-black group-hover:text-white">3</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Manage Section */}
        <div className="px-4">
          <h2 className="mb-3 px-2 text-sm font-medium tracking-tight text-white/80 uppercase">Manage</h2>
          <div className="space-y-1.5">
            {navItems.slice(0, 4).map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={`w-full justify-start gap-3 p-3.5 h-auto rounded-xl bg-black/40 border border-[#E65525]/20 shadow-sm hover:shadow-[0_0_20px_rgba(230,85,37,0.4)] hover:bg-[#E65525] hover:-translate-y-0.5 hover:border-[#E65525] transition-all duration-200 group ${
                  currentPath === item.href 
                    ? "bg-[#E65525] text-black ring-1 ring-[#E65525]" 
                    : "text-white hover:text-black"
                }`}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className={`h-5 w-5 ${currentPath === item.href ? "text-black" : "group-hover:text-black"}`} />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="px-4">
          <h2 className="mb-3 px-2 text-sm font-medium tracking-tight text-white/80 uppercase">Support</h2>
          <div className="space-y-1.5">
            {navItems.slice(4).map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={`w-full justify-start gap-3 p-3.5 h-auto rounded-xl bg-black/40 border border-[#E65525]/20 shadow-sm hover:shadow-[0_0_20px_rgba(230,85,37,0.4)] hover:bg-[#E65525] hover:-translate-y-0.5 hover:border-[#E65525] transition-all duration-200 group ${
                  currentPath === item.href 
                    ? "bg-[#E65525] text-black ring-1 ring-[#E65525]" 
                    : "text-white hover:text-black"
                }`}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className={`h-5 w-5 ${currentPath === item.href ? "text-black" : "group-hover:text-black"}`} />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Help Center Card */}
      <div className="mt-6 px-4">
        <Card className="bg-black/40 border border-[#E65525]/20 rounded-xl overflow-hidden shadow-sm hover:shadow-[0_0_20px_rgba(230,85,37,0.4)] hover:bg-[#E65525] hover:-translate-y-0.5 hover:border-[#E65525] transition-all duration-200 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white group-hover:text-black">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-xs text-white/70 group-hover:text-black/70">Chat with Rumi, your AI financial assistant</p>
          </CardContent>
          <CardFooter>
            <Button 
              size="sm" 
              className="w-full bg-[#E65525] text-white rounded-lg font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(230,85,37,0.6)] hover:bg-black hover:text-white group-hover:bg-black group-hover:text-white"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with Rumi
            </Button>
          </CardFooter>
        </Card>
      </div>
    </nav>
  )

  if (isMobile) {
    return sidebarContent
  }

  return (
    <aside className="hidden w-64 flex-col bg-black md:flex">
      <div className="flex h-14 items-center border-b border-[#E65525]/10 px-4">
        <div className="flex items-center gap-2 font-semibold text-xl text-white">
          <Shield className="h-6 w-6" />
          <span>AARTHIQ</span>
        </div>
      </div>
      {sidebarContent}
    </aside>
  )
}
