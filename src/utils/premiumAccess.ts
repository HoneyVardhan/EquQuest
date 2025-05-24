
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
