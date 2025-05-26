
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, Trash2, MessageSquare, Clock, Sparkles, Lightbulb, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { testGeminiConnection, type AIMessage } from '@/utils/geminiAI';
import { testSupabaseConnection } from '@/utils/supabaseQuizStorage';

const AIMessages = () => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState<{
    gemini: { success: boolean; response?: string; error?: string } | null;
    supabase: { success: boolean; userAuthenticated: boolean; error?: string } | null;
  }>({
    gemini: null,
    supabase: null
  });

  useEffect(() => {
    loadMessages();
    runSystemDiagnostics();
  }, []);

  const loadMessages = () => {
    try {
      console.log('📱 Loading AI messages...');
      const stored = localStorage.getItem('aiMessageHistory');
      if (stored) {
        const parsedMessages = JSON.parse(stored);
        setMessages(parsedMessages);
        console.log(`✅ Loaded ${parsedMessages.length} AI messages`);
      }
    } catch (error) {
      console.error('❌ Error loading AI messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const runSystemDiagnostics = async () => {
    console.log('🔧 Running system diagnostics...');
    
    try {
      // Test Gemini AI connection
      const geminiResult = await testGeminiConnection();
      setSystemStatus(prev => ({ ...prev, gemini: geminiResult }));
      
      // Test Supabase connection
      const supabaseResult = await testSupabaseConnection();
      setSystemStatus(prev => ({ ...prev, supabase: supabaseResult }));
      
      console.log('📊 System diagnostics completed');
      
      if (geminiResult.success && supabaseResult.success) {
        toast.success('All AI systems operational!');
      } else {
        toast.warning('Some systems may have issues. Check diagnostics below.');
      }
      
    } catch (error) {
      console.error('❌ Error running diagnostics:', error);
      toast.error('System diagnostics failed');
    }
  };

  const deleteMessage = (id: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('aiMessageHistory', JSON.stringify(updatedMessages));
    toast.success('Message deleted');
    console.log('🗑️ AI message deleted:', id);
  };

  const clearAllMessages = () => {
    setMessages([]);
    localStorage.removeItem('aiMessageHistory');
    localStorage.removeItem('lastAISession');
    toast.success('All messages cleared');
    console.log('🗑️ All AI messages cleared');
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'wrong_answer':
        return <Lightbulb className="w-4 h-4 text-orange-500" />;
      case 'quiz_help':
        return <Bot className="w-4 h-4 text-green-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
    }
  };

  const getMessageBadge = (type: string) => {
    switch (type) {
      case 'wrong_answer':
        return <Badge className="bg-orange-100 text-orange-800">Learning Help</Badge>;
      case 'quiz_help':
        return <Badge className="bg-green-100 text-green-800">Study Help</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">General</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link 
            to="/"
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 text-gray-700 hover:bg-white/80 backdrop-blur-md transition-all duration-300"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex gap-2">
            <Button
              onClick={runSystemDiagnostics}
              variant="outline"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Sparkles size={16} className="mr-2" />
              Test AI Systems
            </Button>
            
            {messages.length > 0 && (
              <Button
                onClick={clearAllMessages}
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 size={16} className="mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bot className="w-16 h-16 text-blue-600" />
              <Sparkles className="w-8 h-8 text-purple-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Messages & Diagnostics</h1>
            <p className="text-gray-600">Your conversation history and system status</p>
          </div>

          {/* System Status */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Gemini AI Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {systemStatus.gemini ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        systemStatus.gemini.success ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className={systemStatus.gemini.success ? 'text-green-700' : 'text-red-700'}>
                        {systemStatus.gemini.success ? 'Operational' : 'Error'}
                      </span>
                    </div>
                    {systemStatus.gemini.error && (
                      <p className="text-xs text-red-600">{systemStatus.gemini.error}</p>
                    )}
                    {systemStatus.gemini.response && (
                      <p className="text-xs text-gray-600">
                        Last test: {systemStatus.gemini.response.substring(0, 50)}...
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">Testing...</p>
                )}
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-green-600" />
                  Supabase Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {systemStatus.supabase ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        systemStatus.supabase.success ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className={systemStatus.supabase.success ? 'text-green-700' : 'text-red-700'}>
                        {systemStatus.supabase.success ? 'Connected' : 'Error'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        systemStatus.supabase.userAuthenticated ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className={systemStatus.supabase.userAuthenticated ? 'text-green-700' : 'text-yellow-700'}>
                        {systemStatus.supabase.userAuthenticated ? 'User Authenticated' : 'Not Authenticated'}
                      </span>
                    </div>
                    {systemStatus.supabase.error && (
                      <p className="text-xs text-red-600">{systemStatus.supabase.error}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">Testing...</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Messages */}
          {messages.length === 0 ? (
            <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-xl">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No AI messages yet</h3>
                <p className="text-gray-600 mb-6">Start asking questions to your AI assistant!</p>
                <Link to="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Ask AI Assistant
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <Badge className="bg-blue-100 text-blue-800">
                  {messages.length} Total Messages
                </Badge>
              </div>
              
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-xl">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getMessageIcon(message.type)}
                          <span className="font-medium text-gray-800">AI Assistant</span>
                          {getMessageBadge(message.type)}
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock size={14} />
                            <span>{new Date(message.timestamp).toLocaleString()}</span>
                          </div>
                          <Button
                            onClick={() => deleteMessage(message.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="font-medium text-blue-800 mb-1">Question:</p>
                          <p className="text-blue-700">{message.question}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-gray-800 mb-1">AI Response:</p>
                          <p className="text-gray-700 whitespace-pre-wrap">{message.response}</p>
                        </div>
                        {message.context && (
                          <div className="bg-purple-50 rounded-lg p-2">
                            <p className="text-xs text-purple-600">
                              Context: {message.context.topic && `Topic: ${message.context.topic}`}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AIMessages;
