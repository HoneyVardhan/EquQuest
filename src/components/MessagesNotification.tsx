
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

    // For now, we'll simulate unread messages since we don't have a notifications table
    // In a real implementation, you'd query the notifications table
    const fetchUnreadCount = async () => {
      try {
        // Placeholder logic - in reality you'd query your notifications table
        // const { data, error } = await supabase
        //   .from('notifications')
        //   .select('id')
        //   .eq('user_id', user.id)
        //   .eq('read', false);
        
        // For demo purposes, let's simulate some unread messages
        const hasAIMessages = localStorage.getItem('lastAISession');
        setUnreadCount(hasAIMessages ? 1 : 0);
      } catch (error) {
        console.error('Error fetching unread count:', error);
        setUnreadCount(0);
      }
    };

    fetchUnreadCount();

    // Set up real-time subscription for notifications (when table exists)
    // const subscription = supabase
    //   .channel('notifications')
    //   .on('postgres_changes', 
    //     { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
    //     () => fetchUnreadCount()
    //   )
    //   .subscribe();

    // return () => {
    //   subscription.unsubscribe();
    // };
  }, [user]);

  const handleClick = () => {
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
      >
        <MessageSquare className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default MessagesNotification;
