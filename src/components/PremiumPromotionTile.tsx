
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { checkPremiumStatus } from '../utils/supabaseEnhanced';

const PremiumPromotionTile = () => {
  const { isAuthenticated } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      if (isAuthenticated) {
        const premiumStatus = await checkPremiumStatus();
        setIsPremium(premiumStatus);
      }
      setLoading(false);
    };
    checkStatus();
  }, [isAuthenticated]);

  if (loading || !isAuthenticated || isPremium) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <Card className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-600 border-0 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold mb-1">Unlock Premium Learning!</h3>
                <p className="text-white/90 mb-2">Boost your learning with AI assistance & certificates</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>AI Tutor</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Certificates</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Crown className="w-4 h-4" />
                    <span>Premium Content</span>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/unlock-premium"
              className="flex items-center space-x-2 px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>Unlock Premium</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PremiumPromotionTile;
