
import React, { useState, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getUser, removeUser, type User as UserType } from '../utils/userStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface UserProfileProps {
  darkMode?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ darkMode = false }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  const handleSignOut = () => {
    removeUser();
    setUser(null);
    toast.success('Successfully signed out');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`relative group ${
            darkMode 
              ? 'text-white hover:bg-white/10' 
              : 'text-gray-700 hover:bg-black/5'
          }`}
        >
          <User className="w-4 h-4 mr-2" />
          {user.name.split(' ')[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem disabled className="flex flex-col items-start">
          <span className="font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
