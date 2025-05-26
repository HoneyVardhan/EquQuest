
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import Certificate from '../components/Certificate';
import SpecialQuestion from '../components/SpecialQuestion';
import QuizHeader from '../components/QuizHeader';
import QuizContent from '../components/QuizContent';
import QuizFooter from '../components/QuizFooter';
import { allTopics } from '../data/questions';
import { useQuizLogic } from '../hooks/useQuizLogic';

interface QuizParams {
  topicId?: string;
}

const Quiz = () => {
  const { topicId } = useParams<keyof QuizParams>() as QuizParams;
  const [darkMode, setDarkMode] = useState(false);

  // Get topic and questions based on topicId
  const topic = allTopics.find(t => t.id === topicId) || allTopics[0];
  const questions = topic.questions;

  const {
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
  } = useQuizLogic({ topicId: topic.id, questions, topicName: topic.name });

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
      <QuizHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        streak={streak}
        isPremium={isPremium}
        topicName={topic.name}
      />

      {/* Progress Bar */}
      <ProgressBar 
        current={currentQuestion + 1} 
        total={questions.length} 
        darkMode={darkMode} 
      />

      {/* Main Content */}
      <QuizContent
        questions={questions}
        currentQuestion={currentQuestion}
        selectedAnswers={selectedAnswers}
        onAnswerSelect={handleAnswerSelect}
        showExplanation={showExplanation}
        onToggleExplanation={toggleExplanation}
        darkMode={darkMode}
        cooldownActive={cooldownActive}
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
        setCooldownActive={setCooldownActive}
        isPremium={isPremium}
        canProceed={canProceed}
        onNextQuestion={handleNextQuestion}
      />

      {/* Special Question of the Day */}
      {showSpecialQuestion && specialQuestion && (
        <SpecialQuestion 
          question={specialQuestion.question_data} 
          onAnswerQuestion={handleSpecialQuestionAnswer}
          onDismiss={dismissSpecialQuestion}
          darkMode={darkMode}
        />
      )}

      <QuizFooter darkMode={darkMode} />
    </div>
  );
};

export default Quiz;
