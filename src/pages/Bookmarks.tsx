
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Trash2, Play, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { getUserBookmarks, removeBookmark, type BookmarkedQuestion } from '@/utils/supabaseEnhanced';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const { isAuthenticated } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      loadBookmarks();
    }
  }, [isAuthenticated]);

  const loadBookmarks = async () => {
    try {
      const data = await getUserBookmarks();
      setBookmarks(data);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      toast({
        title: "Error",
        description: "Failed to load bookmarks",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (questionId: number, topicId: string) => {
    const success = await removeBookmark(questionId, topicId);
    if (success) {
      setBookmarks(prev => prev.filter(b => 
        !(b.question_id === questionId && b.topic_id === topicId)
      ));
      toast({
        title: "Success",
        description: "Bookmark removed successfully"
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to remove bookmark",
        variant: "destructive"
      });
    }
  };

  const handleTakeQuiz = (topicId: string) => {
    navigate(`/quiz/${topicId}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="w-96 text-center">
          <CardContent className="p-8">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-4">Please log in to view your bookmarked questions.</p>
            <Button onClick={() => navigate('/login')}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            📚 Your Bookmarks
          </h1>
          <p className="text-gray-600 text-lg">
            Review your saved questions and practice at your own pace
          </p>
        </motion.div>

        {bookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="w-96 mx-auto">
              <CardContent className="p-8">
                <Bookmark className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">No Bookmarks Yet</h2>
                <p className="text-gray-600 mb-4">
                  Start taking quizzes and bookmark questions you'd like to review later.
                </p>
                <Button onClick={() => navigate('/topics')}>
                  <Play className="w-4 h-4 mr-2" />
                  Take a Quiz
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {bookmarks.map((bookmark, index) => (
              <motion.div
                key={`${bookmark.question_id}-${bookmark.topic_id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-800 mb-2">
                          {bookmark.question_data.question}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">
                            {bookmark.topic_id.replace('-', ' ').toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            Question #{bookmark.question_data.id}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveBookmark(bookmark.question_id, bookmark.topic_id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {bookmark.question_data.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border ${
                              optionIndex === bookmark.question_data.correctAnswer
                                ? 'bg-green-50 border-green-200 text-green-800'
                                : 'bg-gray-50 border-gray-200 text-gray-700'
                            }`}
                          >
                            <span className="font-medium">
                              {String.fromCharCode(65 + optionIndex)}. 
                            </span>{' '}
                            {option}
                            {optionIndex === bookmark.question_data.correctAnswer && (
                              <Badge className="ml-2 bg-green-500">Correct</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {bookmark.question_data.explanation && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-800 mb-2">Explanation:</h4>
                          <p className="text-blue-700">{bookmark.question_data.explanation}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-500">
                          Bookmarked {new Date(bookmark.bookmarked_at).toLocaleDateString()}
                        </span>
                        <Button
                          onClick={() => handleTakeQuiz(bookmark.topic_id)}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Practice This Topic
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
