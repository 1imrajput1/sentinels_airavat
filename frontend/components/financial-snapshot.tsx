import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FinancialSnapshot() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Financial Snapshot</CardTitle>
        <CardDescription>Your current financial status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Current Balance</p>
              <p className="text-2xl font-bold">₹42,500</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-slate-100 p-3">
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Income</span>
              </div>
              <p className="mt-1 text-lg font-semibold">₹65,000</p>
              <p className="text-xs text-slate-500">This month</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-3">
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Expenses</span>
              </div>
              <p className="mt-1 text-lg font-semibold">₹22,500</p>
              <p className="text-xs text-slate-500">This month</p>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Savings Rate</span>
              <span className="text-sm font-medium text-green-600">35%</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">You're saving 35% of your income, which is excellent!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
