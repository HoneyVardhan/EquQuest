
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, Trash2, MessageSquare, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AIMessage {
  id: string;
  question: string;
  response: string;
  timestamp: string;
}

const AIMessages = () => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    try {
      const stored = localStorage.getItem('aiMessageHistory');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading AI messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = (id: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('aiMessageHistory', JSON.stringify(updatedMessages));
    toast.success('Message deleted');
  };

  const clearAllMessages = () => {
    setMessages([]);
    localStorage.removeItem('aiMessageHistory');
    localStorage.removeItem('lastAISession');
    toast.success('All messages cleared');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
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

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <Bot className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Messages</h1>
            <p className="text-gray-600">Your conversation history with the AI assistant</p>
          </div>

          {messages.length === 0 ? (
            <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-xl">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No messages yet</h3>
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
                          <Bot className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-gray-800">AI Assistant</span>
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
                          <p className="font-medium text-gray-800 mb-1">Response:</p>
                          <p className="text-gray-700 whitespace-pre-wrap">{message.response}</p>
                        </div>
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
