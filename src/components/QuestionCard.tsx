
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  showExplanation: boolean;
  onToggleExplanation: () => void;
  darkMode: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation,
  onToggleExplanation,
  darkMode
}) => {
  return (
    <div className={`backdrop-blur-md rounded-3xl p-8 shadow-2xl transition-all duration-500 ${
      darkMode 
        ? 'bg-white/5 border border-white/10' 
        : 'bg-white/60 border border-white/20'
    }`}>
      {/* Question */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-2xl md:text-3xl font-bold mb-8 leading-relaxed ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        {question.question}
      </motion.h2>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => onAnswerSelect(index)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 text-left rounded-2xl transition-all duration-300 ${
              selectedAnswer === index
                ? darkMode
                  ? 'bg-blue-600/30 border-2 border-blue-400 text-white'
                  : 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                : darkMode
                  ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                  : 'bg-white/40 border border-white/30 text-gray-700 hover:bg-white/60 hover:border-white/50'
            } ${selectedAnswer !== null && selectedAnswer !== index ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                selectedAnswer === index
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-white/10 text-white'
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-lg">{option}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Ask AI Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={onToggleExplanation}
        disabled={selectedAnswer === null}
        className={`flex items-center space-x-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
          selectedAnswer !== null
            ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 shadow-lg hover:shadow-xl'
            : 'bg-gray-400 text-gray-600 cursor-not-allowed'
        }`}
      >
        <Brain size={20} />
        <span>Ask AI</span>
      </motion.button>

      {/* AI Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 p-6 rounded-2xl ${
              darkMode 
                ? 'bg-blue-900/20 border border-blue-500/30' 
                : 'bg-blue-50 border border-blue-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Brain className={`mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={20} />
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  AI Explanation
                </h4>
                <p className={`leading-relaxed ${darkMode ? 'text-blue-100' : 'text-blue-700'}`}>
                  {question.explanation}
                </p>
                {selectedAnswer === question.correctAnswer ? (
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                      Correct! Well done!
                    </span>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
                      Incorrect. The correct answer is {String.fromCharCode(65 + question.correctAnswer)}.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionCard;
