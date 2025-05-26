
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
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
  checkEmailVerification
} from '../utils/supabaseEnhanced';
import { toast } from "sonner";
import { Question } from '../data/questions/data-science';

interface UseQuizLogicProps {
  topicId: string;
  questions: Question[];
  topicName: string;
}

export const useQuizLogic = ({ topicId, questions, topicName }: UseQuizLogicProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  
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

      try {
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
      } catch (error) {
        toast.error('Failed to check user status. Please try again.');
      }
    };

    checkUserStatus();
  }, [isAuthenticated, topicId, navigate]);

  // Initialize component state
  useEffect(() => {
    if (!isAuthenticated) return;

    const initializeQuiz = async () => {
      try {
        if (selectedAnswers.length === 0) {
          setSelectedAnswers(new Array(questions.length).fill(null));
        }
        
        // Start quiz session
        if (!quizSessionId) {
          const sessionId = await startQuizSession(topicId);
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
      } catch (error) {
        toast.error('Failed to initialize quiz. Please refresh and try again.');
      }
    };

    initializeQuiz();
  }, [questions.length, selectedAnswers.length, isAuthenticated, topicId, quizSessionId]);

  const handleAnswerSelect = async (answerIndex: number) => {
    if (selectedAnswers[currentQuestion] !== null) return;
    
    try {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = answerIndex;
      setSelectedAnswers(newAnswers);
      setShowExplanation(true);
      
      // If answer is wrong, save to Supabase
      if (answerIndex !== questions[currentQuestion].correctAnswer) {
        await saveWrongAnswerToSupabase(questions[currentQuestion], topicId);
        toast.error("Oops! That wasn't the right answer.");
      } else {
        toast.success("Great job! That's correct!");
      }
    } catch (error) {
      toast.error('Failed to save answer. Please try again.');
    }
  };

  const handleNextQuestion = async () => {
    try {
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
            saveQuizAttempt(topicId, score, questions.length),
            saveQuizResult(topicId, score, questions.length)
          ]);
          
          // Award certificate if score >= 80%
          const percentage = (score / questions.length) * 100;
          if (percentage >= 80) {
            try {
              await awardCertificate(topicId, score, questions.length);
              toast.success('Congratulations! You earned a certificate!', {
                duration: 5000
              });
            } catch (error) {
              // Certificate award failed but don't block quiz completion
            }
          }
          
          // Update streak
          const updatedStreak = await getUserStreak();
          setStreak(updatedStreak);
          
          toast.success('Quiz completed successfully!');
        } catch (error) {
          toast.error('Error saving quiz results. Please try again.');
        }
        
        setIsQuizComplete(true);
      }
    } catch (error) {
      toast.error('Failed to proceed to next question. Please try again.');
    }
  };

  const toggleExplanation = () => {
    if (selectedAnswers[currentQuestion] !== null) {
      setShowExplanation(!showExplanation);
    }
  };

  const handleSpecialQuestionAnswer = async (isCorrect: boolean) => {
    try {
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
    } catch (error) {
      toast.error('Failed to process special question. Please try again.');
    }
  };

  const dismissSpecialQuestion = () => {
    setShowSpecialQuestion(false);
  };

  const canProceed = () => {
    return selectedAnswers[currentQuestion] !== null && (!cooldownActive || isPremium);
  };

  return {
    currentQuestion,
    selectedAnswers,
    showExplanation,
    isQuizComplete,
    isPremium,
    cooldownActive,
    timeRemaining,
    streak,
    specialQuestion,
    showSpecialQuestion,
    loading,
    handleAnswerSelect,
    handleNextQuestion,
    toggleExplanation,
    handleSpecialQuestionAnswer,
    dismissSpecialQuestion,
    canProceed,
    setTimeRemaining,
    setCooldownActive
  };
};
