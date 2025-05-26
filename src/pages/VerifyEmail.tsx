import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { resendEmailVerification } from '../utils/supabaseEnhanced';

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const success = await resendEmailVerification();
      if (success) {
        toast.success('Verification email sent! Please check your inbox.');
      } else {
        toast.error('Failed to send verification email. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="relative z-10 p-6">
        <div className="flex items-center max-w-4xl mx-auto">
          <Link 
            to="/"
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 text-gray-700 hover:bg-white/80 backdrop-blur-md transition-all duration-300"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Verify Your Email
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-gray-600">
                We've sent a verification email to your address. Please check your inbox and click the verification link to access premium features.
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="w-full"
                  variant="outline"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or click resend.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyEmail;
