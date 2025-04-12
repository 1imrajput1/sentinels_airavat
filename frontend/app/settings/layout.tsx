"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { User, Shield, Bell, Eye, Sliders, FileText } from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);
  
  // Update active tab when pathname changes
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);
  
  const settingsNavItems = [
    { title: "General", href: "/settings", icon: <Sliders className="h-5 w-5 mr-2" /> },
    { title: "Profile", href: "/settings/profile", icon: <User className="h-5 w-5 mr-2" /> },
    { title: "Security", href: "/settings/security", icon: <Shield className="h-5 w-5 mr-2" /> },
    { title: "Notifications", href: "/settings/notifications", icon: <Bell className="h-5 w-5 mr-2" /> },
    { title: "Privacy", href: "/settings/privacy", icon: <Eye className="h-5 w-5 mr-2" /> },
    { title: "Terms", href: "/settings/terms", icon: <FileText className="h-5 w-5 mr-2" /> },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#07a6ec" }}>Settings</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="p-4 md:w-64 h-fit sticky top-20" style={{ backgroundColor: "white", borderColor: "#07a6ec" }}>
          <nav className="space-y-2">
            {settingsNavItems.map((item) => {
              // Fix how we determine if a link is active
              const isActive = item.href === "/settings" 
                ? pathname === "/settings" 
                : pathname.startsWith(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? "text-white" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  style={{ 
                    backgroundColor: isActive ? "#07a6ec" : "transparent",
                    color: isActive ? "white" : "#333"
                  }}
                >
                  {item.icon}
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </Card>
        <div className="flex-1">
          <Card className="p-6 shadow-md" style={{ borderColor: "#07a6ec" }}>
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
} 