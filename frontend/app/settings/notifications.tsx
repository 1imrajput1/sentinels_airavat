"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type NotificationKey = 'transactions' | 'bills' | 'insights' | 'promotions' | 'security';

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    transactions: true,
    bills: true,
    insights: false,
    promotions: false,
    security: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    transactions: true,
    bills: true,
    insights: true,
    promotions: false,
    security: true
  });
  
  const [notificationFrequency, setNotificationFrequency] = useState("daily");

  const toggleEmailNotification = (key: NotificationKey) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: !emailNotifications[key]
    });
  };

  const togglePushNotification = (key: NotificationKey) => {
    setPushNotifications({
      ...pushNotifications,
      [key]: !pushNotifications[key]
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Configure which emails you would like to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-transactions">Transaction Updates</Label>
                <p className="text-sm text-gray-500">Receive emails about your transactions</p>
              </div>
              <Switch 
                id="email-transactions" 
                checked={emailNotifications.transactions} 
                onCheckedChange={() => toggleEmailNotification('transactions')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-bills">Bill Reminders</Label>
                <p className="text-sm text-gray-500">Get notified when bills are due</p>
              </div>
              <Switch 
                id="email-bills" 
                checked={emailNotifications.bills} 
                onCheckedChange={() => toggleEmailNotification('bills')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-insights">Financial Insights</Label>
                <p className="text-sm text-gray-500">Receive personalized financial tips and insights</p>
              </div>
              <Switch 
                id="email-insights" 
                checked={emailNotifications.insights} 
                onCheckedChange={() => toggleEmailNotification('insights')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-promotions">Promotions</Label>
                <p className="text-sm text-gray-500">Receive promotional offers and new features</p>
              </div>
              <Switch 
                id="email-promotions" 
                checked={emailNotifications.promotions} 
                onCheckedChange={() => toggleEmailNotification('promotions')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-security">Security Alerts</Label>
                <p className="text-sm text-gray-500">Important security updates and alerts</p>
              </div>
              <Switch 
                id="email-security" 
                checked={emailNotifications.security} 
                onCheckedChange={() => toggleEmailNotification('security')} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
            <CardDescription>Configure which push notifications you would like to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="push-transactions">Transaction Updates</Label>
                <p className="text-sm text-gray-500">Receive notifications for transactions</p>
              </div>
              <Switch 
                id="push-transactions" 
                checked={pushNotifications.transactions} 
                onCheckedChange={() => togglePushNotification('transactions')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="push-bills">Bill Reminders</Label>
                <p className="text-sm text-gray-500">Get notified when bills are due</p>
              </div>
              <Switch 
                id="push-bills" 
                checked={pushNotifications.bills} 
                onCheckedChange={() => togglePushNotification('bills')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="push-insights">Financial Insights</Label>
                <p className="text-sm text-gray-500">Receive personalized financial tips and insights</p>
              </div>
              <Switch 
                id="push-insights" 
                checked={pushNotifications.insights} 
                onCheckedChange={() => togglePushNotification('insights')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="push-promotions">Promotions</Label>
                <p className="text-sm text-gray-500">Receive promotional offers and new features</p>
              </div>
              <Switch 
                id="push-promotions" 
                checked={pushNotifications.promotions} 
                onCheckedChange={() => togglePushNotification('promotions')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="push-security">Security Alerts</Label>
                <p className="text-sm text-gray-500">Important security updates and alerts</p>
              </div>
              <Switch 
                id="push-security" 
                checked={pushNotifications.security} 
                onCheckedChange={() => togglePushNotification('security')} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Frequency</CardTitle>
            <CardDescription>How often would you like to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Digest Frequency</Label>
                <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-time">Real-time</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                    <SelectItem value="monthly">Monthly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline">Test Notification</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 