"use client"

import { useState } from "react"
import { BadgeCheck, Bell, Calendar, ChevronRight, Clock, Flame, Menu, Shield, Star, Trophy, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ActiveChallenges } from "@/components/challenges/active-challenges"
import { ChallengeCreator } from "@/components/challenges/challenge-creator"
import { FinancialQuests } from "@/components/challenges/financial-quests"
import { ProgressTree } from "@/components/challenges/progress-tree"
import { SidebarNav } from "@/components/sidebar-nav"

export function ChallengesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar for desktop
      <SidebarNav currentPath="/challenges" isMobile={false} />

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
          <SidebarNav currentPath="/challenges" isMobile={true} />
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
            <Shield className="h-6 w-6 text-orange-500" />
            <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">AARTHIQ</span>
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

        {/* Challenges & Quests content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Challenges & Quests</h1>
            <p className="text-slate-500">Transform your financial habits through engaging goals and achievements</p>
          </div>

          {/* User Stats Summary */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500">
                    <Flame className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-orange-600">Current Streak</p>
                    <p className="text-xl font-bold text-orange-800">7 Days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">Challenges Completed</p>
                    <p className="text-xl font-bold text-blue-800">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                    <BadgeCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-green-600">Badges Earned</p>
                    <p className="text-xl font-bold text-green-800">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-600">Current Level</p>
                    <p className="text-xl font-bold text-purple-800">Level 5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Money Minute */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">Daily Money Minute</h3>
                    <p className="text-sm text-blue-600">
                      Take 60 seconds to review your finances and earn a daily streak
                    </p>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Start Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="active-challenges" className="mt-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="active-challenges">Active Challenges</TabsTrigger>
              <TabsTrigger value="quests">Financial Quests</TabsTrigger>
              <TabsTrigger value="progress-tree">Progress Tree</TabsTrigger>
              <TabsTrigger value="create-challenge">Create Challenge</TabsTrigger>
            </TabsList>
            <TabsContent value="active-challenges" className="mt-6">
              <ActiveChallenges />
            </TabsContent>
            <TabsContent value="quests" className="mt-6">
              <FinancialQuests />
            </TabsContent>
            <TabsContent value="progress-tree" className="mt-6">
              <ProgressTree />
            </TabsContent>
            <TabsContent value="create-challenge" className="mt-6">
              <ChallengeCreator />
            </TabsContent>
          </Tabs>

          {/* Challenge Calendar */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Challenge Calendar</h2>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                View Full Calendar
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
                      {day}
                    </div>
                  ))}
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1
                    const hasChallenge = [3, 7, 12, 15, 20, 25, 28].includes(day)
                    const isToday = day === 28
                    return (
                      <div
                        key={day}
                        className={`rounded-md p-2 text-center ${
                          isToday
                            ? "bg-blue-100 text-blue-800 font-medium border border-blue-300"
                            : hasChallenge
                              ? "bg-orange-50 text-orange-800"
                              : "bg-white"
                        }`}
                      >
                        <div className="text-sm">{day}</div>
                        {hasChallenge && <div className="mt-1 h-1.5 w-1.5 mx-auto rounded-full bg-orange-500"></div>}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
