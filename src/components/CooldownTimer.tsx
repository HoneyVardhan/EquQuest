
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface CooldownTimerProps {
  timeRemaining: number;
  setTimeRemaining: (time: number) => void;
  onComplete: () => void;
  darkMode: boolean;
}

const CooldownTimer: React.FC<CooldownTimerProps> = ({
  timeRemaining,
  setTimeRemaining,
  onComplete,
  darkMode
}) => {
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      onComplete();
    }
  }, [timeRemaining, setTimeRemaining, onComplete]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (timeRemaining <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mt-8 p-6 rounded-2xl backdrop-blur-md ${
        darkMode 
          ? 'bg-orange-900/20 border border-orange-500/30' 
          : 'bg-orange-50 border border-orange-200'
      }`}
    >
      <div className="flex items-center justify-center space-x-4">
        <Clock className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`} size={24} />
        <div className="text-center">
          <h3 className={`text-lg font-semibold mb-1 ${
            darkMode ? 'text-orange-300' : 'text-orange-800'
          }`}>
            Free User Cooldown
          </h3>
          <p className={`text-2xl font-mono font-bold ${
            darkMode ? 'text-orange-200' : 'text-orange-700'
          }`}>
            {formatTime(timeRemaining)}
          </p>
          <p className={`text-sm mt-2 ${
            darkMode ? 'text-orange-400' : 'text-orange-600'
          }`}>
            Time until next question available
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <button className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          darkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        } transform hover:scale-105`}>
          Upgrade to Premium
        </button>
      </div>
    </motion.div>
  );
};

export default CooldownTimer;
