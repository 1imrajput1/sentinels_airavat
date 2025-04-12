import { BarChart3 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PredictiveSpending() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Predictive Spending</CardTitle>
        <CardDescription>AI forecast for this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Projected Expenses</p>
              <p className="text-2xl font-bold">₹48,200</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Groceries</span>
                <span className="font-medium">₹12,000</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                <div className="h-full w-[60%] rounded-full bg-blue-500"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Dining Out</span>
                <span className="font-medium">₹8,500</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                <div className="h-full w-[42%] rounded-full bg-orange-500"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Transportation</span>
                <span className="font-medium">₹6,200</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                <div className="h-full w-[31%] rounded-full bg-green-500"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Entertainment</span>
                <span className="font-medium">₹5,000</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                <div className="h-full w-[25%] rounded-full bg-purple-500"></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Based on your historical spending patterns and upcoming scheduled payments
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
