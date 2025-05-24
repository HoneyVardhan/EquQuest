
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Star, Gift, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface StreakRewardsProps {
  streak: number;
  onClose?: () => void;
}

interface Milestone {
  days: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  reward?: string;
}

const milestones: Milestone[] = [
  {
    days: 3,
    title: "Getting Started!",
    description: "You're building a great habit!",
    icon: <Star className="w-8 h-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    reward: "Keep it up!"
  },
  {
    days: 7,
    title: "Week Warrior!",
    description: "One full week of learning!",
    icon: <Flame className="w-8 h-8" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    reward: "Consistency Champion"
  },
  {
    days: 14,
    title: "Two Week Hero!",
    description: "Your dedication is impressive!",
    icon: <Trophy className="w-8 h-8" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    reward: "Learning Legend"
  },
  {
    days: 30,
    title: "Monthly Master!",
    description: "A full month of continuous learning!",
    icon: <Crown className="w-8 h-8" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    reward: "Knowledge King/Queen"
  },
  {
    days: 50,
    title: "Unstoppable Force!",
    description: "Your commitment knows no bounds!",
    icon: <Gift className="w-8 h-8" />,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    reward: "Ultimate Learner"
  }
];

const StreakRewards = ({ streak, onClose }: StreakRewardsProps) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    const milestone = milestones.find(m => m.days === streak);
    if (milestone) {
      setCurrentMilestone(milestone);
      setShowCelebration(true);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowCelebration(false);
        onClose?.();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [streak, onClose]);

  const getNextMilestone = () => {
    return milestones.find(m => m.days > streak);
  };

  const getProgress = () => {
    const nextMilestone = getNextMilestone();
    if (!nextMilestone) return 100;
    
    const previousMilestone = milestones
      .filter(m => m.days <= streak)
      .pop();
    
    const start = previousMilestone?.days || 0;
    const end = nextMilestone.days;
    const current = streak;
    
    return ((current - start) / (end - start)) * 100;
  };

  const nextMilestone = getNextMilestone();
  const progress = getProgress();

  return (
    <>
      {/* Milestone Celebration Modal */}
      <AnimatePresence>
        {showCelebration && currentMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCelebration(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Confetti Animation */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0, 
                      y: -100, 
                      x: Math.random() * 400 - 200,
                      rotate: 0 
                    }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      y: 600, 
                      rotate: Math.random() * 360 
                    }}
                    transition={{ 
                      duration: 3, 
                      delay: Math.random() * 2,
                      repeat: Infinity 
                    }}
                    className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  />
                ))}
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`w-20 h-20 mx-auto mb-4 ${currentMilestone.bgColor} rounded-full flex items-center justify-center ${currentMilestone.color}`}
              >
                {currentMilestone.icon}
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-800 mb-2"
              >
                🎉 {currentMilestone.title}
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-4"
              >
                {currentMilestone.description}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500">
                  {streak} Day Streak!
                </Badge>
              </motion.div>

              {currentMilestone.reward && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
                >
                  <p className="text-sm text-gray-600 mb-1">You've earned:</p>
                  <p className="font-bold text-purple-700">{currentMilestone.reward}</p>
                </motion.div>
              )}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button 
                  onClick={() => setShowCelebration(false)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Continue Learning!
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak Progress Card */}
      <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Current Streak</h3>
                <p className="text-2xl font-bold text-orange-600">{streak} days</p>
              </div>
            </div>
            
            {nextMilestone && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Next milestone</p>
                <p className="font-bold text-gray-800">{nextMilestone.days} days</p>
              </div>
            )}
          </div>

          {nextMilestone && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress to {nextMilestone.title}</span>
                <span className="text-gray-800 font-medium">
                  {streak}/{nextMilestone.days} days
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full"
                />
              </div>
            </div>
          )}

          <div className="mt-4 grid grid-cols-5 gap-2">
            {milestones.map((milestone) => (
              <div
                key={milestone.days}
                className={`text-center p-2 rounded-lg border transition-all ${
                  streak >= milestone.days
                    ? `${milestone.bgColor} border-current ${milestone.color}`
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}
              >
                <div className="w-6 h-6 mx-auto mb-1">
                  {milestone.icon}
                </div>
                <p className="text-xs font-medium">{milestone.days}d</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default StreakRewards;
