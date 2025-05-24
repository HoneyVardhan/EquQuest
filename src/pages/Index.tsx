
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import AIResponseBox from '@/components/AIResponseBox';
import { getLastAISession, clearAISession } from '@/utils/geminiAI';

const Index = () => {
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [aiSession, setAiSession] = useState<{question: string, response: string} | null>(null);

  useEffect(() => {
    // Check for saved AI session when component mounts
    const lastSession = getLastAISession();
    if (lastSession) {
      setAiSession({
        question: lastSession.question,
        response: lastSession.response
      });
      setShowAIResponse(true);
    }
  }, []);

  const handleCloseAIResponse = () => {
    setShowAIResponse(false);
    setAiSession(null);
    clearAISession();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* AI Response Box */}
      <AnimatePresence>
        {showAIResponse && aiSession && (
          <AIResponseBox
            question={aiSession.question}
            response={aiSession.response}
            onClose={handleCloseAIResponse}
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/40 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                EduQuest
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link to="/topics" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Topics
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/premium"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Crown className="w-4 h-4" />
                <span>Upgrade Premium</span>
              </Link>
              <Link 
                to="/login"
                className="px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full font-semibold transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EduQuest</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Learn smarter, challenge yourself, earn certificates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/topics"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-10 left-1/4 backdrop-blur-md bg-white/30 p-4 rounded-2xl shadow-lg"
              >
                <BookOpen className="w-8 h-8 text-blue-600" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-5 right-1/4 backdrop-blur-md bg-white/30 p-4 rounded-2xl shadow-lg"
              >
                <Award className="w-8 h-8 text-purple-600" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose EduQuest?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform offers an engaging learning experience with interactive quizzes and comprehensive skill development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/40 p-8 rounded-3xl shadow-lg border border-white/20 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Learning</h3>
              <p className="text-gray-600">
                Engage with carefully crafted quizzes designed to test and improve your knowledge across various subjects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/40 p-8 rounded-3xl shadow-lg border border-white/20 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Expert Content</h3>
              <p className="text-gray-600">
                Learn from industry experts with content that's practical, up-to-date, and relevant to your career goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/40 p-8 rounded-3xl shadow-lg border border-white/20 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Earn Certificates</h3>
              <p className="text-gray-600">
                Showcase your achievements with personalized certificates that validate your skills and knowledge.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-12 rounded-3xl shadow-xl border border-white/20"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of learners who are advancing their careers with EduQuest.
            </p>
            <Link 
              to="/topics"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Explore Topics</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-gray-600">
        <div className="max-w-7xl mx-auto">
          <p>© 2025 EduQuest. Contact us at welcome@eduquest.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
