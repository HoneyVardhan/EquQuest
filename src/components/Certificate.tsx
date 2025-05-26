
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Award, Home, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { getUser } from '../utils/userStorage';
import { getWrongAnswersFromSupabase, type WrongAnswer } from '../utils/supabaseQuizStorage';

interface CertificateProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  isPremium: boolean;
  score: number;
  totalQuestions: number;
  topicId?: string;
}

const Certificate: React.FC<CertificateProps> = ({
  darkMode,
  setDarkMode,
  isPremium,
  score,
  totalQuestions,
  topicId
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const user = getUser();
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [topicAnalysis, setTopicAnalysis] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchWrongAnswersAnalysis();
  }, []);

  const fetchWrongAnswersAnalysis = async () => {
    try {
      const allWrongAnswers = await getWrongAnswersFromSupabase();
      setWrongAnswers(allWrongAnswers);
      
      // Create topic analysis
      const analysis: Record<string, number> = {};
      allWrongAnswers.forEach(wa => {
        analysis[wa.topic_id] = (analysis[wa.topic_id] || 0) + 1;
      });
      setTopicAnalysis(analysis);
    } catch (error) {
      console.error('Error fetching wrong answers analysis:', error);
    }
  };

  const getTopWorstTopics = () => {
    return Object.entries(topicAnalysis)
      .sort(([,a], [,b]) => Number(b) - Number(a))
      .slice(0, 3);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Link 
            to="/"
            className={`flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              darkMode 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-white/60 text-gray-700 hover:bg-white/80'
            }`}
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>

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

      {/* Certificate Content */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={`backdrop-blur-md rounded-3xl p-12 shadow-2xl text-center ${
              darkMode 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white/60 border border-white/20'
            }`}
          >
            {/* Award Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
              className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center ${
                percentage >= 70 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600'
              }`}
            >
              <Award size={48} className="text-white" />
            </motion.div>

            {/* Certificate Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-4"
            >
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isPremium 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {isPremium ? 'Premium Certificate' : 'Basic Certificate'}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              Certificate of Achievement
            </motion.h1>

            {/* User Name */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-6"
              >
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This is to certify that
                </p>
                <h2 className={`text-3xl font-bold mt-2 mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {user.name}
                </h2>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  has successfully completed the quiz
                </p>
              </motion.div>
            )}

            {/* Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-8"
            >
              <div className={`text-6xl font-bold mb-2 ${
                percentage >= 70 ? 'text-green-500' : 'text-blue-500'
              }`}>
                {percentage}%
              </div>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You scored {score} out of {totalQuestions} questions correctly
              </p>
            </motion.div>

            {/* Performance Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mb-8"
            >
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {percentage >= 90 
                  ? "Outstanding performance! You're a true expert!" 
                  : percentage >= 70 
                    ? "Great job! You have a solid understanding of the material." 
                    : "Good effort! Keep practicing to improve your knowledge."}
              </p>
            </motion.div>

            {/* Topic Analysis */}
            {Object.keys(topicAnalysis).length > 0 && getTopWorstTopics().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className={`mb-8 p-4 rounded-2xl ${
                  darkMode 
                    ? 'bg-white/5 border border-white/10' 
                    : 'bg-white/40 border border-white/30'
                }`}
              >
                <h3 className={`text-lg font-semibold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Areas for Improvement
                </h3>
                <div className="space-y-2">
                  {getTopWorstTopics().map(([topic, count]) => (
                    <Link
                      key={topic}
                      to={`/quiz/${topic}`}
                      className={`block p-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
                        darkMode 
                          ? 'bg-white/5 border-white/20 hover:bg-white/10' 
                          : 'bg-white/60 border-white/40 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {topic}
                        </span>
                        <Badge className="bg-red-100 text-red-800">
                          {count} wrong
                        </Badge>
                      </div>
                      <p className={`text-sm mt-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Click to practice this topic
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {/* Download Certificate */}
              <button className="flex items-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Download size={20} />
                <span>Download Certificate</span>
              </button>

              {/* Share Button - Only for Premium */}
              {isPremium && (
                <button className={`flex items-center space-x-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                  darkMode 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-white/60 text-gray-700 hover:bg-white/80'
                }`}>
                  <Share2 size={20} />
                  <span>Share on LinkedIn</span>
                </button>
              )}
            </motion.div>

            {/* Premium Features */}
            {!isPremium && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className={`mt-8 p-6 rounded-2xl ${
                  darkMode 
                    ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30' 
                    : 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200'
                }`}
              >
                <h3 className={`text-xl font-semibold mb-3 ${
                  darkMode ? 'text-purple-300' : 'text-purple-800'
                }`}>
                  Unlock Premium Features
                </h3>
                <p className={`mb-4 ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                  Get personalized certificates with your name, LinkedIn badges, and unlimited access!
                </p>
                <Link 
                  to="/premium"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Upgrade to Premium
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-8 text-center transition-all duration-500 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        © 2025 EduQuest. Contact us at welcome@eduquest.com
      </footer>
    </div>
  );
};

export default Certificate;
