"use client"

import { useState, useEffect } from "react"
import { Award, Bell, ChevronRight, Copy, Menu, Search, Shield, Share2, Users, X } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SidebarNav } from "@/components/sidebar-nav"
import { Group, createGroup, getMyGroups, joinGroup, searchGroups, getGroup, contributeToGroup, leaveGroup, deleteGroup } from "@/utils/groups"

export function CommunityPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [myGroups, setMyGroups] = useState<Group[]>([])
  const [discoveredGroups, setDiscoveredGroups] = useState<Group[]>([])
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [contributionAmount, setContributionAmount] = useState("")
  const [joinGroupKey, setJoinGroupKey] = useState("")
  const [isJoiningGroup, setIsJoiningGroup] = useState(false)
  const [newGroupData, setNewGroupData] = useState({
    group_name: "",
    description: "",
    goal_amount: 0
  })

  useEffect(() => {
    loadMyGroups()
  }, [])

  const loadMyGroups = async () => {
    try {
      const response = await getMyGroups()
      if (response.success && response.groups) {
        setMyGroups(response.groups)
      }
    } catch (error) {
      toast.error("Failed to load your groups")
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    try {
      const response = await searchGroups(searchQuery)
      if (response.success && response.groups) {
        setDiscoveredGroups(response.groups)
      }
    } catch (error) {
      toast.error("Failed to search groups")
    }
  }

  const handleCreateGroup = async () => {
    if (!newGroupData.group_name || !newGroupData.goal_amount) {
      toast.error("Group name and goal amount are required")
      return
    }

    try {
      const response = await createGroup(newGroupData)
      if (response.success) {
        toast.success("Group created successfully!")
        setIsCreatingGroup(false)
        loadMyGroups()
      } else {
        toast.error(response.message || "Failed to create group")
      }
    } catch (error) {
      toast.error("Failed to create group")
    }
  }

  const handleJoinGroup = async (groupKey: string) => {
    try {
      const response = await joinGroup(groupKey)
      if (response.success) {
        toast.success("Joined group successfully!")
        setIsJoiningGroup(false)
        setJoinGroupKey("")
        loadMyGroups()
      } else {
        toast.error(response.message || "Failed to join group")
      }
    } catch (error) {
      toast.error("Failed to join group")
    }
  }

  const handleContribute = async (groupId: number) => {
    const amount = parseFloat(contributionAmount)
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid contribution amount")
      return
    }

    try {
      const response = await contributeToGroup(groupId, amount)
      if (response.success) {
        toast.success("Contribution added successfully!")
        setContributionAmount("")
        if (selectedGroup) {
          const updatedGroup = await getGroup(selectedGroup.group_id)
          if (updatedGroup.success && updatedGroup.group) {
            setSelectedGroup(updatedGroup.group)
          }
        }
        loadMyGroups()
      } else {
        toast.error(response.message || "Failed to add contribution")
      }
    } catch (error) {
      toast.error("Failed to add contribution")
    }
  }

  const handleLeaveGroup = async (groupId: number) => {
    try {
      const response = await leaveGroup(groupId)
      if (response.success) {
        toast.success("Left group successfully!")
        setSelectedGroup(null)
        loadMyGroups()
      } else {
        toast.error(response.message || "Failed to leave group")
      }
    } catch (error) {
      toast.error("Failed to leave group")
    }
  }

  const handleDeleteGroup = async (groupId: number) => {
    try {
      const response = await deleteGroup(groupId)
      if (response.success) {
        toast.success("Group deleted successfully!")
        setSelectedGroup(null)
        loadMyGroups()
      } else {
        toast.error(response.message || "Failed to delete group")
      }
    } catch (error) {
      toast.error("Failed to delete group")
    }
  }

  const copyGroupKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success("Group key copied to clipboard!")
  }

  const shareGroup = (key: string) => {
    const shareUrl = `${window.location.origin}/community?join=${key}`
    navigator.clipboard.writeText(shareUrl)
    toast.success("Group link copied to clipboard!")
  }

  const handleViewDetails = async (group: Group) => {
    try {
      const response = await getGroup(group.group_id)
      if (response.success && response.group) {
        setSelectedGroup(response.group)
      } else {
        toast.error("Failed to load group details")
      }
    } catch (error) {
      toast.error("Failed to load group details")
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar for desktop
      <SidebarNav currentPath="/community" isMobile={false} />

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2 font-semibold text-xl">
              <Shield className="h-6 w-6 text-[#fa6724]" />
              <span className="bg-gradient-to-r from-[#fa6724] to-[#07a6ec] bg-clip-text text-transparent">
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
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#fa6724] text-[10px] font-medium text-white">
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
            <h1 className="text-2xl font-bold tracking-tight text-[#07a6ec]">Community Center</h1>
            <p className="text-slate-500">Connect with others on your financial journey</p>
          </div>

          {/* Search and join */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#07a6ec]" />
              <Input 
                placeholder="Search financial circles..." 
                className="pl-9 border-[#07a6ec]/30 focus:border-[#07a6ec] focus:ring-[#07a6ec]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex gap-2">
              <Dialog open={isJoiningGroup} onOpenChange={setIsJoiningGroup}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-[#fa6724] text-[#fa6724] hover:bg-[#fa6724] hover:text-white">
                    <Image 
                      src="/icons-community/IMG-20250413-WA0001.jpg" 
                      alt="Join" 
                      width={16} 
                      height={16} 
                      className="mr-2 rounded-full"
                    />
                    Join Circle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-[#07a6ec]">Join a Financial Circle</DialogTitle>
                    <CardDescription>Enter the group key to join a circle</CardDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Group Key</label>
                      <Input
                        placeholder="Enter group key"
                        value={joinGroupKey}
                        onChange={(e) => setJoinGroupKey(e.target.value)}
                        className="border-[#07a6ec]/30 focus:border-[#07a6ec] focus:ring-[#07a6ec]"
                      />
                    </div>
                    <Button 
                      className="w-full bg-[#fa6724] hover:bg-[#fa6724]/90" 
                      onClick={() => handleJoinGroup(joinGroupKey)}
                    >
                      Join Circle
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isCreatingGroup} onOpenChange={setIsCreatingGroup}>
                <DialogTrigger asChild>
                  <Button className="bg-[#07a6ec] hover:bg-[#07a6ec]/90">
                    <Image 
                      src="/icons-community/IMG-20250413-WA0002.jpg" 
                      alt="Create" 
                      width={16} 
                      height={16} 
                      className="mr-2 rounded-full"
                    />
                    Create New Circle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-[#07a6ec]">Create New Financial Circle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Circle Name</label>
                      <Input
                        placeholder="Enter circle name"
                        value={newGroupData.group_name}
                        onChange={(e) => setNewGroupData({...newGroupData, group_name: e.target.value})}
                        className="border-[#07a6ec]/30 focus:border-[#07a6ec] focus:ring-[#07a6ec]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        placeholder="Enter description"
                        value={newGroupData.description}
                        onChange={(e) => setNewGroupData({...newGroupData, description: e.target.value})}
                        className="border-[#07a6ec]/30 focus:border-[#07a6ec] focus:ring-[#07a6ec]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Goal Amount (₹)</label>
                      <Input
                        type="number"
                        placeholder="Enter goal amount"
                        value={newGroupData.goal_amount}
                        onChange={(e) => setNewGroupData({...newGroupData, goal_amount: Number(e.target.value)})}
                        className="border-[#07a6ec]/30 focus:border-[#07a6ec] focus:ring-[#07a6ec]"
                      />
                    </div>
                    <Button 
                      className="w-full bg-[#07a6ec] hover:bg-[#07a6ec]/90" 
                      onClick={handleCreateGroup}
                    >
                      Create Circle
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Financial Circles */}
          <Tabs defaultValue="my-circles" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-circles" className="data-[state=active]:bg-[#07a6ec] data-[state=active]:text-white">My Circles</TabsTrigger>
              <TabsTrigger value="discover" className="data-[state=active]:bg-[#fa6724] data-[state=active]:text-white">Discover</TabsTrigger>
              <TabsTrigger value="challenges" className="data-[state=active]:bg-[#e30584] data-[state=active]:text-white">Community Challenges</TabsTrigger>
            </TabsList>
            <TabsContent value="my-circles" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myGroups.map((group) => (
                  <Card key={group.group_id} className="border-[#07a6ec]/20 hover:border-[#07a6ec]/50 transition-all duration-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Image 
                          src="/icons-community/IMG-20250413-WA0003.jpg" 
                          alt="Group" 
                          width={24} 
                          height={24} 
                          className="rounded-full"
                        />
                        <CardTitle className="text-[#07a6ec]">{group.group_name}</CardTitle>
                      </div>
                      <CardDescription>{group.member_count} members</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 mb-4">{group.description}</p>
                      <div className="rounded-lg bg-slate-100 p-3">
                        <p className="text-sm font-medium">Progress</p>
                        <p className="text-xs text-slate-500 mb-2">
                          ₹{group.total_contribution} of ₹{group.goal_amount}
                        </p>
                        <div className="h-2 w-full rounded-full bg-slate-200">
                          <div 
                            className={`h-full rounded-full ${
                              group.goal_complete ? 'bg-green-500' : 'bg-[#07a6ec]'
                            }`}
                            style={{ width: `${group.progress_percentage}%` }}
                          ></div>
                        </div>
                        <p className="mt-1 text-right text-xs text-slate-500">
                          {group.progress_percentage}% complete
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full border-[#07a6ec] text-[#07a6ec] hover:bg-[#07a6ec] hover:text-white"
                        onClick={() => handleViewDetails(group)}
                      >
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                <Card className="border-dashed border-[#07a6ec]/30 bg-slate-50 hover:border-[#07a6ec]/50 transition-all duration-200">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="mb-4 rounded-full bg-[#07a6ec]/10 p-3">
                      <Image 
                        src="/icons-community/IMG-20250413-WA0004.jpg" 
                        alt="Join More" 
                        width={24} 
                        height={24} 
                        className="rounded-full"
                      />
                    </div>
                    <h3 className="mb-1 text-lg font-medium text-[#07a6ec]">Join More Circles</h3>
                    <p className="mb-4 text-center text-sm text-slate-500">
                      Connect with others who share your financial goals
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-[#07a6ec] text-[#07a6ec] hover:bg-[#07a6ec] hover:text-white"
                      onClick={() => document.getElementById('discover-tab')?.click()}
                    >
                      Browse Circles
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="discover" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {discoveredGroups.map((group) => (
                  <Card key={group.group_id} className="border-[#fa6724]/20 hover:border-[#fa6724]/50 transition-all duration-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Image 
                          src="/icons-community/IMG-20250413-WA0005.jpg" 
                          alt="Group" 
                          width={24} 
                          height={24} 
                          className="rounded-full"
                        />
                        <CardTitle className="text-[#fa6724]">{group.group_name}</CardTitle>
                      </div>
                      <CardDescription>{group.member_count} members</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 mb-4">{group.description}</p>
                      <div className="rounded-lg bg-slate-100 p-3">
                        <p className="text-sm font-medium">Progress</p>
                        <p className="text-xs text-slate-500 mb-2">
                          ₹{group.total_contribution} of ₹{group.goal_amount}
                        </p>
                        <div className="h-2 w-full rounded-full bg-slate-200">
                          <div 
                            className={`h-full rounded-full ${
                              group.goal_complete ? 'bg-green-500' : 'bg-[#fa6724]'
                            }`}
                            style={{ width: `${group.progress_percentage}%` }}
                          ></div>
                        </div>
                        <p className="mt-1 text-right text-xs text-slate-500">
                          {group.progress_percentage}% complete
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-[#fa6724] hover:bg-[#fa6724]/90"
                        onClick={() => handleJoinGroup(group.group_key || '')}
                      >
                        Join Circle
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="challenges" className="mt-6">
              <Card className="border-[#e30584]/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Image 
                      src="/icons-community/IMG-20250413-WA0001.jpg" 
                      alt="Challenges" 
                      width={24} 
                      height={24} 
                      className="rounded-full"
                    />
                    <CardTitle className="text-[#e30584]">Community Challenges</CardTitle>
                  </div>
                  <CardDescription>Join forces with others to achieve financial goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-[#07a6ec]/30 p-4 hover:border-[#07a6ec]/50 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-[#07a6ec]">No-Spend Weekend</h3>
                          <p className="text-sm text-slate-500">Avoid all non-essential spending this weekend</p>
                        </div>
                        <Button size="sm" className="bg-[#07a6ec] hover:bg-[#07a6ec]/90">Join (1,245 participants)</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#fa6724]/30 p-4 hover:border-[#fa6724]/50 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-[#fa6724]">Million Rupee Challenge</h3>
                          <p className="text-sm text-slate-500">Collectively save ₹1,000,000 in 30 days</p>
                        </div>
                        <Button size="sm" className="bg-[#fa6724] hover:bg-[#fa6724]/90">Join (876 participants)</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#e30584]/30 p-4 hover:border-[#e30584]/50 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-[#e30584]">Debt Reduction Rally</h3>
                          <p className="text-sm text-slate-500">Reduce your debt by at least 3% this month</p>
                        </div>
                        <Button size="sm" className="bg-[#e30584] hover:bg-[#e30584]/90">Join (542 participants)</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Group Details Dialog */}
        {selectedGroup && (
          <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-[#07a6ec]">{selectedGroup.group_name}</DialogTitle>
                <CardDescription>{selectedGroup.description}</CardDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="rounded-lg bg-slate-100 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium">Progress</p>
                      <p className="text-xs text-slate-500">
                        ₹{selectedGroup.total_contribution} of ₹{selectedGroup.goal_amount}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{selectedGroup.progress_percentage}%</p>
                      <p className="text-xs text-slate-500">Complete</p>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200">
                    <div 
                      className={`h-full rounded-full ${
                        selectedGroup.goal_complete ? 'bg-green-500' : 'bg-[#07a6ec]'
                      }`}
                      style={{ width: `${selectedGroup.progress_percentage}%` }}
                    ></div>
                  </div>
                </div>

                {selectedGroup.members && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Members</h3>
                    <div className="space-y-2">
                      {selectedGroup.members.map((member) => (
                        <div key={member.user_id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt={member.username} />
                              <AvatarFallback>{member.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{member.username}</p>
                              <p className="text-xs text-slate-500">Contribution: ₹{member.contribution}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contribute to Circle</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        className="border-[#07a6ec]/30 focus:border-[#07a6ec] focus:ring-[#07a6ec]"
                      />
                      <Button 
                        onClick={() => handleContribute(selectedGroup.group_id)}
                        className="bg-[#07a6ec] hover:bg-[#07a6ec]/90"
                      >
                        Contribute
                      </Button>
                    </div>
                  </div>

                  {selectedGroup.group_key && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Group Key</label>
                      <div className="flex gap-2">
                        <Input
                          value={selectedGroup.group_key}
                          readOnly
                          className="border-[#07a6ec]/30 focus:border-[#07a6ec] focus:ring-[#07a6ec]"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => copyGroupKey(selectedGroup.group_key || '')}
                          className="border-[#07a6ec] text-[#07a6ec] hover:bg-[#07a6ec] hover:text-white"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => shareGroup(selectedGroup.group_key || '')}
                          className="border-[#07a6ec] text-[#07a6ec] hover:bg-[#07a6ec] hover:text-white"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {selectedGroup.is_creator ? (
                      <Button 
                        variant="destructive" 
                        className="flex-1 bg-red-500 hover:bg-red-600"
                        onClick={() => handleDeleteGroup(selectedGroup.group_id)}
                      >
                        Delete Circle
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="flex-1 border-[#fa6724] text-[#fa6724] hover:bg-[#fa6724] hover:text-white"
                        onClick={() => handleLeaveGroup(selectedGroup.group_id)}
                      >
                        Leave Circle
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  )
}
