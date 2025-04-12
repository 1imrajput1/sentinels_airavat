import { ArrowUp, Coffee, Home, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      name: "Grocery Store",
      category: "Groceries",
      amount: "₹2,500",
      date: "Today",
      type: "expense",
      icon: ShoppingBag,
    },
    {
      id: 2,
      name: "Coffee Shop",
      category: "Dining",
      amount: "₹350",
      date: "Yesterday",
      type: "expense",
      icon: Coffee,
    },
    {
      id: 3,
      name: "Salary Deposit",
      category: "Income",
      amount: "₹65,000",
      date: "Apr 28, 2025",
      type: "income",
      icon: ArrowUp,
    },
    {
      id: 4,
      name: "Rent Payment",
      category: "Housing",
      amount: "₹25,000",
      date: "Apr 25, 2025",
      type: "expense",
      icon: Home,
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    transaction.type === "income" ? "bg-green-100" : "bg-orange-100"
                  }`}
                >
                  <transaction.icon
                    className={`h-5 w-5 ${transaction.type === "income" ? "text-green-600" : "text-orange-600"}`}
                  />
                </div>
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-slate-500">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-orange-600"}`}>
                  {transaction.type === "income" ? "+" : "-"}
                  {transaction.amount}
                </p>
                <p className="text-xs text-slate-500">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
