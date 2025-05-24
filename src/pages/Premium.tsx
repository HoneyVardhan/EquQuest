
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Crown, Zap, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Premium = () => {
  const [isYearly, setIsYearly] = useState(false);

  const features = [
    { icon: Zap, title: 'Unlimited Quizzes', description: 'No cooldown periods between quizzes' },
    { icon: Star, title: 'Advanced Analytics', description: 'Detailed performance tracking and insights' },
    { icon: Shield, title: 'Priority Support', description: '24/7 premium customer support' },
    { icon: Crown, title: 'Exclusive Content', description: 'Access to premium-only quiz topics' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center max-w-4xl mx-auto">
          <Link 
            to="/topics"
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 text-gray-700 hover:bg-white/80 backdrop-blur-md transition-all duration-300"
          >
            <ArrowLeft size={20} />
            <span>Back to Topics</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <Crown className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Unlock Premium Learning
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Take your learning to the next level with unlimited access and premium features
              </p>
            </div>

            {/* Pricing Toggle */}
            <div className="flex items-center justify-center mb-8">
              <span className={`mr-3 ${!isYearly ? 'font-semibold' : 'text-gray-500'}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                  isYearly ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                    isYearly ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-3 ${isYearly ? 'font-semibold' : 'text-gray-500'}`}>
                Yearly <span className="text-green-600 text-sm">(Save 20%)</span>
              </span>
            </div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-md mx-auto mb-12"
            >
              <Card className="relative overflow-hidden border-2 border-purple-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
                <CardHeader className="relative text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mb-4 mx-auto">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Premium Plan</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl font-bold text-purple-600">₹359</span>
                      <span className="text-lg text-gray-500 line-through">₹999</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">Limited Time Offer!</p>
                    <p className="text-gray-500 mt-1">
                      {isYearly ? 'per year' : 'per month'}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <ul className="space-y-3 mb-6">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">{feature.title}</span>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3">
                    Upgrade to Premium
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <feature.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        © 2025 EduQuest. Contact us at welcome@eduquest.com
      </footer>
    </div>
  );
};

export default Premium;
