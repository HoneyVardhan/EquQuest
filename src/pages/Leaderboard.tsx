import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { getLeaderboard, getUserRank, type LeaderboardEntry } from '@/utils/supabaseEnhanced';

const Leaderboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, [isAuthenticated]);

  const loadLeaderboard = async () => {
    try {
      const [leaderboardData, rankData] = await Promise.all([
        getLeaderboard(),
        isAuthenticated ? getUserRank() : Promise.resolve(null)
      ]);
      
      setLeaderboard(leaderboardData);
      setUserRank(rankData);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-6 h-6 text-amber-600" />;
    return <Star className="w-5 h-5 text-blue-500" />;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500";
    if (rank === 3) return "bg-gradient-to-r from-amber-400 to-amber-600";
    return "bg-gradient-to-r from-blue-400 to-blue-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏆 Global Leaderboard
          </h1>
          <p className="text-gray-600 text-lg">
            Compete with learners worldwide and climb the ranks!
          </p>
          
          {userRank && (
            <div className="mt-4">
              <Badge variant="outline" className="px-4 py-2 text-lg">
                Your Rank: #{userRank}
              </Badge>
            </div>
          )}
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center items-end space-x-4 mb-8">
            {leaderboard.slice(0, 3).map((entry, index) => {
              const actualRank = index + 1;
              const heights = ['h-32', 'h-40', 'h-28'];
              const positions = [1, 0, 2]; // 2nd, 1st, 3rd positions
              const actualIndex = positions[index];
              
              return (
                <motion.div
                  key={entry.user_id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + actualIndex * 0.1 }}
                  className={`${heights[actualIndex]} w-32 ${getRankBadgeColor(actualRank)} rounded-t-lg flex flex-col items-center justify-end p-4 text-white relative`}
                >
                  <div className="absolute -top-6">
                    <Avatar className="w-12 h-12 border-4 border-white">
                      <AvatarImage src={entry.avatar_url} />
                      <AvatarFallback>
                        {entry.full_name?.charAt(0) || entry.username?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="text-center mt-2">
                    {getRankIcon(actualRank)}
                    <p className="font-bold text-sm truncate w-24">
                      {entry.full_name || entry.username || 'Anonymous'}
                    </p>
                    <p className="text-xs opacity-90">{entry.total_score} pts</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Rest of Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                All Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.slice(3).map((entry, index) => {
                  const rank = index + 4;
                  const isCurrentUser = user?.id === entry.user_id;
                  
                  return (
                    <motion.div
                      key={entry.user_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                        isCurrentUser 
                          ? 'bg-blue-50 border-blue-200 shadow-md' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                          {rank}
                        </div>
                        
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={entry.avatar_url} />
                          <AvatarFallback>
                            {entry.full_name?.charAt(0) || entry.username?.charAt(0) || '?'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <p className={`font-medium ${isCurrentUser ? 'text-blue-700' : 'text-gray-800'}`}>
                            {entry.full_name || entry.username || 'Anonymous'}
                            {isCurrentUser && <span className="ml-2 text-blue-600">(You)</span>}
                          </p>
                          <p className="text-sm text-gray-500">
                            {entry.total_quizzes} quizzes • {entry.current_streak} day streak
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800">
                          {entry.total_score.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">points</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {leaderboard.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No leaderboard data available yet. Start taking quizzes to join the rankings!
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
