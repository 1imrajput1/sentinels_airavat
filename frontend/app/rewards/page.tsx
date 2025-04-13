"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Gift, Coins, Star, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function RewardsPage() {
  // Mock data for rewards with actual voucher images
  const availableRewards = [
    {
      id: 1,
      title: "Entertainment Voucher",
      description: "Get 20% off on your next entertainment purchase",
      points: 500,
      image: "/rewards-vouchers/Entertainment.png",
      status: "available",
      partner: "Entertainment Partners"
    },
    {
      id: 2,
      title: "Swiggy Food Voucher",
      description: "Enjoy 15% off on your next food order",
      points: 300,
      image: "/rewards-vouchers/Swiggy.png",
      status: "available",
      partner: "Swiggy"
    },
    {
      id: 3,
      title: "Myntra Fashion Voucher",
      description: "Get 25% off on fashion purchases",
      points: 800,
      image: "/rewards-vouchers/Myntr.png",
      status: "locked",
      partner: "Myntra"
    },
    {
      id: 4,
      title: "Zerodha Trading Voucher",
      description: "Get free trading credits worth ₹100",
      points: 1000,
      image: "/rewards-vouchers/Zerodha.jpeg.jpg",
      status: "available",
      partner: "Zerodha"
    },
    {
      id: 5,
      title: "MakeMyTrip Voucher",
      description: "Get 10% off on your next travel booking",
      points: 600,
      image: "/rewards-vouchers/MMT_Voucher.jpg",
      status: "locked",
      partner: "MakeMyTrip"
    },
    {
      id: 6,
      title: "Insurance Discount",
      description: "Get 15% off on your next insurance premium",
      points: 750,
      image: "/rewards-vouchers/Insurance_Voucher.png",
      status: "available",
      partner: "Insurance Partners"
    },
    {
      id: 7,
      title: "HDFC Bank Offer",
      description: "Special banking benefits and discounts",
      points: 400,
      image: "/rewards-vouchers/HDFC_Voucher.jpeg.jpg",
      status: "available",
      partner: "HDFC Bank"
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Rewards Center</h1>
          <p className="text-white/70 mt-2">Claim your rewards and track your progress</p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="bg-black/40 border border-[#E65525]/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-[#E65525]" />
                <span className="text-white font-medium">2,500</span>
              </div>
              <p className="text-white/70 text-sm">Total Points</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRewards.map((reward) => (
          <Card 
            key={reward.id}
            className={`bg-black/40 border ${
              reward.status === "available" 
                ? "border-[#E65525]" 
                : "border-[#E65525]/20"
            } hover:shadow-[0_0_20px_rgba(230,85,37,0.4)] transition-all duration-200 overflow-hidden`}
          >
            <div className="relative h-48 w-full">
              <Image
                src={reward.image}
                alt={reward.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white/70 text-sm">{reward.partner}</p>
                <h3 className="text-white font-medium text-lg">{reward.title}</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <CardDescription className="text-white/70 mb-4">
                {reward.description}
              </CardDescription>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-[#E65525]" />
                  <span className="text-white font-medium">{reward.points} points</span>
                </div>
                <Button
                  className={`${
                    reward.status === "available"
                      ? "bg-[#E65525] hover:bg-[#E65525]/90"
                      : "bg-gray-600 hover:bg-gray-700"
                  } text-white gap-2`}
                  disabled={reward.status === "locked"}
                >
                  {reward.status === "available" ? (
                    <>
                      Claim Now
                      <ExternalLink className="h-4 w-4" />
                    </>
                  ) : (
                    "Locked"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-black/40 border border-[#E65525]/20">
        <CardHeader>
          <CardTitle className="text-white">Rewards History</CardTitle>
          <CardDescription className="text-white/70">
            Track your claimed rewards and points history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12">
                  <Image
                    src="/rewards-vouchers/Entertainment.png"
                    alt="Entertainment Voucher"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">Entertainment Voucher</p>
                  <p className="text-white/70 text-sm">Claimed on March 15, 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-[#E65525]" />
                <span className="text-white">+500</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 