
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Award, TrendingUp, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { getUserQuizResults, getUserCertificates, getUserStreak } from '../utils/supabaseEnhanced';
import type { QuizResult, Certificate } from '../utils/supabaseEnhanced';

const ProgressDashboard = () => {
  const { isAuthenticated } = useAuth();
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadUserProgress();
    }
  }, [isAuthenticated]);

  const loadUserProgress = async () => {
    try {
      const [resultsData, certsData, streakData] = await Promise.all([
        getUserQuizResults(),
        getUserCertificates(),
        getUserStreak()
      ]);
      
      setQuizResults(resultsData);
      setCertificates(certsData);
      setStreak(streakData);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalQuizzes = quizResults.length;
  const averageScore = totalQuizzes > 0 
    ? Math.round(quizResults.reduce((sum, result) => sum + (result.score / result.total) * 100, 0) / totalQuizzes)
    : 0;
  const bestScore = totalQuizzes > 0 
    ? Math.max(...quizResults.map(result => Math.round((result.score / result.total) * 100)))
    : 0;
  const totalCertificates = certificates.length;

  const stats = [
    {
      icon: Target,
      title: 'Quizzes Taken',
      value: totalQuizzes,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Average Score',
      value: `${averageScore}%`,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Star,
      title: 'Best Score',
      value: `${bestScore}%`,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Award,
      title: 'Certificates',
      value: totalCertificates,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Progress</h2>
        {streak > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full">
            <Calendar className="w-4 h-4 text-orange-600" />
            <span className="text-orange-700 font-medium">{streak} day streak!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {totalQuizzes > 0 && (
        <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                  <span className="text-sm text-gray-500">{averageScore}%</span>
                </div>
                <Progress value={averageScore} className="h-2" />
              </div>
              
              {certificates.length > 0 && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-800 mb-3">Recent Certificates</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {certificates.slice(0, 4).map((cert, index) => (
                      <div key={cert.id} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-800">{cert.topic_id}</p>
                          <p className="text-sm text-gray-600">
                            {Math.round((cert.score / cert.total) * 100)}% - {new Date(cert.issued_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default ProgressDashboard;
