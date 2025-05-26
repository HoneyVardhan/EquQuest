
export interface MotivationalQuote {
  id: string;
  text: string;
  author: string;
  category: 'learning' | 'motivation' | 'success';
}

const quotes: MotivationalQuote[] = [
  {
    id: '1',
    text: 'The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.',
    author: 'Brian Herbert',
    category: 'learning'
  },
  {
    id: '2',
    text: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela',
    category: 'learning'
  },
  {
    id: '3',
    text: 'The expert in anything was once a beginner.',
    author: 'Helen Hayes',
    category: 'motivation'
  },
  {
    id: '4',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    category: 'success'
  },
  {
    id: '5',
    text: 'Learning never exhausts the mind.',
    author: 'Leonardo da Vinci',
    category: 'learning'
  },
  {
    id: '6',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'motivation'
  },
  {
    id: '7',
    text: 'Knowledge is power. Information is liberating.',
    author: 'Kofi Annan',
    category: 'learning'
  },
  {
    id: '8',
    text: 'Every accomplishment starts with the decision to try.',
    author: 'John F. Kennedy',
    category: 'motivation'
  }
];

export const getDailyQuote = (): MotivationalQuote => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const quoteIndex = dayOfYear % quotes.length;
  return quotes[quoteIndex];
};

export const getRandomQuote = (): MotivationalQuote => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export const hasSeenTodaysQuote = (): boolean => {
  const lastQuoteDate = localStorage.getItem('lastQuoteDate');
  const today = new Date().toDateString();
  return lastQuoteDate === today;
};

export const markQuoteAsSeen = (): void => {
  localStorage.setItem('lastQuoteDate', new Date().toDateString());
};
