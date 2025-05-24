
import React from 'react';
import { Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PremiumBadgeProps {
  className?: string;
  variant?: 'navbar' | 'profile' | 'compact';
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ 
  className = '', 
  variant = 'navbar' 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'navbar':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-sm font-semibold animate-pulse';
      case 'profile':
        return 'bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 text-base font-bold';
      case 'compact':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 text-xs font-medium';
      default:
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-sm font-semibold';
    }
  };

  const getIconSize = () => {
    switch (variant) {
      case 'profile':
        return 'w-5 h-5';
      case 'compact':
        return 'w-3 h-3';
      default:
        return 'w-4 h-4';
    }
  };

  return (
    <Badge className={`${getVariantStyles()} ${className} flex items-center gap-1 shadow-lg`}>
      <Crown className={getIconSize()} />
      {variant === 'compact' ? 'Pro' : 'Premium'}
    </Badge>
  );
};

export default PremiumBadge;
