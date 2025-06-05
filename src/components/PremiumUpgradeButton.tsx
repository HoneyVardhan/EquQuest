
import React from 'react';
import { Crown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface PremiumUpgradeButtonProps {
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'compact';
  className?: string;
}

const PremiumUpgradeButton: React.FC<PremiumUpgradeButtonProps> = ({ 
  onClick, 
  variant = 'primary',
  className = ''
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (!isAuthenticated) {
      // Pass the intended destination when redirecting to login
      navigate('/login', { state: { from: '/unlock-premium' } });
    } else {
      navigate('/unlock-premium');
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 bg-white';
      case 'compact':
        return 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-4 py-2';
      default:
        return 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300';
    }
  };

  const getIconSize = () => {
    return variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5';
  };

  return (
    <Button
      onClick={handleClick}
      className={`${getVariantStyles()} ${className} font-semibold relative overflow-hidden group`}
      size={variant === 'compact' ? 'sm' : 'default'}
    >
      <div className="flex items-center gap-2 relative z-10">
        <Crown className={getIconSize()} />
        <span>{variant === 'compact' ? 'Upgrade' : 'Upgrade to Premium'}</span>
        {variant === 'primary' && <Sparkles className="w-4 h-4" />}
      </div>
      
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Button>
  );
};

export default PremiumUpgradeButton;
