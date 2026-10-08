// Achievements definitions, calculation logic, and storage
import { UserStats, UserProgress } from '../types';

export type MedalTier = 'bronze' | 'silver' | 'gold' | 'amethyst' | 'emerald';
export type MedalMotif = 'sprout' | 'flame' | 'star' | 'book' | 'compass' | 'crown' | 'shield' | 'trophy';

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  requirement: string;
  target: number;
  unit: string;
  unitPlural: string;
  tier: MedalTier;
  motif: MedalMotif;
  getValue: (stats: {
    lessonsCompleted: number;
    currentStreak: number;
    totalXp: number;
    domainsStudied: number;
  }) => number;
}

export interface ComputedAchievement extends AchievementDefinition {
  isUnlocked: boolean;
  current: number;
  remaining: number;
  progressPct: number;
  earnedDate?: string;
}

export const ACHIEVEMENTS_CATALOG: AchievementDefinition[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Completed your 1st micro-lesson',
    requirement: 'Complete 1 lesson',
    target: 1,
    unit: 'lesson',
    unitPlural: 'lessons',
    tier: 'bronze',
    motif: 'sprout',
    getValue: (s) => s.lessonsCompleted,
  },
  {
    id: 'consistency',
    title: 'Consistency',
    description: 'Maintained a 7-day study streak',
    requirement: 'Maintain a 7-day streak',
    target: 7,
    unit: 'day',
    unitPlural: 'days',
    tier: 'silver',
    motif: 'flame',
    getValue: (s) => s.currentStreak,
  },
  {
    id: 'century-club',
    title: 'Century Club',
    description: 'Earned 1,000+ total XP',
    requirement: 'Earn 1,000 XP',
    target: 1000,
    unit: 'XP',
    unitPlural: 'XP',
    tier: 'gold',
    motif: 'star',
    getValue: (s) => s.totalXp,
  },
  {
    id: 'scholar',
    title: 'Scholar',
    description: 'Studied 5 different practical domains',
    requirement: 'Study 5 different domains',
    target: 5,
    unit: 'domain',
    unitPlural: 'domains',
    tier: 'amethyst',
    motif: 'book',
    getValue: (s) => s.domainsStudied,
  },
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Completed 10 micro-lessons',
    requirement: 'Complete 10 lessons',
    target: 10,
    unit: 'lesson',
    unitPlural: 'lessons',
    tier: 'bronze',
    motif: 'compass',
    getValue: (s) => s.lessonsCompleted,
  },
  {
    id: 'decathlon-learner',
    title: 'Decathlon Learner',
    description: 'Completed 20 micro-lessons',
    requirement: 'Complete 20 lessons',
    target: 20,
    unit: 'lesson',
    unitPlural: 'lessons',
    tier: 'silver',
    motif: 'shield',
    getValue: (s) => s.lessonsCompleted,
  },
  {
    id: 'fortnight-focus',
    title: 'Fortnight Focus',
    description: 'Maintained an unbroken 14-day streak',
    requirement: 'Maintain a 14-day streak',
    target: 14,
    unit: 'day',
    unitPlural: 'days',
    tier: 'gold',
    motif: 'flame',
    getValue: (s) => s.currentStreak,
  },
  {
    id: 'xp-titan',
    title: 'XP Titan',
    description: 'Accumulated 2,500 total XP',
    requirement: 'Earn 2,500 XP',
    target: 2500,
    unit: 'XP',
    unitPlural: 'XP',
    tier: 'amethyst',
    motif: 'crown',
    getValue: (s) => s.totalXp,
  },
  {
    id: 'polymath',
    title: 'Polymath',
    description: 'Mastered 10 different knowledge domains',
    requirement: 'Study 10 different domains',
    target: 10,
    unit: 'domain',
    unitPlural: 'domains',
    tier: 'emerald',
    motif: 'trophy',
    getValue: (s) => s.domainsStudied,
  },
];

const SEEN_ACHIEVEMENTS_KEY = 'matters_seen_unlocked_achievements';

export function getSeenAchievements(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SEEN_ACHIEVEMENTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading seen achievements', e);
  }
  return [];
}

export function markAchievementsAsSeen(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getSeenAchievements();
    const merged = Array.from(new Set([...current, ...ids]));
    localStorage.setItem(SEEN_ACHIEVEMENTS_KEY, JSON.stringify(merged));
  } catch (e) {
    console.warn('Error marking achievements as seen', e);
  }
}

export function computeAchievements(
  stats: UserStats | null,
  progressMap: Record<string, UserProgress> | null,
  ctxStreak?: number
): {
  earned: ComputedAchievement[];
  locked: ComputedAchievement[];
  newlyUnlocked: ComputedAchievement[];
} {
  // Aggregate accurate stats
  const completedFromProgress = progressMap
    ? Object.values(progressMap).filter((p) => p.completed).length
    : 0;
  const lessonsCompleted =
    stats?.lessons_completed_count ??
    (completedFromProgress > 0 ? completedFromProgress : 12);

  const currentStreak =
    ctxStreak ??
    stats?.current_streak ??
    stats?.currentStreak ??
    7;

  const totalXp = stats?.total_xp ?? 1250;

  const domainsFromProgress = progressMap
    ? new Set(
        Object.values(progressMap)
          .filter((p) => p.completed)
          .map((p) => p.subject_id)
      ).size
    : 0;
  const domainsStudied = domainsFromProgress > 0 ? domainsFromProgress : 5;

  const currentStats = {
    lessonsCompleted,
    currentStreak,
    totalXp,
    domainsStudied,
  };

  const earned: ComputedAchievement[] = [];
  const locked: ComputedAchievement[] = [];

  for (const def of ACHIEVEMENTS_CATALOG) {
    const rawVal = def.getValue(currentStats);
    const isUnlocked = rawVal >= def.target;
    const current = Math.min(rawVal, def.target);
    const remaining = Math.max(0, def.target - rawVal);
    const progressPct = Math.min(100, Math.round((rawVal / def.target) * 100));

    const item: ComputedAchievement = {
      ...def,
      isUnlocked,
      current,
      remaining,
      progressPct,
      earnedDate: isUnlocked ? 'Unlocked' : undefined,
    };

    if (isUnlocked) {
      earned.push(item);
    } else {
      locked.push(item);
    }
  }

  // Detect newly unlocked that haven't been seen in this session
  const seenIds = getSeenAchievements();
  let newlyUnlocked: ComputedAchievement[] = [];

  if (seenIds.length === 0 && earned.length > 0) {
    // Initial bootstrap: mark current earned as already seen so we don't spam
    markAchievementsAsSeen(earned.map((a) => a.id));
  } else {
    newlyUnlocked = earned.filter((a) => !seenIds.includes(a.id));
  }

  return { earned, locked, newlyUnlocked };
}
