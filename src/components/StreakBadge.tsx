
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StreakBadgeProps {
  streak: number;
  darkMode?: boolean;
}

const StreakBadge = ({ streak, darkMode = false }: StreakBadgeProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [reachedMilestone, setReachedMilestone] = useState(false);
  
  // Check if streak has reached a milestone
  useEffect(() => {
    const milestones = [3, 7, 14, 30];
    if (milestones.includes(streak)) {
      setReachedMilestone(true);
      setShowAnimation(true);
      
      // Reset animation state after it plays
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [streak]);

  // Determine badge message based on streak
  const getBadgeMessage = () => {
    if (streak >= 30) return "🏆 Learning Master! 30+ day streak!";
    if (streak >= 14) return "🔥 On Fire! 14+ day streak!";
    if (streak >= 7) return "👏 Impressive! 7+ day streak!";
    if (streak >= 3) return "👍 Great start! 3+ day streak!";
    return `🔥 Current streak: ${streak} day${streak !== 1 ? 's' : ''}`;
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
              darkMode 
                ? 'bg-orange-500/30 text-white' 
                : 'bg-orange-500/20 text-orange-700'
            } transition-all duration-300`}>
              <Flame className="w-4 h-4" />
              <span className="font-medium">{streak}</span>
              
              {/* Milestone animation */}
              <AnimatePresence>
                {showAnimation && reachedMilestone && (
                  <motion.div
                    className="absolute -top-1 -right-1"
                    initial={{ scale: 0, rotate: 0, opacity: 0 }}
                    animate={{ scale: 1.2, rotate: 360, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Trophy className={`w-4 h-4 ${darkMode ? 'text-yellow-300' : 'text-yellow-500'}`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{getBadgeMessage()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default StreakBadge;
