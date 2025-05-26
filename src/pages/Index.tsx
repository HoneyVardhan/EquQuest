import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Trophy, Users, Star, ArrowRight, LogIn } from 'lucide-react';
import UserProfile from '../components/UserProfile';
import AIResponseBox from '../components/AIResponseBox';
import ProgressDashboard from '../components/ProgressDashboard';
import PremiumPromotionTile from '../components/PremiumPromotionTile';
import PremiumUpgradeModal from '../components/PremiumUpgradeModal';
import PremiumBadge from '../components/PremiumBadge';
import PremiumUpgradeButton from '../components/PremiumUpgradeButton';
import MessagesNotification from '../components/MessagesNotification';
import { useAuth } from '@/hooks/useAuth';
import { getLastAISession, clearAISession } from '../utils/geminiAI';
import { checkPremiumStatus } from '../utils/supabaseEnhanced';
import type { AIQASession } from '../utils/geminiAI';
import TopicProgress from '../components/TopicProgress';
import SmartRevision from '../components/SmartRevision';
import { scheduleDaily9AMNotification } from '../utils/dailyNotifications';
import { getUserStreak } from '../utils/supabaseEnhanced';

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const [aiSession, setAiSession] = useState<AIQASession | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumLoading, setPremiumLoading] = useState(false);

  useEffect(() => {
    // Load AI session from localStorage
    const lastSession = getLastAISession();
    setAiSession(lastSession);

    // Check premium status and set up notifications if authenticated
    const checkStatusAndSetupNotifications = async () => {
      if (isAuthenticated) {
        setPremiumLoading(true);
        try {
          const [premiumStatus, currentStreak] = await Promise.all([
            checkPremiumStatus(),
            getUserStreak()
          ]);
          setIsPremium(premiumStatus);
          
          // Set up daily notifications
          await scheduleDaily9AMNotification(currentStreak);
        } catch (error) {
          console.error('Error checking premium status:', error);
          setIsPremium(false);
        } finally {
          setPremiumLoading(false);
        }
      } else {
        setIsPremium(false);
        setPremiumLoading(false);
      }
    };
    checkStatusAndSetupNotifications();
  }, [isAuthenticated]);

  const handleCloseAIResponse = () => {
    setAiSession(null);
    clearAISession();
  };

  const handlePremiumUpgrade = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setShowPremiumModal(true);
  };

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Quizzes",
      description: "Test your knowledge with engaging, topic-based quizzes designed to enhance learning.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Target,
      title: "Skill Assessment",
      description: "Track your progress and identify areas for improvement with detailed analytics.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Earn badges and certificates as you complete challenges and reach milestones.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with fellow learners and share your educational journey.",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      content: "EduQuest has transformed my learning experience. The interactive quizzes are engaging and help me retain information better.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Professional",
      content: "The skill assessments helped me identify my knowledge gaps and improve my expertise in data science.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Educator",
      content: "I recommend EduQuest to all my students. It's an excellent platform for self-paced learning and assessment.",
      rating: 5
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative z-20 p-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">EduQuest</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/topics" className="text-gray-600 hover:text-gray-800 transition-colors">
              Topics
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-800 transition-colors">
              Contact
            </Link>
            
            {isAuthenticated && (
              <>
                <MessagesNotification />
                {!premiumLoading && isPremium && <PremiumBadge variant="navbar" />}
                {!premiumLoading && !isPremium && (
                  <PremiumUpgradeButton 
                    onClick={handlePremiumUpgrade}
                    variant="compact"
                  />
                )}
                <UserProfile />
              </>
            )}
            
            {!isAuthenticated && (
              <>
                <PremiumUpgradeButton 
                  onClick={handlePremiumUpgrade}
                  variant="secondary"
                  className="mr-2"
                />
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <LogIn size={16} />
                  <span>Sign In</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Premium Upgrade Modal */}
      <PremiumUpgradeModal 
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />

      {/* AI Response Box */}
      <AnimatePresence>
        {aiSession && (
          <AIResponseBox
            question={aiSession.question}
            response={aiSession.response}
            onClose={handleCloseAIResponse}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Ignite Your Curiosity with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> EduQuest</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Embark on an educational journey with interactive quizzes, personalized assessments, and achievement tracking. 
              Learn, grow, and excel with our comprehensive learning platform.
            </p>
            
            <div className="flex justify-center">
              <Link
                to="/topics"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Learning Today
              </Link>
            </div>
          </motion.div>

          {/* Premium Promotion Tile */}
          {!isPremium && !premiumLoading && <PremiumPromotionTile />}

          {/* Progress Dashboard for authenticated users */}
          {isAuthenticated && <ProgressDashboard />}

          {/* Topic Progress */}
          {isAuthenticated && <TopicProgress />}

          {/* Smart Revision */}
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <SmartRevision />
            </motion.div>
          )}

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Learners Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/20 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center backdrop-blur-md bg-white/60 rounded-3xl p-12 border border-white/20 shadow-lg"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already advancing their skills with EduQuest's interactive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/topics"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Explore Topics</span>
                <ArrowRight size={20} />
              </Link>
              {!isPremium && !premiumLoading && (
                <PremiumUpgradeButton 
                  onClick={handlePremiumUpgrade}
                  variant="secondary"
                />
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center text-gray-600 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">EduQuest</span>
            </div>
            <p>© 2025 EduQuest. Contact us at welcome@eduquest.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
