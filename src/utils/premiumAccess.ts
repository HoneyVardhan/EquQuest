
export const checkPremiumAccess = (isPremium: boolean, onUpgrade: () => void): boolean => {
  if (!isPremium) {
    onUpgrade();
    return false;
  }
  return true;
};

export const getPremiumFeatures = () => [
  'Unlimited Daily Quizzes',
  'Advanced Streak Tracking with Rewards',
  'Lifelines (Hint & Skip)',
  'Full Leaderboard Access',
  'AI-Powered Quiz Support',
  'Premium Certificates',
  'Dark Mode & Language Options',
  'Early Access to New Features'
];

export const getUpgradeMessage = (feature: string) => 
  `Upgrade to Premium to unlock ${feature} and more advanced features!`;

// Premium feature validation
export const validatePremiumFeature = (isPremium: boolean, feature: string): { hasAccess: boolean; message?: string } => {
  if (isPremium) {
    return { hasAccess: true };
  }
  
  return { 
    hasAccess: false, 
    message: getUpgradeMessage(feature) 
  };
};

// Quick access checks for common premium features
export const canAccessUnlimitedQuizzes = (isPremium: boolean) => isPremium;
export const canAccessLifelines = (isPremium: boolean) => isPremium;
export const canAccessLeaderboard = (isPremium: boolean) => isPremium;
export const canAccessAISupport = (isPremium: boolean) => isPremium;
export const canAccessPremiumCertificates = (isPremium: boolean) => isPremium;
