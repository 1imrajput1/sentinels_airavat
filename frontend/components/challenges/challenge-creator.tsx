import { ArrowRight, Brain, Calendar, Clock, Flame, LightbulbIcon, Settings, Sliders } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ChallengeCreator() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Create Your Challenge</h2>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Advanced Options
        </Button>
      </div>

      <Tabs defaultValue="templates" className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Challenge Templates</TabsTrigger>
          <TabsTrigger value="ai-generator">AI Generator</TabsTrigger>
          <TabsTrigger value="custom">Custom Challenge</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-orange-200 cursor-pointer hover:border-orange-300 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Spending Freeze
                </CardTitle>
                <CardDescription>Avoid spending in specific categories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Challenge yourself to avoid spending in non-essential categories for a set period of time.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Select Template</Button>
              </CardFooter>
            </Card>

            <Card className="border-blue-200 cursor-pointer hover:border-blue-300 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Savings Sprint
                </CardTitle>
                <CardDescription>Save a specific amount quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Set an ambitious short-term savings goal and push yourself to reach it.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Select Template</Button>
              </CardFooter>
            </Card>

            <Card className="border-green-200 cursor-pointer hover:border-green-300 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-green-500" />
                  Budget Mastery
                </CardTitle>
                <CardDescription>Stay under budget in all categories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Challenge yourself to stay under your predefined budget in every spending category.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-500 hover:bg-green-600">Select Template</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-generator" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                AI Challenge Generator
              </CardTitle>
              <CardDescription>
                Let Rumi suggest personalized challenges based on your spending patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goal">What's your financial goal?</Label>
                  <Select defaultValue="save">
                    <SelectTrigger id="goal">
                      <SelectValue placeholder="Select a goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="save">Save more money</SelectItem>
                      <SelectItem value="spend">Reduce spending</SelectItem>
                      <SelectItem value="debt">Pay off debt</SelectItem>
                      <SelectItem value="invest">Start investing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Challenge difficulty</Label>
                  <div className="pt-2">
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Easy</span>
                    <span>Medium</span>
                    <span>Hard</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="duration">Challenge duration</Label>
                  <Select defaultValue="week">
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">1 day</SelectItem>
                      <SelectItem value="week">1 week</SelectItem>
                      <SelectItem value="twoweeks">2 weeks</SelectItem>
                      <SelectItem value="month">1 month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                <LightbulbIcon className="mr-2 h-4 w-4" />
                Generate Challenge
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">AI Suggested Challenges</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Coffee Shop Detox</h4>
                      <p className="text-xs text-slate-500">Skip coffee shops for 2 weeks and save ₹3,000</p>
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
                      <Flame className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Lunch Prep Master</h4>
                      <p className="text-xs text-slate-500">Bring lunch from home every day for a week</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Challenge Builder</CardTitle>
              <CardDescription>Create your own personalized financial challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="challenge-name">Challenge Name</Label>
                  <Input id="challenge-name" placeholder="Give your challenge a catchy name" />
                </div>

                <div>
                  <Label htmlFor="challenge-description">Description</Label>
                  <Input id="challenge-description" placeholder="Describe what you want to achieve" />
                </div>

                <div>
                  <Label>Challenge Type</Label>
                  <RadioGroup defaultValue="spending" className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <RadioGroupItem value="spending" id="spending" className="peer sr-only" />
                      <Label
                        htmlFor="spending"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 [&:has([data-state=checked])]:border-orange-500"
                      >
                        <Flame className="mb-2 h-6 w-6 text-orange-500" />
                        Spending Challenge
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="saving" id="saving" className="peer sr-only" />
                      <Label
                        htmlFor="saving"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                      >
                        <Calendar className="mb-2 h-6 w-6 text-blue-500" />
                        Saving Challenge
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select defaultValue="week">
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">1 day</SelectItem>
                        <SelectItem value="week">1 week</SelectItem>
                        <SelectItem value="twoweeks">2 weeks</SelectItem>
                        <SelectItem value="month">1 month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Bronze (Easy)</SelectItem>
                      <SelectItem value="medium">Silver (Medium)</SelectItem>
                      <SelectItem value="hard">Gold (Hard)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create Challenge</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
