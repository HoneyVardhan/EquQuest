
export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface AIQASession {
  question: string;
  response: string;
  timestamp: string;
}

export interface AIMessage {
  id: string;
  question: string;
  response: string;
  timestamp: string;
}

const GEMINI_API_KEY = 'AIzaSyAHiQs5phbNmN7sjtlb3BOw7X8rrFoPdIw';

export const callGeminiAPI = async (question: string): Promise<string> => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are an AI assistant for EduQuest, an educational web application. Answer this question about EduQuest or general educational topics: ${question}`
        }]
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: GeminiResponse = await response.json();
  
  if (data.candidates && data.candidates[0]) {
    return data.candidates[0].content.parts[0].text;
  } else {
    throw new Error('No response from AI');
  }
};

export const saveAISession = (question: string, response: string): void => {
  const session: AIQASession = {
    question,
    response,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('lastAISession', JSON.stringify(session));
  
  // Also save to message history
  saveAIMessage(question, response);
};

export const saveAIMessage = (question: string, response: string): void => {
  const message: AIMessage = {
    id: Date.now().toString(),
    question,
    response,
    timestamp: new Date().toISOString()
  };
  
  const existing = getAIMessageHistory();
  const updated = [message, ...existing].slice(0, 50); // Keep last 50 messages
  localStorage.setItem('aiMessageHistory', JSON.stringify(updated));
};

export const getAIMessageHistory = (): AIMessage[] => {
  const saved = localStorage.getItem('aiMessageHistory');
  return saved ? JSON.parse(saved) : [];
};

export const getLastAISession = (): AIQASession | null => {
  const saved = localStorage.getItem('lastAISession');
  return saved ? JSON.parse(saved) : null;
};

export const clearAISession = (): void => {
  localStorage.removeItem('lastAISession');
};

export const clearAIMessageHistory = (): void => {
  localStorage.removeItem('aiMessageHistory');
};
