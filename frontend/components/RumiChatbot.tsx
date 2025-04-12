"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
    image: "https://i.ibb.co/fG4SLnm0/rumi1-crying.png",
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

export default function RumiChatbot({ emotion = "happy", tooltip, onClose }: RumiChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<RumiEmotion>(emotion);
  const [currentTooltip, setCurrentTooltip] = useState(tooltip || emotionConfig[emotion].defaultTooltip);

  useEffect(() => {
    setCurrentEmotion(emotion);
    setCurrentTooltip(tooltip || emotionConfig[emotion].defaultTooltip);
  }, [emotion, tooltip]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl p-4"
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={emotionConfig[currentEmotion].image}
                  alt={`Rumi ${currentEmotion}`}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-800">{currentTooltip}</p>
                <div className="mt-4 space-y-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                    How can I help you today?
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                    Show me my spending insights
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                    Help me set a budget
                  </button>
                </div>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
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