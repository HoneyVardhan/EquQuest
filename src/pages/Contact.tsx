
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { callGeminiAPI, saveAISession } from '@/utils/geminiAI';
import { useNavigate } from 'react-router-dom';
import AIResponseBox from '@/components/AIResponseBox';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [aiQuestion, setAiQuestion] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<{
    question: string;
    response: string;
    type: 'general';
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    console.log('📧 Contact form submitted');
  };

  const handleAiQuestion = async () => {
    if (!aiQuestion.trim()) {
      toast.error('Please enter a question');
      return;
    }

    setIsAiLoading(true);
    console.log('🤖 Processing AI question:', aiQuestion);
    
    try {
      const response = await callGeminiAPI(aiQuestion, { type: 'general' });
      
      // Save to localStorage for persistence
      saveAISession(aiQuestion, response, { type: 'general' });
      
      // Show response in popup
      setAiResponse({
        question: aiQuestion,
        response,
        type: 'general'
      });
      
      toast.success('AI response received!');
      console.log('✅ AI response generated successfully');
      
      // Clear input
      setAiQuestion('');
      
    } catch (error) {
      console.error('❌ AI Error:', error);
      toast.error('Failed to get AI response. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCloseAIResponse = () => {
    setAiResponse(null);
  };

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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Get in touch with the EduQuest team or ask our AI assistant</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>welcome@eduquest.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Assistant */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Bot className="w-5 h-5" />
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  </div>
                  AI Assistant
                </CardTitle>
                <CardDescription>
                  Ask any question about EduQuest, learning strategies, or educational topics. 
                  Our AI is powered by Gemini and provides instant, personalized responses.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Question
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ask anything about EduQuest, study tips, quiz strategies, or educational topics..."
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button 
                  onClick={handleAiQuestion} 
                  disabled={isAiLoading || !aiQuestion.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isAiLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Getting AI Response...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask AI Assistant
                    </>
                  )}
                </Button>

                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  💡 Tip: Be specific with your questions for better AI responses. 
                  You can ask about quiz strategies, learning techniques, or specific educational topics!
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* AI Response Popup */}
      {aiResponse && (
        <AIResponseBox
          question={aiResponse.question}
          response={aiResponse.response}
          type={aiResponse.type}
          onClose={handleCloseAIResponse}
        />
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        © 2025 EduQuest. Contact us at welcome@eduquest.com
      </footer>
    </div>
  );
};

export default Contact;
