import { CreditCard, Gift, PiggyBank, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function QuickActions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Wallet className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-1 font-medium">Add Income</h3>
            <p className="mb-3 text-xs text-slate-500">Record your latest earnings</p>
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
              Add Now
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <CreditCard className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="mb-1 font-medium">Add Expense</h3>
            <p className="mb-3 text-xs text-slate-500">Track your spending</p>
            <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
              Add Now
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <PiggyBank className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-1 font-medium">Transfer to Savings</h3>
            <p className="mb-3 text-xs text-slate-500">Grow your savings</p>
            <Button size="sm" variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
              Transfer
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Gift className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-1 font-medium">Redeem Rewards</h3>
            <p className="mb-3 text-xs text-slate-500">Use your earned points</p>
            <Button size="sm" variant="outline" className="w-full">
              View Rewards
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
