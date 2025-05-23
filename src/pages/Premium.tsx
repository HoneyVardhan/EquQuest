
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, X, Star, Award, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Premium = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        { name: 'Limited access with cooldowns', included: true },
        { name: 'Basic certificates only', included: true },
        { name: 'No badges or sharing', included: false },
        { name: 'Limited quiz questions', included: true },
        { name: 'Basic progress tracking', included: true }
      ],
      popular: false,
      buttonText: 'Current Plan',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Premium',
      price: '$9.99/month',
      description: 'Unlock your full learning potential',
      features: [
        { name: 'Unlock all quiz levels', included: true },
        { name: 'Premium certificates with your name', included: true },
        { name: 'LinkedIn & social media badges', included: true },
        { name: 'No cooldowns or restrictions', included: true },
        { name: 'Advanced progress analytics', included: true },
        { name: 'Priority customer support', included: true }
      ],
      popular: true,
      buttonText: 'Upgrade Now',
      buttonVariant: 'default' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <a href="/" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 text-gray-700 hover:bg-white/80 transition-all duration-300">
            <span>← Back to Home</span>
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-800">Choose Your Plan</h1>
          </div>
          <p className="text-xl text-gray-600">Unlock premium features and accelerate your learning</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className={`relative backdrop-blur-md border-2 shadow-xl h-full ${
                plan.popular 
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-500' 
                  : 'bg-white/60 border-white/20'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                    {plan.name === 'Premium' && <span className="text-gray-600 ml-1">/month</span>}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6">
                    <Button 
                      variant={plan.buttonVariant}
                      className="w-full"
                      disabled={plan.name === 'Basic'}
                    >
                      {plan.name === 'Premium' && <Crown className="w-4 h-4 mr-2" />}
                      {plan.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Premium Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Premium Benefits
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-lg text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Professional Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get personalized certificates with your name that you can proudly display
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-lg text-center">
              <CardHeader>
                <Share2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Social Media Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Share your achievements on LinkedIn and other social platforms
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-lg text-center">
              <CardHeader>
                <Crown className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Unlimited Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No cooldowns, no restrictions. Learn at your own pace, anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        © 2025 EduQuest. Contact us at welcome@eduquest.com
      </footer>
    </div>
  );
};

export default Premium;
