
import React, { useState, useEffect } from 'react';
import { Brain, Play, BookOpen, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getWrongAnswersFromSupabase, type WrongAnswer } from '@/utils/supabaseQuizStorage';

const SmartRevision: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const [topicBreakdown, setTopicBreakdown] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isAuthenticated) {
      fetchWrongAnswers();
    }
  }, [isAuthenticated]);

  const fetchWrongAnswers = async () => {
    setLoading(true);
    try {
      const data = await getWrongAnswersFromSupabase();
      setWrongAnswers(data);
      
      // Create topic breakdown
      const breakdown: Record<string, number> = {};
      data.forEach(wa => {
        breakdown[wa.topic_id] = (breakdown[wa.topic_id] || 0) + 1;
      });
      setTopicBreakdown(breakdown);
    } catch (error) {
      console.error('Error fetching wrong answers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="animate-pulse">
          <div className="h-6 bg-purple-200 rounded mb-4"></div>
          <div className="h-4 bg-purple-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (wrongAnswers.length === 0) {
    return (
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="text-center">
          <Target className="w-12 h-12 mx-auto mb-3 text-green-500" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Perfect Record!</h3>
          <p className="text-green-700 text-sm">
            You haven't answered any questions incorrectly yet. Keep up the great work!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-purple-800">Smart Revision Mode</h3>
          <p className="text-purple-700 text-sm">Review your previously incorrect answers</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-purple-700">Questions to Review</span>
          <Badge className="bg-purple-100 text-purple-800">{wrongAnswers.length} questions</Badge>
        </div>
        
        {Object.keys(topicBreakdown).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(topicBreakdown).map(([topic, count]) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}: {count}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link 
          to="/quiz/revision"
          className="flex-1"
        >
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
            <Play className="w-4 h-4 mr-2" />
            Start Smart Revision
          </Button>
        </Link>
        
        <Link to="/topics">
          <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            <BookOpen className="w-4 h-4 mr-2" />
            Browse Topics
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default SmartRevision;
