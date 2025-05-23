
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Mail, Lock, Github, Phone, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const Auth = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock auth functions
  const handleEmailSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to home after successful login
      window.location.href = '/';
    }, 1500);
  };

  const handleSocialSignIn = (provider: string) => {
    setIsLoading(true);
    console.log(`Signing in with ${provider}`);
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to home after successful login
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
            darkMode 
              ? 'bg-white/10 text-white hover:bg-white/20' 
              : 'bg-white/60 text-gray-700 hover:bg-white/80'
          }`}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className={`flex items-center p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
            darkMode 
              ? 'bg-white/10 text-white hover:bg-white/20' 
              : 'bg-white/60 text-gray-700 hover:bg-white/80'
          }`}
        >
          <ArrowLeft size={24} />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`max-w-md w-full ${
            darkMode 
              ? 'text-white' 
              : 'text-gray-800'
          }`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-center ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Welcome to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduQuest
            </span>
          </h2>

          <Card className={`backdrop-blur-md rounded-2xl shadow-xl ${
            darkMode 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-white/60 border border-white/20'
          }`}>
            <CardHeader className="pb-2">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className={`grid w-full grid-cols-2 ${
                  darkMode
                    ? 'bg-white/10'
                    : 'bg-gray-100/70'
                }`}>
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-4">
                  <form onSubmit={handleEmailSignIn}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Email</Label>
                        <div className="relative">
                          <Mail className={`absolute left-3 top-2.5 h-5 w-5 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <Input
                            id="email"
                            placeholder="you@example.com"
                            type="email"
                            required
                            className={`pl-10 ${
                              darkMode
                                ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400'
                                : 'bg-white/80 border-gray-200'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Password</Label>
                          <Link to="#" className={`text-sm font-medium ${
                            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                          }`}>
                            Forgot your password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className={`absolute left-3 top-2.5 h-5 w-5 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <Input
                            id="password"
                            type="password"
                            required
                            className={`pl-10 ${
                              darkMode
                                ? 'bg-white/10 border-white/20 text-white'
                                : 'bg-white/80 border-gray-200'
                            }`}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-4">
                  <form onSubmit={handleEmailSignIn}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          required
                          className={`${
                            darkMode
                              ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400'
                              : 'bg-white/80 border-gray-200'
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Email</Label>
                        <div className="relative">
                          <Mail className={`absolute left-3 top-2.5 h-5 w-5 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <Input
                            id="signup-email"
                            placeholder="you@example.com"
                            type="email"
                            required
                            className={`pl-10 ${
                              darkMode
                                ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400'
                                : 'bg-white/80 border-gray-200'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Password</Label>
                        <div className="relative">
                          <Lock className={`absolute left-3 top-2.5 h-5 w-5 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <Input
                            id="signup-password"
                            type="password"
                            required
                            className={`pl-10 ${
                              darkMode
                                ? 'bg-white/10 border-white/20 text-white'
                                : 'bg-white/80 border-gray-200'
                            }`}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardHeader>

            <CardFooter className="flex flex-col pt-2">
              <div className="relative my-4 w-full">
                <div className="absolute inset-0 flex items-center">
                  <Separator className={darkMode ? "bg-white/20" : "bg-gray-200"} />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className={`px-2 ${
                    darkMode ? 'bg-black/80 text-white/70' : 'bg-white/60 text-gray-500'
                  }`}>
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleSocialSignIn("google")}
                  className={`${
                    darkMode
                      ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <svg className="h-5 w-5" stroke="none" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.908 8.908 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleSocialSignIn("github")}
                  className={`${
                    darkMode
                      ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleSocialSignIn("phone")}
                  className={`${
                    darkMode
                      ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className={`absolute bottom-0 left-0 right-0 py-6 text-center transition-all duration-500 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <div className={`backdrop-blur-md py-2 ${
          darkMode ? 'bg-black/20' : 'bg-white/40'
        }`}>
          © 2025 EduQuest. Contact us at welcome@eduquest.com
        </div>
      </footer>
    </div>
  );
};

export default Auth;
