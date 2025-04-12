import { Calendar } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UpcomingBills() {
  const bills = [
    {
      name: "Rent",
      amount: "₹25,000",
      date: "May 1, 2025",
      status: "upcoming",
      daysLeft: 3,
    },
    {
      name: "Electricity Bill",
      amount: "₹3,200",
      date: "May 5, 2025",
      status: "upcoming",
      daysLeft: 7,
    },
    {
      name: "Internet Bill",
      amount: "₹1,499",
      date: "May 10, 2025",
      status: "upcoming",
      daysLeft: 12,
    },
    {
      name: "Credit Card Payment",
      amount: "₹15,750",
      date: "May 15, 2025",
      status: "upcoming",
      daysLeft: 17,
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Upcoming Bills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bills.map((bill) => (
            <div key={bill.name} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{bill.name}</p>
                  <p className="text-sm text-slate-500">{bill.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold">{bill.amount}</p>
                  <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-600">
                    {bill.daysLeft} days left
                  </Badge>
                </div>
                <Button size="sm" variant="ghost">
                  Pay Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
