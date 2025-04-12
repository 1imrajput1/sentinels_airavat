import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FinancialSnapshot() {
  return (
    <Card className="bg-[#07a6ec]/5 border-[#07a6ec]/20">
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
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#07a6ec]/10">
              <DollarSign className="h-6 w-6 text-[#07a6ec]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-[#07a6ec]" />
                <span className="text-sm font-medium">Income</span>
              </div>
              <p className="mt-1 text-lg font-semibold">₹65,000</p>
              <p className="text-xs text-slate-500">This month</p>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-[#fa6724]" />
                <span className="text-sm font-medium">Expenses</span>
              </div>
              <p className="mt-1 text-lg font-semibold">₹22,500</p>
              <p className="text-xs text-slate-500">This month</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Savings Rate</span>
            <span className="text-sm font-medium text-[#07a6ec]">35%</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">You're saving 35% of your income, which is excellent!</p>
        </div>
      </CardContent>
    </Card>
  )
}
