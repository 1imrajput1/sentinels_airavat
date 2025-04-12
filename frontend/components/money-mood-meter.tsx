import { Smile } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function MoneyMoodMeter() {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-800">Money Mood Meter</h3>
            <p className="text-sm text-blue-600">Your financial health is looking good!</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-green-500">
            <Smile className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          <div className="h-2 rounded-full bg-red-400 opacity-40"></div>
          <div className="h-2 rounded-full bg-orange-400 opacity-40"></div>
          <div className="h-2 rounded-full bg-yellow-400 opacity-40"></div>
          <div className="h-2 rounded-full bg-blue-400"></div>
          <div className="h-2 rounded-full bg-green-400"></div>
        </div>
        <p className="mt-2 text-xs text-slate-600">Based on your spending habits, savings rate, and upcoming bills</p>
      </CardContent>
    </Card>
  )
}
