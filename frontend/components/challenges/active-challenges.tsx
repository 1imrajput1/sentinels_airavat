import { ArrowRight, Clock, DollarSign, Flame, PiggyBank, ShoppingBag, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ActiveChallenges() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Active Challenges</h2>
        <Button variant="outline" size="sm">
          Browse All Challenges
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Spending Freeze Challenge */}
        <Card className="border-orange-200">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <Badge className="bg-orange-500">Spending Freeze</Badge>
              <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-600">
                5 days left
              </Badge>
            </div>
            <CardTitle className="mt-2">No Dining Out Week</CardTitle>
            <CardDescription>Avoid restaurant expenses for 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">2 of 7 days completed</span>
                <span className="text-sm font-medium text-orange-600">28%</span>
              </div>
              <Progress value={28} className="h-2 bg-slate-200" indicatorClassName="bg-orange-500" />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>Started on April 26, 2025</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Check In Today
            </Button>
          </CardFooter>
        </Card>

        {/* Savings Sprint Challenge */}
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <Badge className="bg-blue-500">Savings Sprint</Badge>
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600">
                10 days left
              </Badge>
            </div>
            <CardTitle className="mt-2">Emergency Fund Boost</CardTitle>
            <CardDescription>Save ₹10,000 in two weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">₹4,000 of ₹10,000</span>
                <span className="text-sm font-medium text-blue-600">40%</span>
              </div>
              <Progress value={40} className="h-2 bg-slate-200" indicatorClassName="bg-blue-500" />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Flame className="h-4 w-4 text-orange-500" />
              <span>4 day streak! Keep it going!</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
              <PiggyBank className="mr-2 h-4 w-4" />
              Add to Savings
            </Button>
          </CardFooter>
        </Card>

        {/* Category Challenge */}
        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <Badge className="bg-green-500">Category Challenge</Badge>
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-600">
                Gold Tier
              </Badge>
            </div>
            <CardTitle className="mt-2">Grocery Budget Master</CardTitle>
            <CardDescription>Keep grocery spending under ₹8,000 this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">₹5,200 of ₹8,000 used</span>
                <span className="text-sm font-medium text-green-600">65%</span>
              </div>
              <Progress value={65} className="h-2 bg-slate-200" indicatorClassName="bg-green-500" />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <DollarSign className="h-4 w-4 text-slate-400" />
              <span>₹2,800 remaining for this month</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
              <Zap className="mr-2 h-4 w-4" />
              View Spending Details
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recommended Challenges</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <ShoppingBag className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Subscription Detox</h4>
                  <p className="text-xs text-slate-500">Pause or cancel unused subscriptions</p>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <PiggyBank className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Weekend Saver</h4>
                  <p className="text-xs text-slate-500">No spending on weekends for 2 weeks</p>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Bill Negotiator</h4>
                  <p className="text-xs text-slate-500">Reduce 3 monthly bills in 30 days</p>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
