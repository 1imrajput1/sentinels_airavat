"use client"

import { useState } from "react"
import { Brain, TrendingUp, PiggyBank, ShoppingCart, AlertCircle, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Mock data for AI suggestions
const savingsSuggestions = [
  {
    id: 1,
    category: "Food & Dining",
    amount: 2500,
    potential: 5000,
    description: "You could save ₹2,500 monthly by reducing food delivery orders and cooking more meals at home.",
    tips: [
      "Plan your meals for the week",
      "Buy groceries in bulk",
      "Use cashback apps for grocery shopping",
      "Limit eating out to once a week"
    ]
  },
  {
    id: 2,
    category: "Entertainment",
    amount: 1800,
    potential: 3000,
    description: "Your entertainment expenses could be reduced by ₹1,800 by using subscription sharing and free alternatives.",
    tips: [
      "Share streaming service subscriptions with family",
      "Look for free community events",
      "Use library services for books and movies",
      "Take advantage of student discounts if applicable"
    ]
  },
  {
    id: 3,
    category: "Shopping",
    amount: 3500,
    potential: 6000,
    description: "Impulse shopping is costing you approximately ₹3,500 monthly. This can be reduced by implementing a waiting period for purchases.",
    tips: [
      "Wait 24 hours before making non-essential purchases",
      "Unsubscribe from promotional emails",
      "Use a shopping list and stick to it",
      "Track all purchases in a spending journal"
    ]
  }
]

const investmentSuggestions = [
  {
    id: 1,
    category: "Emergency Fund",
    amount: 50000,
    description: "Build an emergency fund of ₹50,000 to cover 3 months of expenses.",
    type: "Low Risk",
    return: "3-4%",
    platform: "High-yield savings account"
  },
  {
    id: 2,
    category: "Retirement Planning",
    amount: 10000,
    description: "Start contributing ₹10,000 monthly to your retirement fund.",
    type: "Moderate Risk",
    return: "8-10%",
    platform: "Index funds or retirement accounts"
  },
  {
    id: 3,
    category: "Growth Investment",
    amount: 15000,
    description: "Consider investing ₹15,000 in growth-oriented mutual funds.",
    type: "High Risk",
    return: "12-15%",
    platform: "Equity mutual funds"
  }
]

const habitAnalysis = [
  {
    id: 1,
    habit: "Impulse Shopping",
    impact: "High",
    monthlyCost: 3500,
    description: "You make frequent unplanned purchases, especially online.",
    recommendations: [
      "Implement a 24-hour waiting period for non-essential purchases",
      "Create a monthly budget and stick to it",
      "Use cash or debit cards instead of credit cards",
      "Track all purchases in a spending journal"
    ]
  },
  {
    id: 2,
    habit: "Food Delivery",
    impact: "Medium",
    monthlyCost: 2500,
    description: "You order food delivery 3-4 times per week.",
    recommendations: [
      "Plan and prepare meals in advance",
      "Use meal prep services for busy days",
      "Keep healthy snacks at work/home",
      "Set a weekly food delivery budget"
    ]
  },
  {
    id: 3,
    habit: "Subscription Services",
    impact: "Medium",
    monthlyCost: 1800,
    description: "You have multiple active subscriptions that you rarely use.",
    recommendations: [
      "Review and cancel unused subscriptions",
      "Share subscription costs with family/friends",
      "Use free alternatives when possible",
      "Set reminders to review subscriptions quarterly"
    ]
  }
]

export default function SuggestionsPage() {
  const [selectedTab, setSelectedTab] = useState("savings")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#07a6ec]">AI Financial Insights</h1>
          <p className="text-muted-foreground">
            Personalized suggestions to help you save more and spend smarter
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-[#07a6ec]" />
          <span className="text-sm font-medium">AI Powered Analysis</span>
        </div>
      </div>

      <Tabs defaultValue="savings" className="space-y-4" onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="savings" className="data-[state=active]:bg-[#07a6ec] data-[state=active]:text-white">
            <PiggyBank className="mr-2 h-4 w-4" />
            Savings Opportunities
          </TabsTrigger>
          <TabsTrigger value="investments" className="data-[state=active]:bg-[#fa6724] data-[state=active]:text-white">
            <TrendingUp className="mr-2 h-4 w-4" />
            Investment Ideas
          </TabsTrigger>
          <TabsTrigger value="habits" className="data-[state=active]:bg-[#e30584] data-[state=active]:text-white">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Habit Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="savings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savingsSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="border-[#07a6ec]/20 hover:border-[#07a6ec]/50 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#07a6ec]">{suggestion.category}</CardTitle>
                    <PiggyBank className="h-5 w-5 text-[#07a6ec]" />
                  </div>
                  <CardDescription>Potential Monthly Savings: ₹{suggestion.potential}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Current Spending</span>
                        <span className="text-sm">₹{suggestion.amount}</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <p className="text-sm text-slate-600">{suggestion.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Tips to Save:</h4>
                      <ul className="text-sm space-y-1">
                        {suggestion.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Sparkles className="h-4 w-4 text-[#07a6ec] mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {investmentSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="border-[#fa6724]/20 hover:border-[#fa6724]/50 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#fa6724]">{suggestion.category}</CardTitle>
                    <TrendingUp className="h-5 w-5 text-[#fa6724]" />
                  </div>
                  <CardDescription>Monthly Investment: ₹{suggestion.amount}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Risk Level</span>
                      <span className="text-sm">{suggestion.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Expected Return</span>
                      <span className="text-sm">{suggestion.return}</span>
                    </div>
                    <p className="text-sm text-slate-600">{suggestion.description}</p>
                    <Button className="w-full bg-[#fa6724] hover:bg-[#fa6724]/90">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="habits" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {habitAnalysis.map((habit) => (
              <Card key={habit.id} className="border-[#e30584]/20 hover:border-[#e30584]/50 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#e30584]">{habit.habit}</CardTitle>
                    <AlertCircle className="h-5 w-5 text-[#e30584]" />
                  </div>
                  <CardDescription>Monthly Impact: ₹{habit.monthlyCost}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Impact Level</span>
                      <span className="text-sm">{habit.impact}</span>
                    </div>
                    <p className="text-sm text-slate-600">{habit.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Recommendations:</h4>
                      <ul className="text-sm space-y-1">
                        {habit.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Sparkles className="h-4 w-4 text-[#e30584] mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 