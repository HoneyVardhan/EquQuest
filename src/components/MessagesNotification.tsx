
import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Heart, Lightbulb, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { removeWrongAnswerFromSupabase, getWrongAnswersFromSupabase, type WrongAnswer } from '@/utils/supabaseQuizStorage';
import { getDailyQuote, hasSeenTodaysQuote, markQuoteAsSeen, initializeDailyAIQuote, getTodaysAIQuote, type AIMotivationalQuote } from '@/utils/aiMotivationalQuotes';
import { getAIMessageHistory, type AIMessage } from '@/utils/geminiAI';
import { toast } from 'sonner';

interface MessagesNotificationProps {
  darkMode?: boolean;
}

const MessagesNotification: React.FC<MessagesNotificationProps> = ({ darkMode = false }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [dailyQuote, setDailyQuote] = useState<AIMotivationalQuote | null>(null);
  const [recentAIMessages, setRecentAIMessages] = useState<AIMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      return;
    }

    fetchMessages();
    initializeAIContent();
    
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const initializeAIContent = async () => {
    try {
      console.log('🚀 Initializing AI content...');
      
      // Initialize daily AI quote if needed
      await initializeDailyAIQuote();
      
      // Load today's quote (AI or fallback)
      if (!hasSeenTodaysQuote()) {
        const aiQuote = getTodaysAIQuote();
        if (aiQuote) {
          setDailyQuote(aiQuote);
          console.log('🤖 AI-generated quote loaded for today');
        } else {
          setDailyQuote(getDailyQuote());
          console.log('📚 Fallback quote loaded for today');
        }
      }
      
    } catch (error) {
      console.error('❌ Error initializing AI content:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      console.log('📬 Fetching messages and notifications...');
      
      const [wrongAnswersData, aiMessages] = await Promise.all([
        getWrongAnswersFromSupabase(),
        Promise.resolve(getAIMessageHistory().slice(0, 3)) // Get recent AI messages
      ]);

      setWrongAnswers(wrongAnswersData);
      setRecentAIMessages(aiMessages);
      
      // Calculate unread count
      let count = wrongAnswersData.length;
      if (!hasSeenTodaysQuote()) {
        count += 1;
      }
      // Add recent AI messages (last 24 hours)
      const recentMessages = aiMessages.filter(msg => {
        const messageTime = new Date(msg.timestamp);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return messageTime > dayAgo;
      });
      count += recentMessages.length;
      
      setUnreadCount(count);
      console.log(`📊 Total unread messages: ${count}`);
    } catch (error) {
      console.error('❌ Error fetching messages:', error);
      setUnreadCount(0);
    }
  };

  const handleClick = () => {
    setShowPanel(!showPanel);
    if (!showPanel && dailyQuote && !hasSeenTodaysQuote()) {
      markQuoteAsSeen();
      setDailyQuote(null);
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleDismissWrongAnswer = async (wrongAnswer: WrongAnswer) => {
    setLoading(true);
    try {
      await removeWrongAnswerFromSupabase(wrongAnswer.question_id, wrongAnswer.topic_id);
      setWrongAnswers(prev => prev.filter(wa => wa.id !== wrongAnswer.id));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      toast.success("Wrong answer dismissed successfully");
      console.log('✅ Wrong answer dismissed:', wrongAnswer.question_id);
    } catch (error) {
      console.error('❌ Error dismissing wrong answer:', error);
      toast.error("Failed to dismiss message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDismissQuote = () => {
    markQuoteAsSeen();
    setDailyQuote(null);
    setUnreadCount(prev => Math.max(0, prev - 1));
    console.log('✅ Daily quote dismissed');
  };

  const handleViewAIMessages = () => {
    navigate('/ai-messages');
    setShowPanel(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className={`relative ${
          darkMode 
            ? 'text-white hover:bg-white/10' 
            : 'text-gray-700 hover:bg-black/5'
        }`}
        aria-label={`Messages ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <MessageSquare className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center animate-pulse"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {showPanel && (
        <div className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Messages & Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleViewAIMessages}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                View All AI Messages
              </Button>
            </div>
          </div>

          <div className="p-2 space-y-2">
            {/* Daily Quote */}
            {dailyQuote && (
              <Card className={`p-3 border-purple-200 ${
                dailyQuote.isAIGenerated 
                  ? 'bg-gradient-to-r from-purple-50 to-indigo-50' 
                  : 'bg-gradient-to-r from-purple-50 to-blue-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2">
                    {dailyQuote.isAIGenerated ? (
                      <Sparkles className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    ) : (
                      <Heart className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-purple-800 mb-1">
                        {dailyQuote.isAIGenerated ? 'AI-Generated Daily Inspiration' : 'Daily Inspiration'}
                      </p>
                      <p className="text-xs text-purple-700 italic">"{dailyQuote.text}"</p>
                      <p className="text-xs text-purple-600 mt-1">— {dailyQuote.author}</p>
                      {dailyQuote.isAIGenerated && (
                        <div className="text-xs text-purple-500 mt-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Generated by AI
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDismissQuote}
                    className="text-purple-500 hover:text-purple-700 p-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Recent AI Messages */}
            {recentAIMessages.length > 0 && (
              <>
                {recentAIMessages.slice(0, 2).map((message) => (
                  <Card key={message.id} className="p-3 bg-blue-50 border-blue-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2">
                        <Sparkles className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 mb-1">
                            AI Response
                            {message.type === 'wrong_answer' && ' (Learning Help)'}
                          </p>
                          <p className="text-xs text-blue-700">
                            {message.question.substring(0, 50)}...
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            )}

            {/* Wrong Answers */}
            {wrongAnswers.slice(0, 3).map((wrongAnswer) => (
              <Card key={wrongAnswer.id} className="p-3 bg-orange-50 border-orange-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-orange-800 mb-1">Review Needed</p>
                      <p className="text-xs text-orange-700">
                        {wrongAnswer.ai_explanation ? 'AI explanation available' : 'Review this question to improve'}
                      </p>
                      <p className="text-xs text-orange-600 mt-1 font-medium">
                        {wrongAnswer.question_data.question.substring(0, 60)}...
                      </p>
                      {wrongAnswer.ai_explanation && (
                        <div className="text-xs text-orange-500 mt-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          AI explanation ready
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDismissWrongAnswer(wrongAnswer)}
                    disabled={loading}
                    className="text-orange-500 hover:text-orange-700 p-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            ))}

            {wrongAnswers.length === 0 && !dailyQuote && recentAIMessages.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No new messages</p>
                <p className="text-xs text-gray-400 mt-1">
                  Take a quiz to get AI-powered learning insights!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesNotification;
