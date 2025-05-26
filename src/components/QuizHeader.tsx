
import React from 'react';
import { ArrowLeft, Moon, Sun, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import StreakBadge from './StreakBadge';

interface QuizHeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  streak: number;
  isPremium: boolean;
  topicName: string;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  darkMode,
  setDarkMode,
  streak,
  isPremium,
  topicName
}) => {
  return (
    <>
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link 
              to="/topics"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                darkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-white/60 text-gray-700 hover:bg-white/80'
              }`}
            >
              <ArrowLeft size={20} />
              <span>Back to Topics</span>
            </Link>
            
            {/* Streak badge */}
            <StreakBadge streak={streak} darkMode={darkMode} />
            
            {/* Premium badge */}
            {isPremium && (
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
              }`}>
                <Crown size={16} />
                <span className="text-sm font-medium">Premium</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
              darkMode 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-white/60 text-gray-700 hover:bg-white/80'
            }`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>

      {/* Topic Title */}
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {topicName}
        </h2>
      </div>
    </>
  );
};

export default QuizHeader;
