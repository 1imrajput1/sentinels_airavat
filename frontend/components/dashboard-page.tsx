"use client"

import { useState } from "react"
import { Bell, Menu, Shield, X, FlameIcon as Fire, BadgeCheck, TrendingUp } from "lucide-react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { FinancialSnapshot } from "@/components/financial-snapshot"
import { MoneyMoodMeter } from "@/components/money-mood-meter"
import { PredictiveSpending } from "@/components/predictive-spending"
import { QuickActions } from "@/components/quick-actions"
import { RecentTransactions } from "@/components/recent-transactions"
import { UpcomingBills } from "@/components/upcoming-bills"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PiggyBank } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar for desktop
      <SidebarNav currentPath="/" isMobile={false} />

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2 font-semibold text-xl">
              <Shield className="h-6 w-6 text-orange-500" />
              <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                AARTHIQ
              </span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SidebarNav currentPath="/" isMobile={true} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex items-center gap-2 font-semibold text-xl md:hidden">
            <Image
              src="https://i.ibb.co/HLWv0pQk/aarthiq-graphic-logo-withoutbg.png"
              alt="AARTHIQ Graphic Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <Image
              src="https://i.ibb.co/WWcGPnM7/aarthiq-text-logo-removebg.png"
              alt="AARTHIQ Text Logo"
              width={100}
              height={32}
              className="h-8 w-auto"
            />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-medium text-white">
                3
              </span>
            </Button>
            <Avatar className="h-8 w-8 md:hidden">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, Rahul!</h1>
            <p className="text-slate-500">Here's your financial snapshot for today.</p>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Recent Achievements</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium text-orange-700">Savings Streak</CardTitle>
                    <Badge className="bg-orange-500">New</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Fire className="h-8 w-8 text-orange-500" />
                    <div>
                      <p className="font-semibold text-orange-800">7 Days</p>
                      <p className="text-xs text-orange-600">You've saved money for 7 consecutive days!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-blue-700">Budget Master</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-semibold text-blue-800">Level 2</p>
                      <p className="text-xs text-blue-600">Stayed under budget for 2 categories this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-green-700">Smart Saver</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="font-semibold text-green-800">₹5,000</p>
                      <p className="text-xs text-green-600">Saved 20% more than last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Money Mood Meter */}
          <MoneyMoodMeter />

          {/* Financial Snapshot */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FinancialSnapshot />
            <PredictiveSpending />
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Emergency Fund</CardTitle>
                <CardDescription>Your financial safety net</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">₹75,000 of ₹3,00,000</span>
                    <span className="text-sm font-medium text-green-600">25%</span>
                  </div>
                  <Progress value={25} className="h-2 bg-slate-200" />
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  You're making good progress! Keep adding ₹10,000 monthly to reach your goal by December.
                </p>
                <Button variant="outline" className="w-full">
                  <PiggyBank className="mr-2 h-4 w-4" />
                  Add Funds
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="quick-actions" className="mt-8">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
              <TabsTrigger value="upcoming-bills">Upcoming Bills</TabsTrigger>
              <TabsTrigger value="recent-transactions">Recent Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="quick-actions" className="mt-4">
              <QuickActions />
            </TabsContent>
            <TabsContent value="upcoming-bills" className="mt-4">
              <UpcomingBills />
            </TabsContent>
            <TabsContent value="recent-transactions" className="mt-4">
              <RecentTransactions />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
