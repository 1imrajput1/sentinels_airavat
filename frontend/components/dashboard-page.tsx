"use client"

import { useState } from "react"
import { Bell, Menu, Shield, X, FlameIcon as Fire, BadgeCheck, TrendingUp, ShoppingBag, Coffee, Plane, Tv, PiggyBank, Sun, Moon, AlertTriangle, HelpCircle } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { FinancialSnapshot } from "@/components/financial-snapshot"
import { MoneyMoodMeter } from "@/components/money-mood-meter"
import { PredictiveSpending } from "@/components/predictive-spending"
import { QuickActions } from "@/components/quick-actions"
import { RecentTransactions } from "@/components/recent-transactions"
import { UpcomingBills } from "@/components/upcoming-bills"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const notifications = [
    {
      id: 1,
      type: 'alert',
      icon: AlertTriangle,
      title: 'Unusual Spending Alert',
      message: '₹2999 spent — unusually high',
      time: '2 minutes ago',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-100'
    },
    {
      id: 2,
      type: 'help',
      icon: HelpCircle,
      title: 'Parent Assistance Request',
      message: 'Help alert! Your parent requested assistance.',
      time: '5 minutes ago',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100'
    }
  ]

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar for desktop 
      <SidebarNav currentPath="/" isMobile={false} />

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-background">
          <div className="flex h-14 items-center border-b border-border px-4">
            <div className="flex items-center gap-2 font-semibold text-xl">
              <Shield className="h-6 w-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background px-4 sm:px-6">
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
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-primary" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {notifications.length}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <h3 className="font-semibold">Notifications</h3>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                    Mark all as read
                  </Button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notification) => {
                    const Icon = notification.icon
                    return (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-3 p-4 border-b border-border ${notification.bgColor} ${notification.borderColor} hover:bg-opacity-80 transition-colors duration-200`}
                      >
                        <div className={`mt-1 rounded-full p-2 ${notification.iconBg} ${notification.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${notification.color}`}>{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </PopoverContent>
            </Popover>
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
            <p className="text-muted-foreground">Here's your financial snapshot for today.</p>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Recent Achievements</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium text-primary">Savings Streak</CardTitle>
                    <Badge className="bg-primary text-primary-foreground">New</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Fire className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">7 Days</p>
                      <p className="text-xs text-muted-foreground">You've saved money for 7 consecutive days!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-primary">Budget Master</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Level 2</p>
                      <p className="text-xs text-muted-foreground">Stayed under budget for 2 categories this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-primary">Smart Saver</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">₹5,000</p>
                      <p className="text-xs text-muted-foreground">Saved 20% more than last month</p>
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
            <Card className="overflow-hidden bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Spending Categories</CardTitle>
                <CardDescription>Your top spending areas this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="group flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <img src="/shopping.png" alt="Shopping" className="h-12 w-12" />
                    </div>
                    <p className="mt-2 font-medium text-foreground">Shopping</p>
                    <p className="text-sm font-semibold text-primary">₹3,500</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="group flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <img src="/food.png" alt="Food" className="h-12 w-12" />
                    </div>
                    <p className="mt-2 font-medium text-foreground">Food</p>
                    <p className="text-sm font-semibold text-primary">₹4,800</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="group flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <img src="/travel.png" alt="Travel" className="h-12 w-12" />
                    </div>
                    <p className="mt-2 font-medium text-foreground">Travel</p>
                    <p className="text-sm font-semibold text-primary">₹2,200</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="group flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <img src="/netflix.png" alt="Netflix" className="h-12 w-12" />
                    </div>
                    <p className="mt-2 font-medium text-foreground">Subscriptions</p>
                    <p className="text-sm font-semibold text-primary">₹1,500</p>
                  </div>
                </div>
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
      </div>
    </div>
  )
}
