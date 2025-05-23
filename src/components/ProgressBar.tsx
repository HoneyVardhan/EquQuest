
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  darkMode: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, darkMode }) => {
  const progress = (current / total) * 100;

  return (
    <div className="px-6">
      <div className="max-w-4xl mx-auto">
        <div className={`backdrop-blur-md rounded-2xl p-6 shadow-lg ${
          darkMode 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/60 border border-white/20'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Question {current} of {total}
            </span>
            <span className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {Math.round(progress)}% Complete
            </span>
          </div>
          
          <div className={`w-full h-3 rounded-full overflow-hidden ${
            darkMode ? 'bg-white/10' : 'bg-gray-200'
          }`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
