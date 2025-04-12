"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function ProfileSettings() {
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [bio, setBio] = useState("Finance enthusiast and tech lover");
  const [avatarUrl, setAvatarUrl] = useState("/avatars/default.png");

  const handleSave = () => {
    // Save profile logic would go here
    console.log("Profile saved", { name, username, bio });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[hsl(var(--sidebar-primary))]">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>
      
      <Card className="border-[hsl(var(--sidebar-border))]">
        <CardHeader className="bg-[hsl(var(--sidebar-background))] rounded-t-lg">
          <CardTitle className="flex items-center text-[hsl(var(--sidebar-primary))]">
            <User className="h-5 w-5 mr-2" />
            Personal Information
          </CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Avatar className="h-24 w-24 border-2 border-[hsl(var(--sidebar-border))]">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-primary))]">
                {name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-[hsl(var(--sidebar-border))] hover:bg-[hsl(var(--sidebar-accent))]"
              >
                Change Avatar
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">
                JPG, GIF or PNG. 1MB max.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="border-[hsl(var(--sidebar-border))]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="border-[hsl(var(--sidebar-border))]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="min-h-[100px] w-full rounded-md border border-[hsl(var(--sidebar-border))] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--sidebar-primary))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-[hsl(var(--sidebar-border))] mt-4 pt-4">
          <Button 
            onClick={handleSave}
            className="bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))] hover:bg-[hsl(var(--sidebar-primary))] hover:opacity-90"
          >
            Save Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 