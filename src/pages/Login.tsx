
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/topics');
    }
  }, [isAuthenticated, navigate]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigate('/topics');
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to EduQuest</h1>
        <p className="text-lg text-gray-600 mb-8">
          Enter your details to start your learning journey
        </p>
      </motion.div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={handleClose}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Login;
