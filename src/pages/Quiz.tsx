
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Moon, Sun, Crown } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import CooldownTimer from '../components/CooldownTimer';
import Certificate from '../components/Certificate';
import StreakBadge from '../components/StreakBadge';
import SpecialQuestion from '../components/SpecialQuestion';
import { allTopics } from '../data/questions';
import { useAuth } from '@/hooks/useAuth';
import { 
  saveQuizAttempt,
  saveWrongAnswerToSupabase, 
  getSpecialQuestionFromSupabase, 
  removeWrongAnswerFromSupabase, 
  getUserStreak
} from '../utils/supabaseQuizStorage';
import {
  startQuizSession,
  endQuizSession,
  saveQuizResult,
  awardCertificate,
  checkPremiumStatus,
  checkEmailVerification,
  getUserProfile
} from '../utils/supabaseEnhanced';
import { toast } from "sonner";

interface QuizParams {
  topicId?: string;
}

const Quiz = () => {
  const { topicId } = useParams<keyof QuizParams>() as QuizParams;
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  
  const [darkMode, setDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [streak, setStreak] = useState(0);
  const [specialQuestion, setSpecialQuestion] = useState(null);
  const [showSpecialQuestion, setShowSpecialQuestion] = useState(false);
  const [quizSessionId, setQuizSessionId] = useState<string | null>(null);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Check premium status and email verification
  useEffect(() => {
    const checkUserStatus = async () => {
      if (!isAuthenticated) return;

      const [premiumStatus, emailVerified] = await Promise.all([
        checkPremiumStatus(),
        checkEmailVerification()
      ]);

      setIsPremium(premiumStatus);

      // Check if user needs email verification for premium features
      if (!emailVerified && premiumStatus) {
        toast.error('Please verify your email to access premium features.');
        navigate('/verify-email');
        return;
      }

      // Check if non-premium user is trying to access premium content
      if (!premiumStatus && topicId && topicId.includes('advanced')) {
        toast.error('This content requires a premium subscription.');
        navigate('/unlock-premium');
        return;
      }
    };

    checkUserStatus();
  }, [isAuthenticated, topicId, navigate]);

  // Get topic and questions based on topicId
  const topic = allTopics.find(t => t.id === topicId) || allTopics[0];
  const questions = topic.questions;

  // Initialize component state
  useEffect(() => {
    if (!isAuthenticated) return;

    const initializeQuiz = async () => {
      if (selectedAnswers.length === 0) {
        setSelectedAnswers(new Array(questions.length).fill(null));
      }
      
      // Start quiz session
      if (!quizSessionId) {
        const sessionId = await startQuizSession(topic.id);
        setQuizSessionId(sessionId);
      }
      
      // Load streak data from Supabase
      const userStreak = await getUserStreak();
      setStreak(userStreak);
      
      // Check for special question of the day
      const todaysSpecialQuestion = await getSpecialQuestionFromSupabase();
      if (todaysSpecialQuestion) {
        setSpecialQuestion(todaysSpecialQuestion);
        setTimeout(() => {
          setShowSpecialQuestion(true);
        }, 1000);
      }
    };

    initializeQuiz();
  }, [questions.length, selectedAnswers.length, isAuthenticated, topic.id, quizSessionId]);

  const handleAnswerSelect = async (answerIndex: number) => {
    if (selectedAnswers[currentQuestion] !== null) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
    
    // If answer is wrong, save to Supabase
    if (answerIndex !== questions[currentQuestion].correctAnswer) {
      await saveWrongAnswerToSupabase(questions[currentQuestion], topic.id);
      toast.error("Oops! That wasn't the right answer.");
    } else {
      toast.success("Great job! That's correct!");
    }
  };

  const handleNextQuestion = async () => {
    // Start cooldown from question 10 for free users
    if (!isPremium && currentQuestion === 9) {
      setCooldownActive(true);
      setTimeRemaining(3600); // 1 hour in seconds
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      // Quiz completion logic
      const score = selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;
      
      try {
        // End quiz session
        if (quizSessionId) {
          await endQuizSession(quizSessionId, score);
        }
        
        // Save quiz attempt and result
        await Promise.all([
          saveQuizAttempt(topic.id, score, questions.length),
          saveQuizResult(topic.id, score, questions.length)
        ]);
        
        // Award certificate if score >= 80%
        const percentage = (score / questions.length) * 100;
        if (percentage >= 80) {
          const certificateAwarded = await awardCertificate(topic.id, score, questions.length);
          if (certificateAwarded) {
            toast.success('Congratulations! You earned a certificate!', {
              duration: 5000
            });
          }
        }
        
        // Update streak
        const updatedStreak = await getUserStreak();
        setStreak(updatedStreak);
        
        toast.success('Quiz completed successfully!');
      } catch (error) {
        console.error('Error saving quiz results:', error);
        toast.error('Error saving quiz results. Please try again.');
      }
      
      setIsQuizComplete(true);
    }
  };

  const toggleExplanation = () => {
    if (selectedAnswers[currentQuestion] !== null) {
      setShowExplanation(!showExplanation);
    }
  };

  const handleSpecialQuestionAnswer = async (isCorrect: boolean) => {
    if (isCorrect && specialQuestion) {
      await removeWrongAnswerFromSupabase(specialQuestion.question_data.id, specialQuestion.topic_id);
      toast.success("You mastered the question! It won't appear again.", {
        duration: 5000
      });
    } else {
      toast.info("Keep practicing! You'll get it next time.", {
        duration: 5000
      });
    }
    
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

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
          question={specialQuestion.question_data} 
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
