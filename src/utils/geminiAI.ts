export interface GeminiResponse {
  candidates: Array<{
    content: {
      content: string; // Updated per Gemini API response format
    };
  }>;
}

export interface AIQASession {
  question: string;
  response: string;
  timestamp: string;
  context?: {
    topic?: string;
    userScore?: number;
    questionData?: any;
  };
}

export interface AIMessage {
  id: string;
  question: string;
  response: string;
  timestamp: string;
  type: 'general' | 'wrong_answer' | 'quiz_help';
  context?: any;
}

// Use env variable or fallback to hardcoded key (replace YOUR_API_KEY_HERE)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro/chat:generate?key=${GEMINI_API_KEY}`;

/**
 * Calls the Google Gemini AI API
 */
export const callGeminiAPI = async (
  question: string,
  context?: {
    type?: 'general' | 'wrong_answer' | 'quiz_help';
    topic?: string;
    questionData?: any;
    userScore?: number;
  }
): Promise<string> => {
  try {
    console.log('🤖 Calling Gemini AI with context:', context);

    // Default system prompt
    let systemPrompt = 'You are an AI assistant for EduQuest, an educational web application. Provide helpful, educational responses.';

    if (context?.type === 'wrong_answer' && context.questionData) {
      systemPrompt = `You are an educational AI helping users learn from their mistakes on EduQuest. 
The user answered a quiz question incorrectly. Provide a clear, encouraging explanation of why the correct answer is right, 
and help them understand the concept better. Be supportive and educational.`;

      question = `The user got this question wrong:

Question: ${context.questionData.question}
Correct Answer: ${context.questionData.options[context.questionData.correctAnswer]}
Topic: ${context.topic || 'General'}

Please explain why this is the correct answer and help the user understand the concept better.`;
    } else if (context?.type === 'quiz_help') {
      systemPrompt = `You are an educational AI assistant for EduQuest. The user is asking for help with quiz topics. 
Provide clear, educational explanations and study tips. Topic: ${context.topic || 'General'}`;
    }

    // Prepare request body following Gemini API spec
    const body = {
      messages: [
        { author: 'system', content: systemPrompt },
        { author: 'user', content: question }
      ],
      temperature: 0.7,
      candidateCount: 1,
      maxOutputTokens: 1024
    };

    // Make API call
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.error('❌ Gemini API error:', response.status, response.statusText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: GeminiResponse = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.content) {
      const aiResponse = data.candidates[0].content.content;
      console.log('🎯 AI Response:', aiResponse.substring(0, 100) + '...');
      return aiResponse;
    } else {
      console.error('❌ No valid AI response data:', data);
      throw new Error('No response from AI');
    }
  } catch (error) {
    console.error('❌ Gemini AI Error:', error);
    throw error;
  }
};

/**
 * Save AI Q&A session to localStorage
 */
export const saveAISession = (
  question: string,
  response: string,
  context?: any
): void => {
  const session: AIQASession = {
    question,
    response,
    timestamp: new Date().toISOString(),
    context,
  };
  localStorage.setItem('lastAISession', JSON.stringify(session));

  // Also save to message history
  saveAIMessage(question, response, context?.type || 'general', context);
};

/**
 * Save a single AI message in history (limit 50)
 */
export const saveAIMessage = (
  question: string,
  response: string,
  type: 'general' | 'wrong_answer' | 'quiz_help' = 'general',
  context?: any
): void => {
  const message: AIMessage = {
    id: Date.now().toString(),
    question,
    response,
    timestamp: new Date().toISOString(),
    type,
    context,
  };

  const existing = getAIMessageHistory();
  const updated = [message, ...existing].slice(0, 50);
  localStorage.setItem('aiMessageHistory', JSON.stringify(updated));
  console.log('💾 AI message saved:', message.type, message.id);
};

/**
 * Retrieve AI message history from localStorage
 */
export const getAIMessageHistory = (): AIMessage[] => {
  try {
    const saved = localStorage.getItem('aiMessageHistory');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading AI message history:', error);
    return [];
  }
};

/**
 * Retrieve last AI Q&A session
 */
export const getLastAISession = (): AIQASession | null => {
  try {
    const saved = localStorage.getItem('lastAISession');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading last AI session:', error);
    return null;
  }
};

/**
 * Clear last AI session
 */
export const clearAISession = (): void => {
  localStorage.removeItem('lastAISession');
  console.log('🗑️ AI session cleared');
};

/**
 * Clear AI message history
 */
export const clearAIMessageHistory = (): void => {
  localStorage.removeItem('aiMessageHistory');
  console.log('🗑️ AI message history cleared');
};

/**
 * Explain wrong answer using AI
 */
export const explainWrongAnswer = async (
  questionData: any,
  topicId: string
): Promise<string> => {
  try {
    const response = await callGeminiAPI('', {
      type: 'wrong_answer',
      topic: topicId,
      questionData,
    });

    // Save as message
    saveAIMessage(
      `Help me understand this ${topicId} question`,
      response,
      'wrong_answer',
      { questionData, topic: topicId }
    );

    return response;
  } catch (error) {
    console.error('Error explaining wrong answer:', error);
    return 'I apologize, but I cannot provide an explanation right now. Please try again later or review the question explanation provided.';
  }
};

/**
 * Generate daily motivational quote using AI
 */
export const generateDailyQuote = async (): Promise<string> => {
  try {
    const response = await callGeminiAPI(
      'Generate an inspiring, educational quote about learning, growth, or achieving goals. Make it motivational and suitable for students. Include the quote and attribute it to a famous person or say "EduQuest Team".',
      { type: 'general' }
    );
    return response;
  } catch (error) {
    console.error('Error generating daily quote:', error);
    return '"The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice." - Brian Herbert';
  }
};

/**
 * Diagnostic test for Gemini API connection
 */
export const testGeminiConnection = async (): Promise<{
  success: boolean;
  response?: string;
  error?: string;
}> => {
  try {
    console.log('🔧 Testing Gemini AI connection...');
    const response = await callGeminiAPI('Hello, are you working correctly?', { type: 'general' });
    console.log('✅ Gemini test successful');
    return { success: true, response };
  } catch (error: any) {
    console.error('❌ Gemini test failed:', error);
    return { success: false, error: error.message };
  }
};
