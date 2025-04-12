import { ArrowRight, BadgeCheck, Compass, Home, type LucideIcon, Milestone, Sparkles, Wallet2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface QuestPathway {
  id: string
  title: string
  description: string
  progress: number
  icon: LucideIcon
  color: string
  stages: {
    title: string
    description: string
    completed: boolean
  }[]
  estimatedCompletion: string
}

export function FinancialQuests() {
  const quests: QuestPathway[] = [
    {
      id: "debt-freedom",
      title: "Debt Freedom Journey",
      description: "Eliminate all high-interest debt and achieve financial freedom",
      progress: 35,
      icon: Wallet2,
      color: "blue",
      stages: [
        {
          title: "Debt Inventory",
          description: "List all debts with interest rates and minimum payments",
          completed: true,
        },
        {
          title: "Emergency Fund",
          description: "Build a ₹25,000 mini emergency fund",
          completed: true,
        },
        {
          title: "Debt Snowball",
          description: "Pay off smallest debt completely",
          completed: false,
        },
        {
          title: "Credit Card Freedom",
          description: "Eliminate all credit card debt",
          completed: false,
        },
        {
          title: "Loan Liberation",
          description: "Pay off all personal loans",
          completed: false,
        },
      ],
      estimatedCompletion: "March 2026",
    },
    {
      id: "home-ownership",
      title: "Home Ownership Quest",
      description: "Save for a down payment and buy your first home",
      progress: 20,
      icon: Home,
      color: "green",
      stages: [
        {
          title: "Housing Research",
          description: "Research housing markets and mortgage options",
          completed: true,
        },
        {
          title: "Down Payment Fund",
          description: "Save ₹5,00,000 for down payment",
          completed: false,
        },
        {
          title: "Credit Score Boost",
          description: "Improve credit score to 750+",
          completed: false,
        },
        {
          title: "Pre-Approval",
          description: "Get pre-approved for a mortgage",
          completed: false,
        },
        {
          title: "Home Purchase",
          description: "Find and purchase your home",
          completed: false,
        },
      ],
      estimatedCompletion: "December 2026",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Financial Quests</h2>
        <Button variant="outline" size="sm">
          View All Quests
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {quests.map((quest) => (
          <Card key={quest.id} className={`border-${quest.color}-200`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge className={`bg-${quest.color}-500`}>Quest Journey</Badge>
                <Badge
                  variant="outline"
                  className={`border-${quest.color}-200 bg-${quest.color}-50 text-${quest.color}-600`}
                >
                  In Progress
                </Badge>
              </div>
              <CardTitle className="mt-2 flex items-center gap-2">
                <quest.icon className={`h-5 w-5 text-${quest.color}-500`} />
                {quest.title}
              </CardTitle>
              <CardDescription>{quest.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Quest Progress</span>
                  <span className={`text-sm font-medium text-${quest.color}-600`}>{quest.progress}%</span>
                </div>
                <Progress
                  value={quest.progress}
                  className="h-2 bg-slate-200"
                  indicatorClassName={`bg-${quest.color}-500`}
                />
              </div>
              <div className="space-y-3 mt-4">
                {quest.stages.map((stage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        stage.completed
                          ? `bg-${quest.color}-100 text-${quest.color}-600`
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {stage.completed ? (
                        <BadgeCheck className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${stage.completed ? "text-slate-700" : "text-slate-500"}`}>
                        {stage.title}
                      </p>
                      <p className="text-xs text-slate-500">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex w-full items-center justify-between">
                <div className="text-xs text-slate-500">
                  <Milestone className="mr-1 inline h-3 w-3" />
                  Est. completion: {quest.estimatedCompletion}
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  Continue Quest
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Discover New Quests</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Retirement Readiness</h4>
                  <p className="text-xs text-slate-500">Start your journey to retirement security</p>
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
                  <Compass className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Investment Explorer</h4>
                  <p className="text-xs text-slate-500">Begin your investment journey</p>
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
                  <BadgeCheck className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Financial Independence</h4>
                  <p className="text-xs text-slate-500">Path to financial freedom</p>
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
