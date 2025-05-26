
import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Heart, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { removeWrongAnswerFromSupabase, getWrongAnswersFromSupabase, type WrongAnswer } from '@/utils/supabaseQuizStorage';
import { getDailyQuote, hasSeenTodaysQuote, markQuoteAsSeen, type MotivationalQuote } from '@/utils/motivationalQuotes';
import { toast } from 'sonner';

interface MessagesNotificationProps {
  darkMode?: boolean;
}

const MessagesNotification: React.FC<MessagesNotificationProps> = ({ darkMode = false }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [dailyQuote, setDailyQuote] = useState<MotivationalQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      return;
    }

    fetchMessages();
    
    // Set up daily quote
    if (!hasSeenTodaysQuote()) {
      setDailyQuote(getDailyQuote());
    }

    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const fetchMessages = async () => {
    try {
      const [wrongAnswersData] = await Promise.all([
        getWrongAnswersFromSupabase()
      ]);

      setWrongAnswers(wrongAnswersData);
      
      // Calculate unread count
      let count = wrongAnswersData.length;
      if (!hasSeenTodaysQuote()) {
        count += 1;
      }
      
      setUnreadCount(count);
    } catch (error) {
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
      
      toast.success("Message dismissed successfully");
    } catch (error) {
      toast.error("Failed to dismiss message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDismissQuote = () => {
    markQuoteAsSeen();
    setDailyQuote(null);
    setUnreadCount(prev => Math.max(0, prev - 1));
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
            <h3 className="font-semibold text-gray-800">Messages & Notifications</h3>
          </div>

          <div className="p-2 space-y-2">
            {/* Daily Quote */}
            {dailyQuote && (
              <Card className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2">
                    <Heart className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-purple-800 mb-1">Daily Inspiration</p>
                      <p className="text-xs text-purple-700 italic">"{dailyQuote.text}"</p>
                      <p className="text-xs text-purple-600 mt-1">— {dailyQuote.author}</p>
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

            {/* Wrong Answers */}
            {wrongAnswers.map((wrongAnswer) => (
              <Card key={wrongAnswer.id} className="p-3 bg-orange-50 border-orange-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-orange-800 mb-1">Review Needed</p>
                      <p className="text-xs text-orange-700">
                        You got this {wrongAnswer.topic_id} question wrong. Review it to improve!
                      </p>
                      <p className="text-xs text-orange-600 mt-1 font-medium">
                        {wrongAnswer.question_data.question.substring(0, 60)}...
                      </p>
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

            {wrongAnswers.length === 0 && !dailyQuote && (
              <div className="p-4 text-center text-gray-500">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No new messages</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesNotification;
