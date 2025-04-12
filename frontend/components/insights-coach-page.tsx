"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Lightbulb, 
  MessageSquare, 
  Clock, 
  DollarSign, 
  CreditCard,
  Target,
  Sparkles
} from "lucide-react";

export function InsightsCoachPage() {
  const [activeInsight, setActiveInsight] = useState('spending');
  const [question, setQuestion] = useState('');

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "#07a6ec" }}>Insights & Coach</h1>
          <p className="text-muted-foreground">Personalized financial guidance and analytics</p>
        </div>
        <Button style={{ backgroundColor: "#e30584", color: "white" }}>
          <Sparkles className="mr-2 h-4 w-4" /> Get Premium Insights
        </Button>
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger 
            value="insights" 
            className="text-base py-3"
            style={{ 
              backgroundColor: "insights" === activeInsight ? "#07a6ec" : "transparent",
              color: "insights" === activeInsight ? "white" : "inherit",
              borderColor: "#07a6ec"
            }}
            onClick={() => setActiveInsight('insights')}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Insights
          </TabsTrigger>
          <TabsTrigger 
            value="coach" 
            className="text-base py-3"
            style={{ 
              backgroundColor: "coach" === activeInsight ? "#07a6ec" : "transparent",
              color: "coach" === activeInsight ? "white" : "inherit",
              borderColor: "#07a6ec"
            }}
            onClick={() => setActiveInsight('coach')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Financial Coach
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card style={{ borderColor: "#07a6ec" }}>
              <CardHeader style={{ backgroundColor: "rgba(7, 166, 236, 0.1)", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}>
                <CardTitle className="flex items-center" style={{ color: "#07a6ec" }}>
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Spending Analysis
                </CardTitle>
                <CardDescription>See where your money is going</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center py-8">
                  <div className="h-32 w-32 rounded-full flex items-center justify-center" style={{ border: '8px solid #07a6ec', position: 'relative' }}>
                    <PieChart className="h-12 w-12" style={{ color: "#fa6724" }} />
                  </div>
                </div>
                <p className="text-center mb-4">Your top spending categories</p>
                <Button className="w-full" style={{ backgroundColor: "#fa6724", color: "white" }}>
                  View Full Analysis
                </Button>
              </CardContent>
            </Card>

            <Card style={{ borderColor: "#07a6ec" }}>
              <CardHeader style={{ backgroundColor: "rgba(7, 166, 236, 0.1)", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}>
                <CardTitle className="flex items-center" style={{ color: "#07a6ec" }}>
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Trend Predictions
                </CardTitle>
                <CardDescription>Future financial forecasts</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center py-8">
                  <div className="h-32 w-32 rounded-full flex items-center justify-center" style={{ border: '8px solid #07a6ec', position: 'relative' }}>
                    <LineChart className="h-12 w-12" style={{ color: "#e30584" }} />
                  </div>
                </div>
                <p className="text-center mb-4">Predictions based on your habits</p>
                <Button className="w-full" style={{ backgroundColor: "#fa6724", color: "white" }}>
                  See Future Trends
                </Button>
              </CardContent>
            </Card>

            <Card style={{ borderColor: "#07a6ec" }}>
              <CardHeader style={{ backgroundColor: "rgba(7, 166, 236, 0.1)", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}>
                <CardTitle className="flex items-center" style={{ color: "#07a6ec" }}>
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Smart Suggestions
                </CardTitle>
                <CardDescription>Tips to improve your finances</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center py-8">
                  <div className="h-32 w-32 rounded-full flex items-center justify-center" style={{ border: '8px solid #07a6ec', position: 'relative' }}>
                    <Target className="h-12 w-12" style={{ color: "#fa6724" }} />
                  </div>
                </div>
                <p className="text-center mb-4">Personalized for your situation</p>
                <Button className="w-full" style={{ backgroundColor: "#fa6724", color: "white" }}>
                  Get Suggestions
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card style={{ borderColor: "#07a6ec" }}>
            <CardHeader style={{ backgroundColor: "rgba(7, 166, 236, 0.1)", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}>
              <CardTitle className="flex items-center" style={{ color: "#07a6ec" }}>
                <CreditCard className="h-5 w-5 mr-2" />
                Recent Activity Insights
              </CardTitle>
              <CardDescription>Smart analysis of your recent transactions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center p-3 border rounded-md" style={{ borderColor: "rgba(7, 166, 236, 0.3)" }}>
                <div className="h-10 w-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: "rgba(7, 166, 236, 0.1)" }}>
                  <DollarSign className="h-5 w-5" style={{ color: "#07a6ec" }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">You spent 30% more on dining this month compared to last month</p>
                  <p className="text-xs text-muted-foreground">Based on transaction data from May-June</p>
                </div>
                <Button variant="outline" size="sm" style={{ borderColor: "#fa6724", color: "#fa6724" }}>Details</Button>
              </div>
              <div className="flex items-center p-3 border rounded-md" style={{ borderColor: "rgba(7, 166, 236, 0.3)" }}>
                <div className="h-10 w-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: "rgba(7, 166, 236, 0.1)" }}>
                  <Clock className="h-5 w-5" style={{ color: "#07a6ec" }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Recurring subscription for Netflix will be charged tomorrow</p>
                  <p className="text-xs text-muted-foreground">$15.99 monthly subscription</p>
                </div>
                <Button variant="outline" size="sm" style={{ borderColor: "#fa6724", color: "#fa6724" }}>Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coach" className="space-y-6">
          <Card style={{ borderColor: "#07a6ec" }}>
            <CardHeader style={{ backgroundColor: "rgba(7, 166, 236, 0.1)", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}>
              <CardTitle className="flex items-center" style={{ color: "#07a6ec" }}>
                <MessageSquare className="h-5 w-5 mr-2" />
                Financial Coach
              </CardTitle>
              <CardDescription>Get answers to your financial questions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="border rounded-lg p-4" style={{ borderColor: "rgba(7, 166, 236, 0.3)", minHeight: "300px" }}>
                <div className="flex items-start mb-4">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary mr-4" style={{ backgroundColor: "#07a6ec" }}>
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 bg-muted rounded-lg p-3">
                    <p className="text-sm">Hi there! I'm your personal financial coach. I can help answer questions about your finances, suggest ways to save money, or provide insights on your spending habits. What would you like to know?</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask a financial question..." 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  style={{ borderColor: "#07a6ec" }}
                />
                <Button style={{ backgroundColor: "#e30584", color: "white" }}>
                  Send
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                <Button variant="outline" size="sm" style={{ borderColor: "#fa6724", color: "#fa6724" }}>How to save for retirement?</Button>
                <Button variant="outline" size="sm" style={{ borderColor: "#fa6724", color: "#fa6724" }}>Build emergency fund</Button>
                <Button variant="outline" size="sm" style={{ borderColor: "#fa6724", color: "#fa6724" }}>Reduce debt strategy</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 