
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
};

export const getLastAISession = (): AIQASession | null => {
  const saved = localStorage.getItem('lastAISession');
  return saved ? JSON.parse(saved) : null;
};

export const clearAISession = (): void => {
  localStorage.removeItem('lastAISession');
};
