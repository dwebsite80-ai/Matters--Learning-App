import { StreakStatus, UserStats } from '../types';

/**
 * Returns today's local calendar date in YYYY-MM-DD format based on the user's local timezone.
 * Does NOT use UTC to prevent incorrect day transitions across timezones.
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses YYYY-MM-DD or legacy ISO string into local calendar date parts {year, month, day}.
 */
export function parseLocalDateParts(dateStr: string | null | undefined): { year: number; month: number; day: number } | null {
  if (!dateStr || typeof dateStr !== 'string') return null;
  // If dateStr contains an ISO time marker 'T', take only the date-part
  const cleanDateStr = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr.trim();
  const parts = cleanDateStr.split('-').map(Number);
  if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return null;
  }
  return { year: parts[0], month: parts[1], day: parts[2] };
}

/**
 * Calculates the exact difference in calendar days between two date strings (YYYY-MM-DD).
 * Uses UTC representation of calendar day midnights to ensure accuracy across DST changes,
 * leap years, month changes, and year changes.
 *
 * Example:
 * from "2026-09-08" to "2026-09-09" -> 1 day (yesterday)
 * from "2026-09-07" to "2026-09-09" -> 2 days (2 days ago, missed yesterday)
 * from "2026-09-09" to "2026-09-09" -> 0 days (today)
 */
export function getDateDifferenceInDays(
  fromDateStr: string | null | undefined,
  toDateStr: string = getLocalDateString()
): number {
  if (!fromDateStr || !toDateStr) return 0;
  const p1 = parseLocalDateParts(fromDateStr);
  const p2 = parseLocalDateParts(toDateStr);
  if (!p1 || !p2) return 0;

  const utc1 = Date.UTC(p1.year, p1.month - 1, p1.day);
  const utc2 = Date.UTC(p2.year, p2.month - 1, p2.day);

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((utc2 - utc1) / msPerDay);
}

/**
 * Reconciles the user's streak when the app opens or gains focus.
 *
 * Rules:
 * A. If there is no lastActivityDate:
 *    - currentStreak remains 0
 *    - streakStatus: "not_started"
 * B. If lastActivityDate is today:
 *    - Keep current streak unchanged
 *    - streakStatus: "active" (if streak > 0) or "not_started"
 * C. If lastActivityDate was yesterday (diffDays === 1):
 *    - Streak is still active, waiting for today's lesson
 *    - Keep current streak unchanged
 *    - streakStatus: "continue_today" (if streak > 0) or "not_started"
 * D. If lastActivityDate was two or more calendar days ago (diffDays >= 2):
 *    - The previous streak is broken!
 *    - Immediately set displayed currentStreak to 0
 *    - Set streakStatus to "broken"
 *    - Preserve longestStreak (never deleted or reduced)
 *    - Record previous_broken_streak for display
 */
export function reconcileStreakOnAppOpen(
  currentStats: UserStats,
  todayStr: string = getLocalDateString()
): { stats: UserStats; hasChanged: boolean } {
  const rawLastActivity = currentStats.last_activity_date || currentStats.lastActivityDate;
  const cleanLastActivity = rawLastActivity
    ? (rawLastActivity.includes('T') ? rawLastActivity.split('T')[0] : rawLastActivity)
    : null;

  let currentStreak = currentStats.current_streak ?? currentStats.currentStreak ?? 0;
  let longestStreak = currentStats.longest_streak ?? currentStats.longestStreak ?? 0;
  let previousBroken = currentStats.previous_broken_streak ?? currentStats.previousBrokenStreak ?? 0;
  let streakStatus: StreakStatus = currentStats.streak_status ?? currentStats.streakStatus ?? 'not_started';
  const completedDates = Array.from(new Set(currentStats.completed_dates || currentStats.completedDates || []));

  let hasChanged = false;

  if (!cleanLastActivity) {
    // Rule A: No activity logged yet
    currentStreak = 0;
    streakStatus = 'not_started';
    if (currentStats.current_streak !== 0 || currentStats.streak_status !== 'not_started') {
      hasChanged = true;
    }
  } else {
    const diffDays = getDateDifferenceInDays(cleanLastActivity, todayStr);

    if (diffDays === 0) {
      // Rule B: Activity completed today
      if (currentStreak <= 0 && completedDates.includes(todayStr)) {
        currentStreak = 1;
        hasChanged = true;
      }
      streakStatus = currentStreak > 0 ? 'active' : 'not_started';
      if (currentStats.streak_status !== streakStatus) {
        hasChanged = true;
      }
    } else if (diffDays === 1) {
      // Rule C: Activity completed yesterday - streak is still alive!
      if (currentStreak > 0) {
        streakStatus = 'continue_today';
      } else {
        streakStatus = 'not_started';
      }
      if (currentStats.streak_status !== streakStatus) {
        hasChanged = true;
      }
    } else if (diffDays >= 2) {
      // Rule D: Two or more calendar days missed - streak is BROKEN!
      if (currentStreak > 0) {
        previousBroken = currentStreak;
        hasChanged = true;
      }
      if (currentStreak !== 0) {
        currentStreak = 0;
        hasChanged = true;
      }
      // Ensure longest streak preserves the highest historical streak
      if (previousBroken > longestStreak) {
        longestStreak = previousBroken;
        hasChanged = true;
      }
      if (streakStatus !== 'broken') {
        streakStatus = 'broken';
        hasChanged = true;
      }
    } else {
      // diffDays < 0: Clock inconsistency or future date, keep as is
      streakStatus = currentStreak > 0 ? 'active' : 'not_started';
    }
  }

  // Ensure longest streak is at least as high as current streak
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
    hasChanged = true;
  }

  const updatedStats: UserStats = {
    ...currentStats,
    current_streak: currentStreak,
    longest_streak: longestStreak,
    last_activity_date: cleanLastActivity,
    streak_status: streakStatus,
    completed_dates: completedDates,
    previous_broken_streak: previousBroken,
    // CamelCase aliases
    currentStreak,
    longestStreak,
    lastActivityDate: cleanLastActivity,
    streakStatus,
    completedDates,
    previousBrokenStreak: previousBroken,
  };

  return { stats: updatedStats, hasChanged };
}

/**
 * Updates streak when the user completes a lesson or daily learning activity.
 *
 * Rules:
 * - If lastActivityDate is today:
 *     Do NOT increase currentStreak again.
 *     Keep the same streak.
 *     Set streakStatus to "active".
 *     streakIncreased = false.
 * - If lastActivityDate was yesterday (diffDays === 1):
 *     Increase currentStreak by 1.
 *     Set streakStatus to "active".
 *     streakIncreased = true.
 * - If lastActivityDate was two or more days ago (diffDays >= 2):
 *     Set currentStreak to 1.
 *     Set streakStatus to "active".
 *     streakIncreased = true.
 * - If there is no lastActivityDate:
 *     Set currentStreak to 1.
 *     Set streakStatus to "active".
 *     streakIncreased = true.
 *
 * Always update longestStreak when currentStreak > longestStreak.
 * Always add todayStr to completedDates.
 */
export function updateStreakAfterLesson(
  currentStats: UserStats,
  todayStr: string = getLocalDateString()
): { updatedStats: UserStats; streakIncreased: boolean } {
  const rawLastActivity = currentStats.last_activity_date || currentStats.lastActivityDate;
  const cleanLastActivity = rawLastActivity
    ? (rawLastActivity.includes('T') ? rawLastActivity.split('T')[0] : rawLastActivity)
    : null;

  let currentStreak = currentStats.current_streak ?? currentStats.currentStreak ?? 0;
  let longestStreak = currentStats.longest_streak ?? currentStats.longestStreak ?? 0;
  let previousBroken = currentStats.previous_broken_streak ?? currentStats.previousBrokenStreak ?? 0;
  let streakIncreased = false;
  const streakStatus: StreakStatus = 'active';

  // Ensure completedDates set has today
  const existingDates = new Set(currentStats.completed_dates || currentStats.completedDates || []);
  existingDates.add(todayStr);
  const completedDates = Array.from(existingDates).sort();

  if (!cleanLastActivity) {
    // First lesson ever
    currentStreak = 1;
    streakIncreased = true;
  } else {
    const diffDays = getDateDifferenceInDays(cleanLastActivity, todayStr);

    if (diffDays === 0) {
      // Already completed a lesson today: keep same streak, do NOT increase
      if (currentStreak === 0) {
        currentStreak = 1;
        streakIncreased = true;
      } else {
        streakIncreased = false;
      }
    } else if (diffDays === 1) {
      // Consecutive calendar day! Increment streak
      currentStreak = currentStreak + 1;
      streakIncreased = true;
    } else {
      // Two or more calendar days missed: restart streak from 1
      if (currentStreak > 0) {
        previousBroken = currentStreak;
      }
      currentStreak = 1;
      streakIncreased = true;
    }
  }

  // Preserve and update longest streak
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }

  const updatedStats: UserStats = {
    ...currentStats,
    current_streak: currentStreak,
    longest_streak: longestStreak,
    last_activity_date: todayStr,
    streak_status: streakStatus,
    completed_dates: completedDates,
    previous_broken_streak: previousBroken,
    // CamelCase aliases
    currentStreak,
    longestStreak,
    lastActivityDate: todayStr,
    streakStatus,
    completedDates,
    previousBrokenStreak: previousBroken,
  };

  return { updatedStats, streakIncreased };
}

/**
 * Returns localized user-facing copy for the 4 streak states:
 * 1. not_started
 * 2. active
 * 3. continue_today
 * 4. broken
 */
export function getStreakStatusMessage(
  status: StreakStatus = 'not_started',
  currentStreak: number = 0,
  brokenStreak: number = 0,
  language: 'en' | 'hi' = 'en'
): string {
  switch (status) {
    case 'not_started':
      return language === 'hi'
        ? 'अपनी पहली स्ट्रीक शुरू करने के लिए पहला पाठ पूरा करें।'
        : 'Complete your first lesson to start a streak.';

    case 'active':
      return language === 'hi'
        ? `आप ${currentStreak}-दिनों की स्ट्रीक पर हैं। जारी रखें!`
        : `You are on a ${currentStreak}-day streak. Keep going!`;

    case 'continue_today':
      return language === 'hi'
        ? 'अपनी स्ट्रीक बनाए रखने के लिए आज एक पाठ पूरा करें।'
        : 'Complete a lesson today to continue your streak.';

    case 'broken': {
      const count = brokenStreak > 0 ? brokenStreak : (currentStreak > 0 ? currentStreak : 0);
      if (count > 0) {
        return language === 'hi'
          ? `आपकी पिछली ${count}-दिनों की स्ट्रीक टूट गई है। नया सिलसिला शुरू करने के लिए आज एक पाठ पूरा करें।`
          : `Your previous ${count}-day streak was broken. Complete a lesson today to start again.`;
      }
      return language === 'hi'
        ? 'आपकी पिछली स्ट्रीक टूट गई है। नया सिलसिला शुरू करने के लिए आज एक पाठ पूरा करें।'
        : 'Your previous streak was broken. Complete a lesson today to start again.';
    }

    default:
      return language === 'hi'
        ? 'दैनिक व्यावहारिक ज्ञान के लिए अध्ययन जारी रखें।'
        : 'Keep learning to build your practical knowledge.';
  }
}
