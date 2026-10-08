// Local & Persistent Storage for Preferences (Daily Goal & Notifications)

export interface DailyGoalOption {
  value: number;
  label: string;
  badge?: string;
  description: string;
}

export const DAILY_GOAL_OPTIONS: DailyGoalOption[] = [
  {
    value: 1,
    label: '1 lesson per day',
    badge: 'Light',
    description: 'Casual pace • ~5 mins/day',
  },
  {
    value: 2,
    label: '2 lessons per day',
    badge: 'Recommended',
    description: 'Balanced pace • ~10 mins/day',
  },
  {
    value: 3,
    label: '3 lessons per day',
    badge: 'Dedicated',
    description: 'Fast progress • ~15 mins/day',
  },
  {
    value: 5,
    label: '5 lessons per day',
    badge: 'Intense',
    description: 'Mastery sprint • ~25 mins/day',
  },
];

export interface NotificationSettings {
  dailyReminders: boolean;
  reminderTime: string;
  streakAlerts: boolean;
  announcements: boolean;
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  dailyReminders: true,
  reminderTime: 'Evening (8:00 PM)',
  streakAlerts: true,
  announcements: true,
};

const DAILY_GOAL_KEY = 'matters_daily_goal';
const NOTIFICATIONS_KEY = 'matters_notification_settings';

export function getStoredDailyGoal(userId?: string): number {
  if (typeof window === 'undefined') return 2;
  try {
    const userSpecific = userId ? localStorage.getItem(`${DAILY_GOAL_KEY}_${userId}`) : null;
    if (userSpecific) {
      const parsed = parseInt(userSpecific, 10);
      if ([1, 2, 3, 5].includes(parsed)) return parsed;
    }
    const globalVal = localStorage.getItem(DAILY_GOAL_KEY);
    if (globalVal) {
      const parsed = parseInt(globalVal, 10);
      if ([1, 2, 3, 5].includes(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Error reading daily goal', e);
  }
  return 2;
}

export function setStoredDailyGoal(goal: number, userId?: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DAILY_GOAL_KEY, goal.toString());
    if (userId) {
      localStorage.setItem(`${DAILY_GOAL_KEY}_${userId}`, goal.toString());
    }
    window.dispatchEvent(
      new CustomEvent('matters:daily-goal-changed', {
        detail: { goal },
      })
    );
  } catch (e) {
    console.warn('Error saving daily goal', e);
  }
}

export function getStoredNotificationSettings(userId?: string): NotificationSettings {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_SETTINGS;
  try {
    const userSpecific = userId ? localStorage.getItem(`${NOTIFICATIONS_KEY}_${userId}`) : null;
    if (userSpecific) {
      const parsed = JSON.parse(userSpecific);
      return { ...DEFAULT_NOTIFICATION_SETTINGS, ...parsed };
    }
    const globalVal = localStorage.getItem(NOTIFICATIONS_KEY);
    if (globalVal) {
      const parsed = JSON.parse(globalVal);
      return { ...DEFAULT_NOTIFICATION_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.warn('Error reading notification settings', e);
  }
  return DEFAULT_NOTIFICATION_SETTINGS;
}

export function setStoredNotificationSettings(
  settings: NotificationSettings,
  userId?: string
): void {
  if (typeof window === 'undefined') return;
  try {
    const serialized = JSON.stringify(settings);
    localStorage.setItem(NOTIFICATIONS_KEY, serialized);
    if (userId) {
      localStorage.setItem(`${NOTIFICATIONS_KEY}_${userId}`, serialized);
    }
    window.dispatchEvent(
      new CustomEvent('matters:notifications-changed', {
        detail: { settings },
      })
    );
  } catch (e) {
    console.warn('Error saving notification settings', e);
  }
}
