import { BadgeCheck, Leaf, Medal, Star, Trophy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProgressTree() {
  const achievements = [
    {
      id: "savings-streak",
      title: "Savings Streak",
      description: "Save money for 7 consecutive days",
      icon: Trophy,
      color: "orange",
      earned: true,
      date: "April 28, 2025",
    },
    {
      id: "budget-master",
      title: "Budget Master",
      description: "Stay under budget in all categories for a month",
      icon: Medal,
      color: "blue",
      earned: true,
      date: "April 15, 2025",
    },
    {
      id: "debt-reducer",
      title: "Debt Reducer",
      description: "Pay off 10% of your total debt",
      icon: BadgeCheck,
      color: "green",
      earned: true,
      date: "March 30, 2025",
    },
    {
      id: "investment-starter",
      title: "Investment Starter",
      description: "Make your first investment",
      icon: Star,
      color: "purple",
      earned: false,
    },
    {
      id: "emergency-fund-builder",
      title: "Emergency Fund Builder",
      description: "Save 3 months of expenses",
      icon: Leaf,
      color: "green",
      earned: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Progress Tree & Achievements</h2>
        <Button variant="outline" size="sm">
          View All Achievements
        </Button>
      </div>

      {/* Visual Tree */}
      <Card className="border-green-200 overflow-hidden">
        <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-blue-50">
          <CardTitle>Your Financial Growth</CardTitle>
          <CardDescription>Watch your financial habits grow into a strong foundation</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md h-[400px]">
              {/* Tree trunk */}
              <div className="absolute left-1/2 top-[50px] bottom-0 w-4 bg-green-200 rounded-full transform -translate-x-1/2"></div>

              {/* Tree branches with achievements */}
              <div className="absolute left-1/2 top-[80px] w-40 h-4 bg-green-200 rounded-full transform -translate-x-full"></div>
              <div className="absolute left-1/2 top-[80px] w-4 h-4 bg-green-300 rounded-full transform -translate-x-1/2"></div>
              <div className="absolute left-[calc(50%-40px)] top-[70px] w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-orange-500" />
              </div>

              <div className="absolute left-1/2 top-[150px] w-60 h-4 bg-green-200 rounded-full transform translate-x-0"></div>
              <div className="absolute left-[calc(50%+60px)] top-[140px] w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center">
                <Medal className="h-5 w-5 text-blue-500" />
              </div>

              <div className="absolute left-1/2 top-[220px] w-50 h-4 bg-green-200 rounded-full transform -translate-x-full"></div>
              <div className="absolute left-[calc(50%-50px)] top-[210px] w-10 h-10 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-green-500" />
              </div>

              <div className="absolute left-1/2 top-[290px] w-40 h-4 bg-green-200 rounded-full transform translate-x-0"></div>
              <div className="absolute left-[calc(50%+40px)] top-[280px] w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center">
                <Star className="h-5 w-5 text-slate-400" />
              </div>

              <div className="absolute left-1/2 top-[360px] w-60 h-4 bg-green-200 rounded-full transform -translate-x-full"></div>
              <div className="absolute left-[calc(50%-60px)] top-[350px] w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-slate-400" />
              </div>

              {/* Level indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs">Level</div>
                  <div className="text-xl font-bold">5</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Tabs defaultValue="earned" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="earned">Earned Badges</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Badges</TabsTrigger>
        </TabsList>
        <TabsContent value="earned" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {achievements
              .filter((a) => a.earned)
              .map((achievement) => (
                <Card key={achievement.id} className={`border-${achievement.color}-200`}>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-${achievement.color}-100`}
                      >
                        <achievement.icon className={`h-8 w-8 text-${achievement.color}-500`} />
                      </div>
                      <h3 className="mb-1 font-medium">{achievement.title}</h3>
                      <p className="mb-2 text-xs text-slate-500">{achievement.description}</p>
                      <Badge
                        variant="outline"
                        className={`border-${achievement.color}-200 bg-${achievement.color}-50 text-${achievement.color}-600`}
                      >
                        Earned on {achievement.date}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {achievements
              .filter((a) => !a.earned)
              .map((achievement) => (
                <Card key={achievement.id} className="border-slate-200 bg-slate-50">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
                        <achievement.icon className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="mb-1 font-medium">{achievement.title}</h3>
                      <p className="mb-2 text-xs text-slate-500">{achievement.description}</p>
                      <Button variant="outline" size="sm">
                        View Requirements
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Level Progress */}
      <Card className="mt-8">
        <CardHeader className="pb-2">
          <CardTitle>Level Progress</CardTitle>
          <CardDescription>Level 5: Financial Apprentice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">XP: 2,450 / 3,000</span>
              <span className="text-sm font-medium text-blue-600">82%</span>
            </div>
            <Progress value={82} className="h-2 bg-slate-200" indicatorClassName="bg-blue-500" />
          </div>
          <p className="text-sm text-slate-600">Complete 2 more challenges to reach Level 6: Financial Strategist</p>
        </CardContent>
      </Card>
    </div>
  )
}
