
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import CooldownTimer from '../components/CooldownTimer';
import Certificate from '../components/Certificate';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isPremium] = useState(false); // Placeholder for premium logic
  const [cooldownActive, setCooldownActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Sample quiz data
  const questions: Question[] = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      explanation: "Paris is the capital and largest city of France, known for its rich history, culture, and iconic landmarks like the Eiffel Tower."
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface, giving it a reddish appearance."
    },
    {
      id: 3,
      question: "What is 15 × 8?",
      options: ["110", "120", "130", "140"],
      correctAnswer: 1,
      explanation: "15 × 8 = 120. You can solve this by breaking it down: (10 × 8) + (5 × 8) = 80 + 40 = 120."
    },
    {
      id: 4,
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
      correctAnswer: 1,
      explanation: "William Shakespeare wrote 'Romeo and Juliet' around 1594-1596. It's one of his most famous tragedies."
    },
    {
      id: 5,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: 3,
      explanation: "The Pacific Ocean is the largest ocean, covering about 63 million square miles and containing more than half of the free water on Earth."
    }
  ];

  useEffect(() => {
    if (selectedAnswers.length === 0) {
      setSelectedAnswers(new Array(questions.length).fill(null));
    }
  }, [questions.length, selectedAnswers.length]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswers[currentQuestion] !== null) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(false);
  };

  const handleNextQuestion = () => {
    if (!isPremium && currentQuestion < questions.length - 1) {
      setCooldownActive(true);
      setTimeRemaining(3600); // 1 hour in seconds
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  const toggleExplanation = () => {
    if (selectedAnswers[currentQuestion] !== null) {
      setShowExplanation(!showExplanation);
    }
  };

  const canProceed = () => {
    return selectedAnswers[currentQuestion] !== null && (!cooldownActive || isPremium);
  };

  if (isQuizComplete) {
    return (
      <Certificate 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isPremium={isPremium}
        score={selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length}
        totalQuestions={questions.length}
      />
    );
  }

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
            <ArrowLeft size={20} />
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

      {/* Progress Bar */}
      <ProgressBar 
        current={currentQuestion + 1} 
        total={questions.length} 
        darkMode={darkMode} 
      />

      {/* Main Content */}
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
                onAnswerSelect={handleAnswerSelect}
                showExplanation={showExplanation}
                onToggleExplanation={toggleExplanation}
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
              onClick={handleNextQuestion}
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

      {/* Footer */}
      <footer className={`fixed bottom-0 left-0 right-0 py-4 text-center transition-all duration-500 ${
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

export default Quiz;
