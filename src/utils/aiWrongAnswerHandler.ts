
import { callGeminiAPI, saveAIMessage } from './geminiAI';
import { Question } from '../data/questions/data-science';
import { toast } from 'sonner';

export interface AIExplanation {
  id: string;
  questionId: number;
  topicId: string;
  explanation: string;
  timestamp: string;
}

export const getAIExplanationForWrongAnswer = async (
  question: Question,
  topicId: string,
  userAnswer?: number
): Promise<string> => {
  try {
    console.log('🤖 Getting AI explanation for wrong answer...');
    
    const context = {
      type: 'wrong_answer' as const,
      topic: topicId,
      questionData: question,
      userAnswer: userAnswer !== undefined ? question.options[userAnswer] : undefined
    };

    let prompt = `The user answered this ${topicId} question incorrectly:

Question: ${question.question}
Correct Answer: ${question.options[question.correctAnswer]}`;

    if (userAnswer !== undefined) {
      prompt += `
User's Answer: ${question.options[userAnswer]}`;
    }

    prompt += `
Topic: ${topicId}

Please provide a clear, encouraging explanation of why the correct answer is right. Help the user understand the concept and learn from their mistake.`;

    const response = await callGeminiAPI(prompt, context);
    
    // Save as AI message for history
    saveAIMessage(
      `Explanation for ${topicId} question: "${question.question.substring(0, 50)}..."`,
      response,
      'wrong_answer',
      { question, topic: topicId, userAnswer }
    );

    console.log('✅ AI explanation generated successfully');
    return response;
    
  } catch (error) {
    console.error('❌ Error getting AI explanation:', error);
    const fallbackExplanation = question.explanation || 
      `The correct answer is "${question.options[question.correctAnswer]}". Please review the study materials for this topic to better understand the concept.`;
    
    toast.error('AI explanation temporarily unavailable. Showing standard explanation.');
    return fallbackExplanation;
  }
};

export const saveAIExplanation = (
  questionId: number,
  topicId: string,
  explanation: string
): void => {
  const explanationData: AIExplanation = {
    id: `${questionId}-${topicId}-${Date.now()}`,
    questionId,
    topicId,
    explanation,
    timestamp: new Date().toISOString()
  };

  try {
    const existing = getStoredAIExplanations();
    const updated = [explanationData, ...existing].slice(0, 100); // Keep last 100
    localStorage.setItem('aiExplanations', JSON.stringify(updated));
    console.log('💾 AI explanation saved for question:', questionId);
  } catch (error) {
    console.error('Error saving AI explanation:', error);
  }
};

export const getStoredAIExplanations = (): AIExplanation[] => {
  try {
    const stored = localStorage.getItem('aiExplanations');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading AI explanations:', error);
    return [];
  }
};

export const getStoredExplanationForQuestion = (
  questionId: number,
  topicId: string
): AIExplanation | null => {
  try {
    const explanations = getStoredAIExplanations();
    return explanations.find(exp => 
      exp.questionId === questionId && exp.topicId === topicId
    ) || null;
  } catch (error) {
    console.error('Error finding stored explanation:', error);
    return null;
  }
};
