
import { callGeminiAPI } from './geminiAI';

export interface AIMotivationalQuote {
  id: string;
  text: string;
  author: string;
  category: 'learning' | 'motivation' | 'success' | 'ai-generated';
  isAIGenerated: boolean;
  timestamp: string;
}

// Enhanced quotes with AI-generated options
const baseQuotes: AIMotivationalQuote[] = [
  {
    id: '1',
    text: 'The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.',
    author: 'Brian Herbert',
    category: 'learning',
    isAIGenerated: false,
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    text: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela',
    category: 'learning',
    isAIGenerated: false,
    timestamp: new Date().toISOString()
  },
  {
    id: '3',
    text: 'The expert in anything was once a beginner.',
    author: 'Helen Hayes',
    category: 'motivation',
    isAIGenerated: false,
    timestamp: new Date().toISOString()
  }
];

export const generateAIDailyQuote = async (): Promise<AIMotivationalQuote> => {
  try {
    console.log('🤖 Generating AI daily quote...');
    
    const prompt = `Generate an inspiring, educational quote about learning, growth, or achieving goals. 
    Make it motivational and suitable for students. 
    Format your response as: "Quote text" - Author Name
    If you create an original quote, attribute it to "EduQuest AI Assistant"`;

    const response = await callGeminiAPI(prompt, { type: 'general' });
    
    // Parse the response to extract quote and author
    const match = response.match(/^"([^"]+)"\s*-\s*(.+)$/);
    
    let text: string;
    let author: string;
    
    if (match) {
      text = match[1].trim();
      author = match[2].trim();
    } else {
      // Fallback parsing
      const lines = response.split('\n').filter(line => line.trim());
      text = lines[0].replace(/^["']|["']$/g, '').trim();
      author = lines[1] ? lines[1].replace(/^-\s*/, '').trim() : 'EduQuest AI Assistant';
    }

    const aiQuote: AIMotivationalQuote = {
      id: `ai-${Date.now()}`,
      text,
      author,
      category: 'ai-generated',
      isAIGenerated: true,
      timestamp: new Date().toISOString()
    };

    // Save AI-generated quote
    saveAIQuote(aiQuote);
    console.log('✅ AI quote generated:', text.substring(0, 50) + '...');
    
    return aiQuote;
    
  } catch (error) {
    console.error('❌ Error generating AI quote:', error);
    // Return a fallback quote
    return getDailyQuote();
  }
};

export const getDailyQuote = (): AIMotivationalQuote => {
  try {
    // Check if we have a cached AI quote for today
    const todaysAIQuote = getTodaysAIQuote();
    if (todaysAIQuote) {
      return todaysAIQuote;
    }

    // Fallback to base quotes
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % baseQuotes.length;
    return baseQuotes[quoteIndex];
  } catch (error) {
    console.error('Error getting daily quote:', error);
    return baseQuotes[0];
  }
};

export const getTodaysAIQuote = (): AIMotivationalQuote | null => {
  try {
    const stored = localStorage.getItem('aiDailyQuote');
    if (!stored) return null;

    const data = JSON.parse(stored);
    const today = new Date().toDateString();
    
    if (data.date === today && data.quote) {
      return data.quote as AIMotivationalQuote;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting today\'s AI quote:', error);
    return null;
  }
};

export const saveAIQuote = (quote: AIMotivationalQuote): void => {
  try {
    const today = new Date().toDateString();
    const data = {
      date: today,
      quote
    };
    localStorage.setItem('aiDailyQuote', JSON.stringify(data));
    
    // Also save to general AI quotes history
    const existing = getAIQuotesHistory();
    const updated = [quote, ...existing].slice(0, 30); // Keep last 30 AI quotes
    localStorage.setItem('aiQuotesHistory', JSON.stringify(updated));
    
    console.log('💾 AI quote saved for today');
  } catch (error) {
    console.error('Error saving AI quote:', error);
  }
};

export const getAIQuotesHistory = (): AIMotivationalQuote[] => {
  try {
    const stored = localStorage.getItem('aiQuotesHistory');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading AI quotes history:', error);
    return [];
  }
};

export const hasSeenTodaysQuote = (): boolean => {
  try {
    const lastQuoteDate = localStorage.getItem('lastQuoteDate');
    const today = new Date().toDateString();
    return lastQuoteDate === today;
  } catch (error) {
    console.error('Error checking if quote was seen:', error);
    return false;
  }
};

export const markQuoteAsSeen = (): void => {
  try {
    localStorage.setItem('lastQuoteDate', new Date().toDateString());
    console.log('✅ Today\'s quote marked as seen');
  } catch (error) {
    console.error('Error marking quote as seen:', error);
  }
};

// Initialize daily AI quote if needed
export const initializeDailyAIQuote = async (): Promise<void> => {
  try {
    const todaysQuote = getTodaysAIQuote();
    if (!todaysQuote) {
      await generateAIDailyQuote();
    }
  } catch (error) {
    console.error('Error initializing daily AI quote:', error);
  }
};
