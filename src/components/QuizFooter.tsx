
import React from 'react';

interface QuizFooterProps {
  darkMode: boolean;
}

const QuizFooter: React.FC<QuizFooterProps> = ({ darkMode }) => {
  return (
    <footer className={`fixed bottom-0 left-0 right-0 py-4 text-center transition-all duration-500 ${
      darkMode ? 'text-gray-400' : 'text-gray-600'
    }`}>
      <div className={`backdrop-blur-md py-2 ${
        darkMode ? 'bg-black/20' : 'bg-white/40'
      }`}>
        © 2025 EduQuest. Contact us at welcome@eduquest.com
      </div>
    </footer>
  );
};

export default QuizFooter;
