
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getUserQuizResults } from '@/utils/supabaseEnhanced';
import { topics } from '../data/questions';

interface TopicProgressData {
  topicId: string;
  topicName: string;
  totalQuestions: number;
  completedQuizzes: number;
  averageScore: number;
  bestScore: number;
}

const TopicProgress: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [progressData, setProgressData] = useState<TopicProgressData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProgressData();
    }
  }, [isAuthenticated]);

  const fetchProgressData = async () => {
    setLoading(true);
    try {
      const quizResults = await getUserQuizResults();
      
      const topicProgress = topics.map(topic => {
        const topicResults = quizResults.filter(result => result.topic_id === topic.id);
        const scores = topicResults.map(result => (result.score / result.total) * 100);
        
        return {
          topicId: topic.id,
          topicName: topic.name,
          totalQuestions: topic.questions.length,
          completedQuizzes: topicResults.length,
          averageScore: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
          bestScore: scores.length > 0 ? Math.max(...scores) : 0
        };
      });

      setProgressData(topicProgress);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Learning Progress</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {progressData.map(topic => (
          <Link
            key={topic.topicId}
            to={`/quiz/${topic.topicId}`}
            className="block p-4 bg-white/40 rounded-lg border border-white/30 hover:bg-white/60 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">{topic.topicName}</h3>
              <BookOpen className="w-4 h-4 text-gray-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Quizzes Taken</span>
                <span>{topic.completedQuizzes}</span>
              </div>
              
              {topic.completedQuizzes > 0 && (
                <>
                  <Progress value={topic.averageScore} className="h-2" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Avg: {Math.round(topic.averageScore)}%</span>
                    <Badge variant="secondary" className="text-xs">
                      <Trophy className="w-3 h-3 mr-1" />
                      Best: {Math.round(topic.bestScore)}%
                    </Badge>
                  </div>
                </>
              )}
              
              {topic.completedQuizzes === 0 && (
                <div className="text-xs text-gray-500 italic">No quizzes taken yet</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicProgress;
