
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import CooldownTimer from './CooldownTimer';
import { Question } from '../data/questions/data-science';

interface QuizContentProps {
  questions: Question[];
  currentQuestion: number;
  selectedAnswers: (number | null)[];
  onAnswerSelect: (answerIndex: number) => void;
  showExplanation: boolean;
  onToggleExplanation: () => void;
  darkMode: boolean;
  cooldownActive: boolean;
  timeRemaining: number;
  setTimeRemaining: (time: number) => void;
  setCooldownActive: (active: boolean) => void;
  isPremium: boolean;
  canProceed: () => boolean;
  onNextQuestion: () => void;
}

const QuizContent: React.FC<QuizContentProps> = ({
  questions,
  currentQuestion,
  selectedAnswers,
  onAnswerSelect,
  showExplanation,
  onToggleExplanation,
  darkMode,
  cooldownActive,
  timeRemaining,
  setTimeRemaining,
  setCooldownActive,
  isPremium,
  canProceed,
  onNextQuestion
}) => {
  return (
    <div className="px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <QuestionCard
              question={questions[currentQuestion]}
              selectedAnswer={selectedAnswers[currentQuestion]}
              onAnswerSelect={onAnswerSelect}
              showExplanation={showExplanation}
              onToggleExplanation={onToggleExplanation}
              darkMode={darkMode}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cooldown Timer */}
        {cooldownActive && !isPremium && (
          <CooldownTimer
            timeRemaining={timeRemaining}
            setTimeRemaining={setTimeRemaining}
            onComplete={() => setCooldownActive(false)}
            darkMode={darkMode}
          />
        )}

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <button
            onClick={onNextQuestion}
            disabled={!canProceed()}
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
              canProceed()
                ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 shadow-lg hover:shadow-xl'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizContent;
