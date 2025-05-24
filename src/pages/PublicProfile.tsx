
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Award, Trophy, Calendar } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPublicProfile, getUserCertificates, getUserQuizResults } from '../utils/supabaseEnhanced';
import type { UserProfile, Certificate, QuizResult } from '../utils/supabaseEnhanced';

const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      try {
        const profileData = await getPublicProfile(username);
        if (profileData) {
          setProfile(profileData);
          const [certsData, resultsData] = await Promise.all([
            getUserCertificates(profileData.id),
            getUserQuizResults(profileData.id)
          ]);
          setCertificates(certsData);
          setQuizResults(resultsData);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-6">The user profile you're looking for doesn't exist.</p>
          <Link to="/" className="text-blue-600 hover:underline">Go back to home</Link>
        </div>
      </div>
    );
  }

  const averageScore = quizResults.length > 0 
    ? Math.round(quizResults.reduce((sum, result) => sum + (result.score / result.total) * 100, 0) / quizResults.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Header */}
          <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {profile.full_name || profile.username}
                  </h1>
                  <p className="text-gray-600">@{profile.username}</p>
                  {profile.is_premium && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white mt-2">
                      <Trophy className="w-4 h-4 mr-1" />
                      Premium Member
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">{certificates.length}</h3>
                <p className="text-gray-600">Certificates Earned</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">{quizResults.length}</h3>
                <p className="text-gray-600">Quizzes Completed</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">{averageScore}%</h3>
                <p className="text-gray-600">Average Score</p>
              </CardContent>
            </Card>
          </div>

          {/* Certificates */}
          <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              {certificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certificates.map((cert, index) => (
                    <div key={cert.id} className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-between mb-2">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                        <span className="text-sm text-gray-600">
                          {Math.round((cert.score / cert.total) * 100)}%
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-800">{cert.topic_id}</h4>
                      <p className="text-sm text-gray-600">
                        Earned {new Date(cert.issued_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No certificates earned yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Quiz Results */}
          <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Quiz Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {quizResults.length > 0 ? (
                <div className="space-y-3">
                  {quizResults.slice(0, 10).map((result, index) => (
                    <div key={result.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">{result.topic_id}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(result.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">
                          {result.score}/{result.total}
                        </div>
                        <div className="text-sm text-gray-600">
                          {Math.round((result.score / result.total) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No quiz results yet.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicProfile;
