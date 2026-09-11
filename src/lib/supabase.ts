import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  UserProfile,
  UserPreferences,
  UserProgress,
  UserStats,
  SubjectId,
  LearningLevel,
  DailyMinutes,
  PreferredTime,
  LearningGoal,
} from '../types';

// Read env variables if configured
const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || '';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseUrl.length > 5 && supabaseAnonKey && supabaseAnonKey.length > 5
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Storage keys
const STORAGE_PREFIX = 'matters_app_';
const KEY_CURRENT_USER = `${STORAGE_PREFIX}current_user_id`;
const KEY_USERS_REGISTRY = `${STORAGE_PREFIX}users_registry`;

interface StoredUserAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  created_at: string;
}

// Local Storage helpers for reliable persistence & offline support
function getStoredUsers(): Record<string, StoredUserAccount> {
  try {
    const raw = localStorage.getItem(KEY_USERS_REGISTRY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStoredUsers(users: Record<string, StoredUserAccount>) {
  try {
    localStorage.setItem(KEY_USERS_REGISTRY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users to storage', e);
  }
}

export function getStoredCurrentUserId(): string | null {
  try {
    return localStorage.getItem(KEY_CURRENT_USER);
  } catch {
    return null;
  }
}

export function setStoredCurrentUserId(userId: string | null) {
  try {
    if (userId) {
      localStorage.setItem(KEY_CURRENT_USER, userId);
    } else {
      localStorage.removeItem(KEY_CURRENT_USER);
    }
  } catch (e) {
    console.error('Error updating current user in storage', e);
  }
}

// Database helper functions (operates seamlessly with Supabase or Local DB)
export async function dbGetUserProfile(userId: string): Promise<UserProfile | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          email: data.email,
          created_at: data.created_at,
        };
      }
    } catch (e) {
      console.warn('Supabase profile fetch error, falling back to local store:', e);
    }
  }

  const users = getStoredUsers();
  const found = users[userId];
  if (found) {
    if (found.id === 'demo-user-101' && found.name !== 'Anurag') {
      found.name = 'Anurag';
      found.email = 'anurag.learner@example.com';
      users[userId] = found;
      saveStoredUsers(users);
    }
    return {
      id: found.id,
      name: found.name,
      email: found.email,
      created_at: found.created_at,
    };
  }
  return null;
}

export async function dbGetUserPreferences(userId: string): Promise<UserPreferences | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (!error && data) {
        return {
          user_id: data.user_id,
          selected_subjects: data.selected_subjects || ['law-rights', 'money-finance', 'economics'],
          level: data.level || 'Beginner',
          daily_minutes: data.daily_minutes || 10,
          preferred_time: data.preferred_time || 'Morning',
          learning_goal: data.learning_goal || 'Improve my practical knowledge',
          onboarding_completed: Boolean(data.onboarding_completed),
        };
      }
    } catch (e) {
      console.warn('Supabase preferences fetch error:', e);
    }
  }

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}prefs_${userId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Local preferences load error', e);
  }

  return null;
}

export async function dbSaveUserPreferences(prefs: UserPreferences): Promise<void> {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}prefs_${prefs.user_id}`, JSON.stringify(prefs));
  } catch (e) {
    console.error('Error saving preferences locally', e);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('user_preferences').upsert({
        user_id: prefs.user_id,
        selected_subjects: prefs.selected_subjects,
        level: prefs.level,
        daily_minutes: prefs.daily_minutes,
        preferred_time: prefs.preferred_time,
        learning_goal: prefs.learning_goal,
        onboarding_completed: prefs.onboarding_completed,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Supabase preferences save error:', e);
    }
  }
}

export async function dbGetUserProgress(userId: string): Promise<Record<string, UserProgress>> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);
      if (!error && data) {
        const map: Record<string, UserProgress> = {};
        data.forEach((item) => {
          map[item.lesson_id] = {
            id: item.id,
            user_id: item.user_id,
            lesson_id: item.lesson_id,
            subject_id: item.subject_id,
            completed: item.completed,
            quiz_score: item.quiz_score,
            total_questions: item.total_questions,
            correct_answers: item.correct_answers,
            completed_at: item.completed_at,
            last_revised_at: item.last_revised_at,
          };
        });
        return map;
      }
    } catch (e) {
      console.warn('Supabase progress fetch error:', e);
    }
  }

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}progress_${userId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function dbSaveUserProgress(progress: UserProgress): Promise<void> {
  const userId = progress.user_id;
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}progress_${userId}`);
    const map: Record<string, UserProgress> = raw ? JSON.parse(raw) : {};
    map[progress.lesson_id] = progress;
    localStorage.setItem(`${STORAGE_PREFIX}progress_${userId}`, JSON.stringify(map));
  } catch (e) {
    console.error('Error saving progress locally', e);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('user_progress').upsert({
        user_id: progress.user_id,
        lesson_id: progress.lesson_id,
        subject_id: progress.subject_id,
        completed: progress.completed,
        quiz_score: progress.quiz_score,
        total_questions: progress.total_questions,
        correct_answers: progress.correct_answers,
        completed_at: progress.completed_at,
        last_revised_at: progress.last_revised_at,
      });
    } catch (e) {
      console.warn('Supabase progress save error:', e);
    }
  }
}

export async function dbGetUserStats(userId: string): Promise<UserStats> {
  const defaultStats: UserStats = {
    user_id: userId,
    total_xp: 0,
    current_streak: 0,
    longest_streak: 0,
    last_activity_date: null,
    lessons_completed_count: 0,
    revisions_completed_count: 0,
    streak_status: 'not_started',
    completed_dates: [],
    previous_broken_streak: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: null,
    streakStatus: 'not_started',
    completedDates: [],
    previousBrokenStreak: 0,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (!error && data) {
        return {
          ...defaultStats,
          user_id: data.user_id,
          total_xp: data.total_xp || 0,
          current_streak: data.current_streak || 0,
          longest_streak: data.longest_streak || 0,
          last_activity_date: data.last_activity_date,
          lessons_completed_count: data.lessons_completed_count || 0,
          revisions_completed_count: data.revisions_completed_count || 0,
        };
      }
    } catch (e) {
      console.warn('Supabase stats fetch error:', e);
    }
  }

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}stats_${userId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      const rawDate = parsed.last_activity_date ?? parsed.lastActivityDate ?? null;
      const cleanDate = rawDate ? (rawDate.includes('T') ? rawDate.split('T')[0] : rawDate) : null;
      const curStreak = parsed.current_streak ?? parsed.currentStreak ?? 0;
      const longStreak = parsed.longest_streak ?? parsed.longestStreak ?? 0;
      const streakStat = parsed.streak_status ?? parsed.streakStatus ?? (curStreak > 0 ? 'active' : 'not_started');
      const compDates = parsed.completed_dates ?? parsed.completedDates ?? [];
      const prevBroken = parsed.previous_broken_streak ?? parsed.previousBrokenStreak ?? 0;

      return {
        ...defaultStats,
        ...parsed,
        current_streak: curStreak,
        longest_streak: longStreak,
        last_activity_date: cleanDate,
        streak_status: streakStat,
        completed_dates: compDates,
        previous_broken_streak: prevBroken,
        currentStreak: curStreak,
        longestStreak: longStreak,
        lastActivityDate: cleanDate,
        streakStatus: streakStat,
        completedDates: compDates,
        previousBrokenStreak: prevBroken,
      };
    }
  } catch (e) {
    console.error('Error loading stats locally', e);
  }

  return defaultStats;
}

export async function dbSaveUserStats(stats: UserStats): Promise<void> {
  const currentStreak = stats.current_streak ?? stats.currentStreak ?? 0;
  const longestStreak = stats.longest_streak ?? stats.longestStreak ?? 0;
  const lastActivityDate = stats.last_activity_date ?? stats.lastActivityDate ?? null;
  const streakStatus = stats.streak_status ?? stats.streakStatus ?? 'not_started';
  const completedDates = stats.completed_dates ?? stats.completedDates ?? [];
  const previousBrokenStreak = stats.previous_broken_streak ?? stats.previousBrokenStreak ?? 0;

  const payload: UserStats = {
    ...stats,
    current_streak: currentStreak,
    longest_streak: longestStreak,
    last_activity_date: lastActivityDate,
    streak_status: streakStatus,
    completed_dates: completedDates,
    previous_broken_streak: previousBrokenStreak,
    currentStreak,
    longestStreak,
    lastActivityDate,
    streakStatus,
    completedDates,
    previousBrokenStreak,
  };

  try {
    localStorage.setItem(`${STORAGE_PREFIX}stats_${stats.user_id}`, JSON.stringify(payload));
    // Also save top-level keys for easy access/inspection
    localStorage.setItem('currentStreak', String(currentStreak));
    localStorage.setItem('longestStreak', String(longestStreak));
    localStorage.setItem('lastActivityDate', lastActivityDate || '');
    localStorage.setItem('streakStatus', streakStatus);
    localStorage.setItem('completedDates', JSON.stringify(completedDates));
  } catch (e) {
    console.error('Error saving stats locally', e);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('user_stats').upsert({
        user_id: stats.user_id,
        total_xp: stats.total_xp,
        current_streak: stats.current_streak,
        longest_streak: stats.longest_streak,
        last_activity_date: stats.last_activity_date,
        lessons_completed_count: stats.lessons_completed_count,
        revisions_completed_count: stats.revisions_completed_count,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Supabase stats save error:', e);
    }
  }
}

// Local Auth Database Simulation (ensures instant sign up, login, password check, persistence)
export async function localSignUp(name: string, email: string, password: string):Promise<UserProfile> {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  
  // Check if exists
  const existingId = Object.keys(users).find(
    (id) => users[id].email.toLowerCase() === normalizedEmail
  );
  if (existingId) {
    throw new Error('An account with this email already exists. Please log in.');
  }

  const userId = 'usr_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  const now = new Date().toISOString();
  
  const newUser: StoredUserAccount = {
    id: userId,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: btoa(password), // Simple encoding for local MVP
    created_at: now,
  };

  users[userId] = newUser;
  saveStoredUsers(users);

  // Initialize initial stats & preferences
  const initialPrefs: UserPreferences = {
    user_id: userId,
    selected_subjects: ['law-rights', 'money-finance', 'economics'],
    level: 'Beginner',
    daily_minutes: 10,
    preferred_time: 'Morning',
    learning_goal: 'Improve my practical knowledge',
    onboarding_completed: false,
  };
  await dbSaveUserPreferences(initialPrefs);

  const initialStats: UserStats = {
    user_id: userId,
    total_xp: 0,
    current_streak: 0,
    longest_streak: 0,
    last_activity_date: null,
    lessons_completed_count: 0,
    revisions_completed_count: 0,
  };
  await dbSaveUserStats(initialStats);

  return {
    id: userId,
    name: newUser.name,
    email: newUser.email,
    created_at: newUser.created_at,
  };
}

export async function localLogIn(email: string, password: string): Promise<UserProfile> {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = Object.values(users).find(
    (u) => u.email.toLowerCase() === normalizedEmail
  );

  if (!user) {
    throw new Error('No account found with this email. Please sign up.');
  }

  if (user.passwordHash !== btoa(password)) {
    throw new Error('Incorrect password. Please try again.');
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  };
}

// Seed Demo User if needed for immediate instant evaluation
export function seedDefaultDemoUser(): UserProfile {
  const users = getStoredUsers();
  const demoEmail = 'anurag.learner@example.com';
  const existing = Object.values(users).find(
    (u) => u.email === demoEmail || u.id === 'demo-user-101'
  );

  if (existing) {
    if (existing.name !== 'Anurag' || existing.email !== demoEmail) {
      existing.name = 'Anurag';
      existing.email = demoEmail;
      users[existing.id] = existing;
      saveStoredUsers(users);
    }
    return {
      id: existing.id,
      name: existing.name,
      email: existing.email,
      created_at: existing.created_at,
    };
  }

  const demoId = 'demo-user-101';
  const now = new Date().toISOString();
  const demoAccount: StoredUserAccount = {
    id: demoId,
    name: 'Anurag',
    email: demoEmail,
    passwordHash: btoa('password123'),
    created_at: now,
  };

  users[demoId] = demoAccount;
  saveStoredUsers(users);

  // Set default preferences
  const prefs: UserPreferences = {
    user_id: demoId,
    selected_subjects: ['law-rights', 'money-finance', 'economics'],
    level: 'Beginner',
    daily_minutes: 10,
    preferred_time: 'Morning',
    learning_goal: 'Improve my practical knowledge',
    onboarding_completed: true,
  };
  localStorage.setItem(`${STORAGE_PREFIX}prefs_${demoId}`, JSON.stringify(prefs));

  // Seed with realistic sample initial progress (3 lessons done)
  const initialProgress: Record<string, UserProgress> = {
    'lesson-law-1': {
      id: 'p-1',
      user_id: demoId,
      lesson_id: 'lesson-law-1',
      subject_id: 'law-rights',
      completed: true,
      quiz_score: 100,
      total_questions: 3,
      correct_answers: 3,
      completed_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    'lesson-fin-1': {
      id: 'p-2',
      user_id: demoId,
      lesson_id: 'lesson-fin-1',
      subject_id: 'money-finance',
      completed: true,
      quiz_score: 100,
      total_questions: 2,
      correct_answers: 2,
      completed_at: new Date(Date.now() - 86400000).toISOString(),
    },
    'lesson-eco-1': {
      id: 'p-3',
      user_id: demoId,
      lesson_id: 'lesson-eco-1',
      subject_id: 'economics',
      completed: true,
      quiz_score: 100,
      total_questions: 2,
      correct_answers: 2,
      completed_at: new Date(Date.now() - 86400000).toISOString(),
    },
  };
  localStorage.setItem(`${STORAGE_PREFIX}progress_${demoId}`, JSON.stringify(initialProgress));

  // Seed stats with 5 day streak and 125 XP
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yYear = yesterday.getFullYear();
  const yMonth = String(yesterday.getMonth() + 1).padStart(2, '0');
  const yDay = String(yesterday.getDate()).padStart(2, '0');
  const yesterdayDateStr = `${yYear}-${yMonth}-${yDay}`;

  const stats: UserStats = {
    user_id: demoId,
    total_xp: 125,
    current_streak: 5,
    longest_streak: 7,
    last_activity_date: yesterdayDateStr,
    lessons_completed_count: 3,
    revisions_completed_count: 1,
    streak_status: 'continue_today',
    completed_dates: [yesterdayDateStr],
    previous_broken_streak: 0,
    currentStreak: 5,
    longestStreak: 7,
    lastActivityDate: yesterdayDateStr,
    streakStatus: 'continue_today',
    completedDates: [yesterdayDateStr],
    previousBrokenStreak: 0,
  };
  localStorage.setItem(`${STORAGE_PREFIX}stats_${demoId}`, JSON.stringify(stats));

  return {
    id: demoId,
    name: demoAccount.name,
    email: demoAccount.email,
    created_at: demoAccount.created_at,
  };
}
