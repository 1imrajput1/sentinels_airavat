"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "@/utils/auth";
import RumiChatbot from "@/components/RumiChatbot";

export default function AuthenticatedChatbot() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setIsLoggedIn(authStatus);
    };

    checkAuth();
    
    // Set up an interval to periodically check authentication status
    const intervalId = setInterval(checkAuth, 5000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Only render the chatbot if the user is logged in
  if (!isLoggedIn) {
    return null;
  }

  return <RumiChatbot emotion="happy" />;
} 