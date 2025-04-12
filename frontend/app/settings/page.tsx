"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Palette, Globe, RotateCcw } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");
  const [animations, setAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: "#07a6ec" }}>General Settings</h2>
        <p className="text-muted-foreground">Manage your application preferences</p>
      </div>
      
      <Card style={{ borderColor: "#07a6ec" }}>
        <CardHeader style={{ backgroundColor: "rgba(7, 166, 236, 0.1)", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}>
          <CardTitle className="flex items-center" style={{ color: "#07a6ec" }}>
            <Palette className="h-5 w-5 mr-2" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how the application looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full space-y-1">
              <Label htmlFor="theme-mode">Theme Mode</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button
                  variant={darkMode ? "outline" : "default"}
                  className="flex items-center justify-center gap-2 h-20"
                  onClick={() => setDarkMode(false)}
                  style={{ 
                    backgroundColor: !darkMode ? "#07a6ec" : "transparent",
                    color: !darkMode ? "white" : "#333",
                    borderColor: "#07a6ec"
                  }}
                >
                  <Sun className="h-6 w-6" />
                  <span>Light</span>
                </Button>
                <Button
                  variant={darkMode ? "default" : "outline"}
                  className="flex items-center justify-center gap-2 h-20"
                  onClick={() => setDarkMode(true)}
                  style={{ 
                    backgroundColor: darkMode ? "#07a6ec" : "transparent",
                    color: darkMode ? "white" : "#333",
                    borderColor: "#07a6ec"
                  }}
                >
                  <Moon className="h-6 w-6" />
                  <span>Dark</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="animations" style={{ color: "#fa6724" }}>Animations</Label>
              <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
            </div>
            <Switch 
              id="animations" 
              checked={animations} 
              onCheckedChange={setAnimations}
              style={{ backgroundColor: animations ? "#fa6724" : undefined }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="compact-mode" style={{ color: "#fa6724" }}>Compact Mode</Label>
              <p className="text-sm text-muted-foreground">Use a more condensed layout</p>
            </div>
            <Switch 
              id="compact-mode" 
              checked={compactMode} 
              onCheckedChange={setCompactMode}
              style={{ backgroundColor: compactMode ? "#fa6724" : undefined }}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card style={{ borderColor: "#07a6ec" }}>
        <CardHeader style={{ backgroundColor: "rgba(7, 166, 236, 0.1)", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}>
          <CardTitle className="flex items-center" style={{ color: "#07a6ec" }}>
            <Globe className="h-5 w-5 mr-2" />
            Localization
          </CardTitle>
          <CardDescription>Configure regional preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="language" style={{ color: "#fa6724" }}>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" style={{ borderColor: "#07a6ec" }}>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency" style={{ color: "#fa6724" }}>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency" style={{ borderColor: "#07a6ec" }}>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                  <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card style={{ borderColor: "#07a6ec" }}>
        <CardHeader style={{ backgroundColor: "rgba(7, 166, 236, 0.1)", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}>
          <CardTitle className="flex items-center" style={{ color: "#07a6ec" }}>
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset Settings
          </CardTitle>
          <CardDescription>Restore default application settings</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              This will reset all your preferences to their default values. This action cannot be undone.
            </p>
            <Button style={{ backgroundColor: "#e30584", color: "white" }}>Reset All Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 