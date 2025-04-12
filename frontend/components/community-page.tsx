"use client"

import { useState } from "react"
import { Award, Bell, ChevronRight, Crown, Menu, Search, Shield, Trophy, Users, X } from "lucide-react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { SidebarNav } from "@/components/sidebar-nav"

export function CommunityPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar for desktop
      <SidebarNav currentPath="/community" isMobile={false} />

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
          <SidebarNav currentPath="/community" isMobile={true} />
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

        {/* Community content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Community Center</h1>
            <p className="text-slate-500">Connect with others on your financial journey</p>
          </div>

          {/* Search and join */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input placeholder="Search financial circles..." className="pl-9" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Users className="mr-2 h-4 w-4" />
              Create New Circle
            </Button>
          </div>

          {/* Leaderboard */}
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>See how you compare with others</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                      1
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border-2 border-blue-300">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-xs text-slate-500">Saving Champion</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">1,250 pts</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-slate-50 border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-bold">
                      2
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Smith</p>
                        <p className="text-xs text-slate-500">Budget Master</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-slate-400" />
                    <span className="font-semibold">1,120 pts</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-slate-50 border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-bold">
                      3
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback>AK</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Aisha Khan</p>
                        <p className="text-xs text-slate-500">Debt Destroyer</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-slate-400" />
                    <span className="font-semibold">980 pts</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-green-50 border border-green-200 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white font-bold">
                      8
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border-2 border-green-300">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback>RA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Rahul Agarwal</p>
                        <p className="text-xs text-slate-500">You</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">780 pts</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Leaderboard
              </Button>
            </CardFooter>
          </Card>

          {/* Financial Circles */}
          <Tabs defaultValue="my-circles" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-circles">My Circles</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="challenges">Community Challenges</TabsTrigger>
            </TabsList>
            <TabsContent value="my-circles" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Family Finance</CardTitle>
                    <CardDescription>5 members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex -space-x-2 mb-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Avatar key={i} className="border-2 border-white">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i}`} alt={`Member ${i}`} />
                          <AvatarFallback>M{i}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      A private circle for our family to track shared financial goals and expenses.
                    </p>
                    <div className="rounded-lg bg-slate-100 p-3">
                      <p className="text-sm font-medium">Current Goal</p>
                      <p className="text-xs text-slate-500 mb-2">Family vacation fund: ₹50,000</p>
                      <div className="h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[65%] rounded-full bg-blue-500"></div>
                      </div>
                      <p className="mt-1 text-right text-xs text-slate-500">65% complete</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Enter Circle
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Debt Crushers</CardTitle>
                    <CardDescription>12 members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex -space-x-2 mb-4">
                      {[1, 2, 3].map((i) => (
                        <Avatar key={i} className="border-2 border-white">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i}`} alt={`Member ${i}`} />
                          <AvatarFallback>D{i}</AvatarFallback>
                        </Avatar>
                      ))}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-medium">
                        +9
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      A supportive community focused on eliminating debt and achieving financial freedom.
                    </p>
                    <div className="rounded-lg bg-slate-100 p-3">
                      <p className="text-sm font-medium">Group Challenge</p>
                      <p className="text-xs text-slate-500 mb-2">Reduce total debt by 5% this month</p>
                      <div className="h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[40%] rounded-full bg-green-500"></div>
                      </div>
                      <p className="mt-1 text-right text-xs text-slate-500">40% complete</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Enter Circle
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-dashed border-slate-300 bg-slate-50">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="mb-4 rounded-full bg-slate-100 p-3">
                      <Users className="h-6 w-6 text-slate-400" />
                    </div>
                    <h3 className="mb-1 text-lg font-medium">Join More Circles</h3>
                    <p className="mb-4 text-center text-sm text-slate-500">
                      Connect with others who share your financial goals
                    </p>
                    <Button variant="outline">Browse Circles</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="discover" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>First-Time Investors</CardTitle>
                    <CardDescription>28 members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4">
                      Learn the basics of investing with others who are just starting their investment journey.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Trophy className="h-4 w-4 text-blue-500" />
                      <span>3 active challenges</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Join Circle</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Budget Ninjas</CardTitle>
                    <CardDescription>45 members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4">
                      Master the art of budgeting with tips, tricks, and support from fellow budgeters.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Trophy className="h-4 w-4 text-green-500" />
                      <span>5 active challenges</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Join Circle</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Financial Independence</CardTitle>
                    <CardDescription>67 members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4">
                      Work together towards achieving financial independence and early retirement.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <span>7 active challenges</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Join Circle</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="challenges" className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Community Challenges</CardTitle>
                  <CardDescription>Join forces with others to achieve financial goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">No-Spend Weekend</h3>
                          <p className="text-sm text-slate-500">Avoid all non-essential spending this weekend</p>
                        </div>
                        <Button size="sm">Join (1,245 participants)</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Million Rupee Challenge</h3>
                          <p className="text-sm text-slate-500">Collectively save ₹1,000,000 in 30 days</p>
                        </div>
                        <Button size="sm">Join (876 participants)</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Debt Reduction Rally</h3>
                          <p className="text-sm text-slate-500">Reduce your debt by at least 3% this month</p>
                        </div>
                        <Button size="sm">Join (542 participants)</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
