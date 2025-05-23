
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Question } from '@/data/questions/data-science';

interface SpecialQuestionProps {
  question: Question | null;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onDismiss: () => void;
  darkMode?: boolean;
}

const SpecialQuestion = ({ question, onAnswerQuestion, onDismiss, darkMode = false }: SpecialQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  if (!question) return null;

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    
    // If answer is correct, trigger callback
    const isCorrect = index === question.correctAnswer;
    
    // Show explanation after selecting an answer
    setShowExplanation(true);
    
    // Trigger callback after showing explanation
    setTimeout(() => {
      onAnswerQuestion(isCorrect);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-md rounded-lg shadow-lg ${
        darkMode 
          ? 'bg-gray-900 border border-gray-700'
          : 'bg-white border border-gray-200'
      }`}
    >
      <div className="relative">
        <button
          onClick={onDismiss}
          className={`absolute top-0 right-0 p-1 rounded-full ${
            darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 mb-3">
          <div className={`p-2 rounded-full ${
            darkMode ? 'bg-blue-900/50' : 'bg-blue-100'
          }`}>
            <Book className={`w-5 h-5 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
          </div>
          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Special Question of the Day
          </h3>
        </div>
        
        <p className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Let's try this question again. Think you've got it this time?
        </p>
        
        <div className={`p-3 rounded-md mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{question.question}</p>
        </div>
        
        <div className="space-y-2 mb-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-3 text-left rounded-md transition-all ${
                selectedAnswer === null
                  ? darkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  : selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : index === question.correctAnswer
                      ? 'bg-green-500 text-white'
                      : darkMode
                        ? 'bg-gray-800 text-gray-400'
                        : 'bg-gray-100 text-gray-500'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`p-3 rounded-md mb-4 ${
              darkMode ? 'bg-blue-900/30 text-blue-100' : 'bg-blue-50 text-blue-800'
            }`}
          >
            <p className="text-sm">{question.explanation}</p>
          </motion.div>
        )}
        
        {!showExplanation && (
          <Button 
            onClick={onDismiss} 
            variant="outline" 
            className="w-full"
          >
            I'll try this later
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default SpecialQuestion;
