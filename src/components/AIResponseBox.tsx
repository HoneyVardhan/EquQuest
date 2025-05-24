
import React from 'react';
import { motion } from 'framer-motion';
import { X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AIResponseBoxProps {
  question: string;
  response: string;
  onClose: () => void;
}

const AIResponseBox: React.FC<AIResponseBoxProps> = ({ question, response, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 right-6 z-50 max-w-md w-full"
    >
      <Card className="backdrop-blur-md bg-white/90 border-white/20 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="w-5 h-5 text-blue-600" />
              AI Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-800 mb-1 text-sm">Your Question:</h4>
            <p className="text-gray-600 text-sm bg-blue-50 p-2 rounded">{question}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1 text-sm">AI Response:</h4>
            <div className="text-gray-700 text-sm bg-gray-50 p-3 rounded max-h-40 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans">{response}</pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIResponseBox;
