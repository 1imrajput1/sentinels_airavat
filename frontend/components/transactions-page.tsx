"use client"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Calendar,
  CreditCard,
  DollarSign,
  Filter,
  Menu,
  Search,
  Shield,
  ShoppingBag,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { SidebarNav } from "@/components/sidebar-nav"

export function TransactionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar for desktop */}
      <SidebarNav currentPath="/transactions" isMobile={false} />

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
          <SidebarNav currentPath="/transactions" isMobile={true} />
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

        {/* Transactions content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
            <p className="text-slate-500">View and manage all your financial activities</p>
          </div>

          {/* Search and filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input placeholder="Search transactions..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Transactions summary */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <ArrowUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Income (This Month)</p>
                    <p className="text-xl font-bold text-green-600">₹65,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <ArrowDown className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Expenses (This Month)</p>
                    <p className="text-xl font-bold text-orange-600">₹22,500</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Net Balance</p>
                    <p className="text-xl font-bold text-blue-600">₹42,500</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different transaction views */}
          <Tabs defaultValue="all" className="mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        name: "Grocery Store",
                        category: "Groceries",
                        amount: "₹2,500",
                        date: "Today",
                        type: "expense",
                        icon: ShoppingBag,
                      },
                      {
                        id: 2,
                        name: "Coffee Shop",
                        category: "Dining",
                        amount: "₹350",
                        date: "Yesterday",
                        type: "expense",
                        icon: CreditCard,
                      },
                      {
                        id: 3,
                        name: "Salary Deposit",
                        category: "Income",
                        amount: "₹65,000",
                        date: "Apr 28, 2025",
                        type: "income",
                        icon: ArrowUp,
                      },
                      {
                        id: 4,
                        name: "Rent Payment",
                        category: "Housing",
                        amount: "₹25,000",
                        date: "Apr 25, 2025",
                        type: "expense",
                        icon: CreditCard,
                      },
                      {
                        id: 5,
                        name: "Electricity Bill",
                        category: "Utilities",
                        amount: "₹3,200",
                        date: "Apr 20, 2025",
                        type: "expense",
                        icon: CreditCard,
                      },
                      {
                        id: 6,
                        name: "Freelance Payment",
                        category: "Income",
                        amount: "₹15,000",
                        date: "Apr 18, 2025",
                        type: "income",
                        icon: ArrowUp,
                      },
                      {
                        id: 7,
                        name: "Restaurant Dinner",
                        category: "Dining",
                        amount: "₹1,800",
                        date: "Apr 15, 2025",
                        type: "expense",
                        icon: CreditCard,
                      },
                      {
                        id: 8,
                        name: "Movie Tickets",
                        category: "Entertainment",
                        amount: "₹600",
                        date: "Apr 12, 2025",
                        type: "expense",
                        icon: CreditCard,
                      },
                    ].map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              transaction.type === "income" ? "bg-green-100" : "bg-orange-100"
                            }`}
                          >
                            <transaction.icon
                              className={`h-5 w-5 ${
                                transaction.type === "income" ? "text-green-600" : "text-orange-600"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.name}</p>
                            <p className="text-sm text-slate-500">{transaction.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              transaction.type === "income" ? "text-green-600" : "text-orange-600"
                            }`}
                          >
                            {transaction.type === "income" ? "+" : "-"}
                            {transaction.amount}
                          </p>
                          <p className="text-xs text-slate-500">{transaction.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="categories" className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Category Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 mb-4">View your spending by categories</p>
                  <div className="space-y-4">
                    {[
                      { name: "Groceries", amount: "₹12,000", percentage: 25, color: "blue" },
                      { name: "Housing", amount: "₹25,000", percentage: 45, color: "orange" },
                      { name: "Dining", amount: "₹8,500", percentage: 15, color: "green" },
                      { name: "Transportation", amount: "₹6,200", percentage: 10, color: "purple" },
                      { name: "Entertainment", amount: "₹5,000", percentage: 5, color: "yellow" },
                    ].map((category) => (
                      <div key={category.name} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm font-medium">{category.amount}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full bg-${category.color}-500`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-xs text-slate-500">{category.percentage}% of total</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="anomalies" className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Spending Anomalies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 mb-4">Unusual spending patterns detected</p>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                          <ShoppingBag className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Shopping Spike</p>
                            <Badge className="bg-orange-500">Unusual</Badge>
                          </div>
                          <p className="text-sm text-slate-700">
                            Your shopping expenses are 45% higher than your monthly average
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">New Merchant</p>
                            <Badge className="bg-blue-500">First Time</Badge>
                          </div>
                          <p className="text-sm text-slate-700">
                            First transaction with "Premium Electronics Store" for ₹12,500
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="subscriptions" className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Subscriptions & Recurring Charges</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 mb-4">Manage your recurring payments</p>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Netflix",
                        amount: "₹649",
                        frequency: "Monthly",
                        nextPayment: "May 15, 2025",
                        category: "Entertainment",
                      },
                      {
                        name: "Gym Membership",
                        amount: "₹1,200",
                        frequency: "Monthly",
                        nextPayment: "May 5, 2025",
                        category: "Health & Fitness",
                      },
                      {
                        name: "Amazon Prime",
                        amount: "₹1,499",
                        frequency: "Yearly",
                        nextPayment: "Dec 10, 2025",
                        category: "Shopping",
                      },
                      {
                        name: "Spotify",
                        amount: "₹119",
                        frequency: "Monthly",
                        nextPayment: "May 20, 2025",
                        category: "Entertainment",
                      },
                    ].map((subscription) => (
                      <div key={subscription.name} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{subscription.name}</p>
                          <p className="text-sm text-slate-500">
                            {subscription.frequency} • {subscription.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-orange-600">₹{subscription.amount}</p>
                          <p className="text-xs text-slate-500">Next: {subscription.nextPayment}</p>
                        </div>
                      </div>
                    ))}
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
