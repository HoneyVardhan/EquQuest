
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Play, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6 z-10">
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

      {/* Login Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/auth"
          className={`flex items-center space-x-2 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
            darkMode 
              ? 'bg-white/10 text-white hover:bg-white/20' 
              : 'bg-white/60 text-gray-700 hover:bg-white/80'
          }`}
        >
          <LogIn size={24} />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-center backdrop-blur-md rounded-3xl p-12 shadow-2xl max-w-2xl w-full ${
            darkMode 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-white/60 border border-white/20'
          }`}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Welcome to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduQuest
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={`text-xl md:text-2xl mb-12 leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Challenge yourself with interactive quizzes and unlock your learning potential
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              to="/quiz"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Play size={24} />
              <span>Start Quiz</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className={`absolute bottom-0 left-0 right-0 py-6 text-center transition-all duration-500 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <div className={`backdrop-blur-md py-2 ${
          darkMode ? 'bg-black/20' : 'bg-white/40'
        }`}>
          © 2025 EduQuest. Contact us at welcome@eduquest.com
        </div>
      </footer>
    </div>
  );
};

export default Index;
