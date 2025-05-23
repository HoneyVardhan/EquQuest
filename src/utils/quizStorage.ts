
import { Question } from '../data/questions/data-science';

// Type for wrong answers storage
export interface WrongAnswer {
  question: Question;
  answeredOn: string;  // ISO date string
  topicId: string;
}

// Type for streak tracking
export interface StreakData {
  lastQuizDate: string;  // ISO date string
  currentStreak: number;
  highestStreak: number;
}

// Save wrong answer to localStorage
export const saveWrongAnswer = (question: Question, topicId: string): void => {
  try {
    const wrongAnswers = getWrongAnswers();
    const newWrongAnswer: WrongAnswer = {
      question,
      answeredOn: new Date().toISOString(),
      topicId
    };
    
    // Check if this question is already in the list
    const existingIndex = wrongAnswers.findIndex(wa => wa.question.id === question.id && wa.topicId === topicId);
    
    if (existingIndex >= 0) {
      // Update existing wrong answer with new date
      wrongAnswers[existingIndex] = newWrongAnswer;
    } else {
      // Add new wrong answer
      wrongAnswers.push(newWrongAnswer);
    }
    
    localStorage.setItem('eduquest_wrong_answers', JSON.stringify(wrongAnswers));
  } catch (error) {
    console.error('Error saving wrong answer:', error);
  }
};

// Get all wrong answers from localStorage
export const getWrongAnswers = (): WrongAnswer[] => {
  try {
    const storedWrongAnswers = localStorage.getItem('eduquest_wrong_answers');
    return storedWrongAnswers ? JSON.parse(storedWrongAnswers) : [];
  } catch (error) {
    console.error('Error retrieving wrong answers:', error);
    return [];
  }
};

// Remove a wrong answer from localStorage
export const removeWrongAnswer = (questionId: number, topicId: string): void => {
  try {
    const wrongAnswers = getWrongAnswers();
    const updatedWrongAnswers = wrongAnswers.filter(
      wa => !(wa.question.id === questionId && wa.topicId === topicId)
    );
    localStorage.setItem('eduquest_wrong_answers', JSON.stringify(updatedWrongAnswers));
  } catch (error) {
    console.error('Error removing wrong answer:', error);
  }
};

// Get a special question of the day
export const getSpecialQuestion = (): WrongAnswer | null => {
  try {
    const wrongAnswers = getWrongAnswers();
    if (wrongAnswers.length === 0) return null;
    
    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find wrong answers older than a day
    const eligibleWrongAnswers = wrongAnswers.filter(wa => {
      const answeredDate = new Date(wa.answeredOn);
      answeredDate.setHours(0, 0, 0, 0);
      return answeredDate < today;
    });
    
    if (eligibleWrongAnswers.length === 0) return null;
    
    // Get the oldest wrong answer
    return eligibleWrongAnswers.sort((a, b) => 
      new Date(a.answeredOn).getTime() - new Date(b.answeredOn).getTime()
    )[0];
  } catch (error) {
    console.error('Error getting special question:', error);
    return null;
  }
};

// Update streak when a quiz is completed
export const updateStreak = (): StreakData => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get existing streak data
    const streakData = getStreakData();
    const lastQuizDate = streakData.lastQuizDate ? new Date(streakData.lastQuizDate) : null;
    
    if (lastQuizDate) {
      lastQuizDate.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // Check if last quiz was yesterday (continue streak) or today (maintain streak)
      if (lastQuizDate.getTime() === yesterday.getTime() || lastQuizDate.getTime() === today.getTime()) {
        // If the last quiz was yesterday, increment streak
        if (lastQuizDate.getTime() === yesterday.getTime()) {
          streakData.currentStreak += 1;
        }
      } else {
        // Streak broken
        streakData.currentStreak = 1;
      }
    } else {
      // First quiz
      streakData.currentStreak = 1;
    }
    
    // Update highest streak if needed
    if (streakData.currentStreak > streakData.highestStreak) {
      streakData.highestStreak = streakData.currentStreak;
    }
    
    // Update last quiz date to today
    streakData.lastQuizDate = today.toISOString();
    
    // Save updated streak data
    localStorage.setItem('eduquest_streak', JSON.stringify(streakData));
    
    return streakData;
  } catch (error) {
    console.error('Error updating streak:', error);
    return { lastQuizDate: '', currentStreak: 0, highestStreak: 0 };
  }
};

// Get current streak data
export const getStreakData = (): StreakData => {
  try {
    const storedStreakData = localStorage.getItem('eduquest_streak');
    return storedStreakData ? JSON.parse(storedStreakData) : { 
      lastQuizDate: '',
      currentStreak: 0,
      highestStreak: 0
    };
  } catch (error) {
    console.error('Error retrieving streak data:', error);
    return { lastQuizDate: '', currentStreak: 0, highestStreak: 0 };
  }
};
