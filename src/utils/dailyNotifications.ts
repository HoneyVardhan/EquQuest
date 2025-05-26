
export interface DailyNotification {
  id: string;
  message: string;
  timestamp: number;
  type: 'streak' | 'general';
}

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const scheduleDaily9AMNotification = async (streak: number = 0): Promise<void> => {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return;

  const now = new Date();
  const next9AM = new Date();
  next9AM.setHours(9, 0, 0, 0);
  
  // If it's already past 9 AM today, schedule for tomorrow
  if (now.getHours() >= 9) {
    next9AM.setDate(next9AM.getDate() + 1);
  }

  const timeUntil9AM = next9AM.getTime() - now.getTime();

  setTimeout(() => {
    const message = streak > 0 
      ? `🔥 Keep your ${streak}-day streak alive! Time for today's quiz on EduQuest!`
      : `📚 Good morning! Start your learning journey today on EduQuest!`;

    new Notification('EduQuest Daily Reminder', {
      body: message,
      icon: '/favicon.ico',
      badge: '/favicon.ico'
    });

    // Schedule next day's notification
    scheduleDaily9AMNotification(streak);
  }, timeUntil9AM);
};

export const getLastNotificationDate = (): string | null => {
  return localStorage.getItem('lastNotificationDate');
};

export const setLastNotificationDate = (): void => {
  localStorage.setItem('lastNotificationDate', new Date().toDateString());
};
