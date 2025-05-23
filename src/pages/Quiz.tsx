
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Moon, Sun, Flame, Book } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import CooldownTimer from '../components/CooldownTimer';
import Certificate from '../components/Certificate';
import StreakBadge from '../components/StreakBadge';
import SpecialQuestion from '../components/SpecialQuestion';
import { allTopics } from '../data/questions';
import { 
  saveWrongAnswer, 
  getSpecialQuestion, 
  removeWrongAnswer, 
  getStreakData,
  updateStreak 
} from '../utils/quizStorage';
import { toast } from "sonner";

interface QuizParams {
  topicId?: string;
}

const Quiz = () => {
  const { topicId } = useParams<keyof QuizParams>() as QuizParams;
  const navigate = useNavigate();
  
  const [darkMode, setDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isPremium] = useState(false); // Placeholder for premium logic
  const [cooldownActive, setCooldownActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [streak, setStreak] = useState(0);
  const [specialQuestion, setSpecialQuestion] = useState(null);
  const [showSpecialQuestion, setShowSpecialQuestion] = useState(false);
  
  // Get topic and questions based on topicId
  const topic = allTopics.find(t => t.id === topicId) || allTopics[0];
  const questions = topic.questions;

  // Initialize answers and streak
  useEffect(() => {
    if (selectedAnswers.length === 0) {
      setSelectedAnswers(new Array(questions.length).fill(null));
    }
    
    // Load streak data
    const streakData = getStreakData();
    setStreak(streakData.currentStreak);
    
    // Check for special question of the day
    const todaysSpecialQuestion = getSpecialQuestion();
    if (todaysSpecialQuestion) {
      setSpecialQuestion(todaysSpecialQuestion);
      // Show special question after a short delay
      setTimeout(() => {
        setShowSpecialQuestion(true);
      }, 1000);
    }
  }, [questions.length, selectedAnswers.length]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswers[currentQuestion] !== null) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
    
    // If answer is wrong, save to wrong answers
    if (answerIndex !== questions[currentQuestion].correctAnswer) {
      saveWrongAnswer(questions[currentQuestion], topic.id);
      toast.error("Oops! That wasn't the right answer.");
    } else {
      toast.success("Great job! That's correct!");
    }
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
      // Update streak when quiz is completed
      const updatedStreakData = updateStreak();
      setStreak(updatedStreakData.currentStreak);
      
      setIsQuizComplete(true);
    }
  };

  const toggleExplanation = () => {
    if (selectedAnswers[currentQuestion] !== null) {
      setShowExplanation(!showExplanation);
    }
  };

  const handleSpecialQuestionAnswer = (isCorrect: boolean) => {
    if (isCorrect && specialQuestion) {
      // Remove from wrong answers if correctly answered
      removeWrongAnswer(specialQuestion.question.id, specialQuestion.topicId);
      toast.success("You mastered the question! It won't appear again.", {
        duration: 5000
      });
    } else {
      toast.info("Keep practicing! You'll get it next time.", {
        duration: 5000
      });
    }
    
    // Hide special question after answering
    setTimeout(() => {
      setShowSpecialQuestion(false);
      setSpecialQuestion(null);
    }, 1000);
  };

  const dismissSpecialQuestion = () => {
    setShowSpecialQuestion(false);
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
          {topic.name}
        </h2>
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

      {/* Special Question of the Day */}
      {showSpecialQuestion && specialQuestion && (
        <SpecialQuestion 
          question={specialQuestion.question} 
          onAnswerQuestion={handleSpecialQuestionAnswer}
          onDismiss={dismissSpecialQuestion}
          darkMode={darkMode}
        />
      )}

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
