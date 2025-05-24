
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Award, Bot, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UnlockPremium = () => {
  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    // Placeholder for subscription logic
    console.log(`Subscribe to ${plan} plan`);
  };

  const features = [
    { icon: Bot, title: 'AI Tutor', description: 'Get personalized help and explanations' },
    { icon: Award, title: 'Certificates', description: 'Earn official completion certificates' },
    { icon: Star, title: 'Streak Tracking', description: 'Track your learning progress' },
    { icon: Crown, title: 'Premium Content', description: 'Access to advanced quiz topics' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Crown className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Unlock Premium Learning
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get access to AI tutoring, certificates, streak tracking, and premium content
          </p>
        </motion.div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl h-full">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Basic Plan</CardTitle>
                <p className="text-sm text-gray-600">Free</p>
                <div className="text-4xl font-bold text-gray-800 mt-4">$0</div>
                <p className="text-gray-500">Forever</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Basic quiz access</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Basic certificates</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="backdrop-blur-md bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 shadow-xl h-full relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                  <Crown className="w-6 h-6 text-purple-600" />
                  Premium Plan
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-purple-600">₹359</span>
                    <span className="text-lg text-gray-500 line-through">₹999</span>
                  </div>
                  <p className="text-gray-500">per month</p>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-purple-600">₹999</span>
                    <span className="text-lg text-gray-500 line-through ml-2">₹4300</span>
                    <p className="text-gray-500">per year (Save 20%)</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>AI Tutor Assistant</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Premium Certificates</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Priority Support</span>
                  </li>
                </ul>
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleSubscribe('monthly')}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Subscribe Monthly - ₹359
                  </Button>
                  <Button 
                    onClick={() => handleSubscribe('yearly')}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    variant="outline"
                  >
                    Subscribe Yearly - ₹999
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 backdrop-blur-md bg-white/60">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-600">
            Questions? Contact us at{' '}
            <a href="mailto:support@eduquest.com" className="text-purple-600 hover:underline">
              support@eduquest.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UnlockPremium;
