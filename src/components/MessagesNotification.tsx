
import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface MessagesNotificationProps {
  darkMode?: boolean;
}

const MessagesNotification: React.FC<MessagesNotificationProps> = ({ darkMode = false }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      return;
    }

    const fetchUnreadCount = async () => {
      try {
        // Check for AI session messages as a simple notification system
        const hasAIMessages = localStorage.getItem('lastAISession');
        const lastNotificationCheck = localStorage.getItem(`lastNotificationCheck_${user.id}`);
        const currentTime = Date.now();
        
        // If there's an AI session and we haven't checked in the last hour, show notification
        if (hasAIMessages && (!lastNotificationCheck || (currentTime - parseInt(lastNotificationCheck)) > 3600000)) {
          setUnreadCount(1);
        } else {
          setUnreadCount(0);
        }
      } catch (error) {
        console.error('Error checking notifications:', error);
        setUnreadCount(0);
      }
    };

    fetchUnreadCount();

    // Check every 30 seconds for new notifications
    const interval = setInterval(fetchUnreadCount, 30000);

    return () => clearInterval(interval);
  }, [user]);

  const handleClick = () => {
    if (user) {
      // Mark as read
      localStorage.setItem(`lastNotificationCheck_${user.id}`, Date.now().toString());
      setUnreadCount(0);
    }
    navigate('/ai-messages');
  };

  if (!user) return null;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className={`relative ${
          darkMode 
            ? 'text-white hover:bg-white/10' 
            : 'text-gray-700 hover:bg-black/5'
        }`}
        aria-label={`Messages ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <MessageSquare className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center animate-pulse"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default MessagesNotification;
