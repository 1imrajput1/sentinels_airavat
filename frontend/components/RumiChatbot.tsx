"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Minimize2, Maximize2 } from "lucide-react";
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API with debugging
const apiKey = process.env.GEMINI_API_KEY;
console.log('API Key available:', !!apiKey); // Will log true if key exists, false if undefined

if (!apiKey) {
  console.error('Gemini API key is missing. Please check your .env file.');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

type RumiEmotion = "happy" | "serious" | "about-to-cry" | "crying" | "shouting";

interface RumiChatbotProps {
  emotion?: RumiEmotion;
  tooltip?: string;
  onClose?: () => void;
}

const emotionConfig = {
  "about-to-cry": {
    image: "https://i.ibb.co/QvQDyD6L/rumi1-about-to-cry.png",
    defaultTooltip: "Uh-oh, things are getting tight... let's plan your next move.",
  },
  crying: {
    image: "https://i.ibb.co/QvQDyD6L/rumi1-about-to-cry.png",
    defaultTooltip: "We were this close! Let's bounce back stronger next time.",
  },
  happy: {
    image: "https://i.ibb.co/LXxjhgkP/rumi1-happy.png",
    defaultTooltip: "You're crushing it! Keep the streak alive",
  },
  serious: {
    image: "https://i.ibb.co/tT6brHsT/rumi1-serious.png",
    defaultTooltip: "Hmm... this recurring charge seems sneaky. Want me to flag it?",
  },
  shouting: {
    image: "https://i.ibb.co/n8LZtvJt/rumi1-shouting-without-glasses.png",
    defaultTooltip: "STOP RIGHT THERE. You promised not to touch that shopping budget! 😡",
  },
};

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function RumiChatbot({ emotion = "happy", tooltip, onClose }: RumiChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<RumiEmotion>(emotion);
  const [currentTooltip, setCurrentTooltip] = useState(tooltip || emotionConfig[emotion].defaultTooltip);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm Rumi, your AI financial assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentTooltip(tooltip || emotionConfig[emotion].defaultTooltip);
  }, [emotion, tooltip]);

  useEffect(() => {
    // Scroll to bottom of messages when new messages are added
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I can help you with that! What specific information do you need?",
        "That's a great question! Let me check your financial data for insights.",
        "I've analyzed your spending patterns. Would you like to see a detailed report?",
        "I can help you set up a budget for that. Would you like to start now?",
        "I've noticed some unusual spending in your recent transactions. Would you like me to flag them?",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-[#07a6ec] text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={emotionConfig[currentEmotion].image}
                  alt={`Rumi ${currentEmotion}`}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium">Rumi Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleMinimize}
                  className="p-1 hover:bg-white/20 rounded-full"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded-full"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Chat messages */}
            {!isMinimized && (
              <>
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user" 
                            ? "bg-[#07a6ec] text-white rounded-br-none" 
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat input */}
                <div className="border-t p-3">
                  <div className="flex items-center gap-2">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#07a6ec]"
                      rows={1}
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="bg-[#07a6ec] text-white p-2 rounded-full hover:bg-[#0596d3]"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="relative w-16 h-16"
      >
        <Image
          src={emotionConfig[currentEmotion].image}
          alt={`Rumi ${currentEmotion}`}
          width={64}
          height={64}
          className="rounded-full cursor-pointer"
        />
        {currentEmotion === "shouting" && (
          <motion.div
            animate={{ rotate: [-1, 1, -1, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0"
          />
        )}
      </motion.button>
    </div>
  );
} 