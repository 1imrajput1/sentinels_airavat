"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PrivacySettings() {
  const [dataSharingOptions, setDataSharingOptions] = useState({
    analyticsTracking: true,
    thirdPartySharing: false,
    improvementProgram: true,
    locationTracking: false,
    personalizedAds: false,
  });

  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: true,
    performance: true,
    marketing: false,
  });

  const toggleDataSharing = (key: keyof typeof dataSharingOptions) => {
    setDataSharingOptions({
      ...dataSharingOptions,
      [key]: !dataSharingOptions[key],
    });
  };

  const toggleCookiePreference = (key: keyof typeof cookiePreferences) => {
    setCookiePreferences({
      ...cookiePreferences,
      [key]: !cookiePreferences[key],
    });
  };

  const handleDownloadData = () => {
    console.log("Data download requested");
    // Functionality to download user data
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion requested");
    // Functionality to initiate account deletion
  };

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="data-sharing" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="data-sharing">Data Sharing</TabsTrigger>
          <TabsTrigger value="cookies">Cookies</TabsTrigger>
          <TabsTrigger value="data-controls">Data Controls</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data-sharing">
          <Card>
            <CardHeader>
              <CardTitle>Data Sharing Preferences</CardTitle>
              <CardDescription>Control how your data is used and shared</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="analytics-tracking">Analytics Tracking</Label>
                  <p className="text-sm text-gray-500">Allow us to collect usage data to improve our service</p>
                </div>
                <Switch 
                  id="analytics-tracking" 
                  checked={dataSharingOptions.analyticsTracking} 
                  onCheckedChange={() => toggleDataSharing('analyticsTracking')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="third-party-sharing">Third-Party Data Sharing</Label>
                  <p className="text-sm text-gray-500">Allow sharing data with trusted partners</p>
                </div>
                <Switch 
                  id="third-party-sharing" 
                  checked={dataSharingOptions.thirdPartySharing} 
                  onCheckedChange={() => toggleDataSharing('thirdPartySharing')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="improvement-program">Product Improvement Program</Label>
                  <p className="text-sm text-gray-500">Participate in our product improvement program</p>
                </div>
                <Switch 
                  id="improvement-program" 
                  checked={dataSharingOptions.improvementProgram} 
                  onCheckedChange={() => toggleDataSharing('improvementProgram')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="location-tracking">Location Tracking</Label>
                  <p className="text-sm text-gray-500">Allow us to track your location for location-based features</p>
                </div>
                <Switch 
                  id="location-tracking" 
                  checked={dataSharingOptions.locationTracking} 
                  onCheckedChange={() => toggleDataSharing('locationTracking')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="personalized-ads">Personalized Advertisements</Label>
                  <p className="text-sm text-gray-500">Allow personalized advertisements based on your activity</p>
                </div>
                <Switch 
                  id="personalized-ads" 
                  checked={dataSharingOptions.personalizedAds} 
                  onCheckedChange={() => toggleDataSharing('personalizedAds')} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cookies">
          <Card>
            <CardHeader>
              <CardTitle>Cookie Preferences</CardTitle>
              <CardDescription>Manage how cookies are used on our website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="necessary-cookies">Necessary Cookies</Label>
                  <p className="text-sm text-gray-500">Required for the website to function (cannot be disabled)</p>
                </div>
                <Switch 
                  id="necessary-cookies" 
                  checked={cookiePreferences.necessary} 
                  disabled={true}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="functional-cookies">Functional Cookies</Label>
                  <p className="text-sm text-gray-500">Enable enhanced functionality and personalization</p>
                </div>
                <Switch 
                  id="functional-cookies" 
                  checked={cookiePreferences.functional} 
                  onCheckedChange={() => toggleCookiePreference('functional')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="performance-cookies">Performance Cookies</Label>
                  <p className="text-sm text-gray-500">Help us understand how visitors interact with our website</p>
                </div>
                <Switch 
                  id="performance-cookies" 
                  checked={cookiePreferences.performance} 
                  onCheckedChange={() => toggleCookiePreference('performance')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="marketing-cookies">Marketing Cookies</Label>
                  <p className="text-sm text-gray-500">Used to display personalized advertisements</p>
                </div>
                <Switch 
                  id="marketing-cookies" 
                  checked={cookiePreferences.marketing} 
                  onCheckedChange={() => toggleCookiePreference('marketing')} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data-controls">
          <Card>
            <CardHeader>
              <CardTitle>Your Data Controls</CardTitle>
              <CardDescription>Manage your personal data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-2">Download Your Data</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Get a copy of all the data we have stored about you and your account.
                </p>
                <Button onClick={handleDownloadData} variant="outline">
                  Request Data Download
                </Button>
              </div>
              
              <div className="border p-4 rounded-md border-red-200">
                <h3 className="font-medium mb-2 text-red-600">Delete Your Account</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button onClick={handleDeleteAccount} variant="destructive">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 