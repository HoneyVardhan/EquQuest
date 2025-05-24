
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Crown, Zap, Shield, Star, Bot, Trophy, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface PremiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumUpgradeModal: React.FC<PremiumUpgradeModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleUpgrade = (plan: 'monthly' | 'yearly') => {
    console.log(`Upgrading to ${plan} plan`);
    navigate('/unlock-premium');
    onClose();
  };

  const features = [
    {
      name: 'Daily Quizzes',
      free: 'Limited',
      premium: 'Unlimited',
      icon: <Zap className="w-5 h-5" />
    },
    {
      name: 'Streak Tracking',
      free: 'Basic',
      premium: 'Milestone Rewards + Celebrations',
      icon: <Trophy className="w-5 h-5" />
    },
    {
      name: 'Lifelines (Hint/Skip)',
      free: false,
      premium: true,
      icon: <Shield className="w-5 h-5" />
    },
    {
      name: 'Leaderboard Access',
      free: false,
      premium: true,
      icon: <Star className="w-5 h-5" />
    },
    {
      name: 'AI-Powered Quiz Support',
      free: false,
      premium: true,
      icon: <Bot className="w-5 h-5" />
    },
    {
      name: 'Certificates',
      free: 'Basic',
      premium: 'Premium Certificates',
      icon: <Trophy className="w-5 h-5" />
    },
    {
      name: 'Dark Mode & Language Options',
      free: false,
      premium: true,
      icon: <Globe className="w-5 h-5" />
    },
    {
      name: 'Early Access to New Features',
      free: false,
      premium: true,
      icon: <Crown className="w-5 h-5" />
    }
  ];

  const renderFeatureValue = (value: string | boolean, isPremium: boolean = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex items-center justify-center">
          <Check className="w-5 h-5 text-green-600" />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <X className="w-5 h-5 text-red-500" />
        </div>
      );
    }
    return (
      <span className={`text-sm ${isPremium ? 'text-purple-700 font-semibold' : 'text-gray-600'}`}>
        {value}
      </span>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="w-7 h-7 text-purple-600" />
            Upgrade to Premium
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Section */}
          <div className="text-center py-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Unlock Your Learning Potential
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get unlimited access to advanced features, AI support, and premium certificates
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-800">Feature</th>
                  <th className="text-center p-4 font-semibold text-gray-800">
                    Basic (Free)
                  </th>
                  <th className="text-center p-4 font-semibold text-purple-700 bg-purple-50">
                    <div className="flex items-center justify-center gap-2">
                      <Crown className="w-5 h-5" />
                      Premium
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-purple-600">
                          {feature.icon}
                        </div>
                        <span className="font-medium text-gray-800">
                          {feature.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {renderFeatureValue(feature.free)}
                    </td>
                    <td className="p-4 text-center bg-purple-50/50">
                      {renderFeatureValue(feature.premium, true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Monthly Plan</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-purple-600">₹199</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>
              <Button
                onClick={() => handleUpgrade('monthly')}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                Get Monthly
              </Button>
            </motion.div>

            {/* Yearly Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border-2 border-purple-300 rounded-lg p-6 hover:shadow-lg transition-shadow relative"
            >
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                Best Value
              </Badge>
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Yearly Plan</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-purple-600">₹999</span>
                  <span className="text-gray-500">/year</span>
                </div>
                <div className="text-sm text-green-600 font-medium mt-1">
                  Save ₹1,389 yearly!
                </div>
              </div>
              <Button
                onClick={() => handleUpgrade('yearly')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                Get Yearly
              </Button>
            </motion.div>
          </div>

          {/* Trust Badge */}
          <div className="text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
            <Shield className="w-5 h-5 inline mr-2" />
            No credit card stored. Cancel anytime. 30-day money-back guarantee.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumUpgradeModal;
