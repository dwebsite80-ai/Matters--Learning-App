import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  Subject,
  Topic,
  Lesson,
  Question,
  UserProgress,
  UserStats,
  UserPreferences,
  SubjectId,
  StreakStatus,
} from '../types';
import { useAuth } from './AuthContext';
import {
  ALL_SUBJECTS,
  ALL_TOPICS,
  ALL_LESSONS,
  ALL_QUESTIONS,
  getTopicsBySubject,
  getLessonById,
  getLessonByTopicId,
  getQuestionsByLessonId,
} from '../data/initialContent';
import {
  dbGetUserProgress,
  dbSaveUserProgress,
  dbGetUserStats,
  dbSaveUserStats,
  dbSaveUserPreferences,
} from '../lib/supabase';
import {
  reconcileStreakOnAppOpen,
  updateStreakAfterLesson,
  getStreakStatusMessage,
} from '../lib/streakHelper';

interface LearningContextType {
  subjects: Subject[];
  topics: Topic[];
  progressMap: Record<string, UserProgress>;
  stats: UserStats | null;
  loadingData: boolean;
  todayMission: Lesson | null;
  streakStatus: StreakStatus;
  currentStreak: number;
  longestStreak: number;
  previousBrokenStreak: number;
  getSubjectProgress: (subjectId: SubjectId) => {
    completedCount: number;
    totalCount: number;
    percentage: number;
  };
  getTopicStatus: (topic: Topic) => 'completed' | 'current' | 'locked';
  getNextRecommendedTopic: (subjectId: SubjectId) => Topic | null;
  completeLesson: (
    lessonId: string,
    quizScorePercentage: number,
    correctCount: number,
    totalQuestions: number
  ) => Promise<{ xpGained: number; streakIncreased: boolean }>;
  completeRevision: (correctCount: number, totalQuestions: number) => Promise<{ xpGained: number }>;
  getRevisionQuestions: (limit?: number) => Question[];
  savePreferences: (updatedPrefs: Partial<UserPreferences>) => Promise<void>;
  refreshLearningData: () => Promise<void>;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, preferences, updateUserPreferencesState } = useAuth();
  const [progressMap, setProgressMap] = useState<Record<string, UserProgress>>({});
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  // Load progress and stats whenever user changes
  useEffect(() => {
    async function loadData() {
      if (!user) {
        setProgressMap({});
        setStats(null);
        setLoadingData(false);
        return;
      }
      setLoadingData(true);
      try {
        const [progress, userStats] = await Promise.all([
          dbGetUserProgress(user.id),
          dbGetUserStats(user.id),
        ]);
        const { stats: reconciledStats, hasChanged } = reconcileStreakOnAppOpen(userStats);
        setProgressMap(progress);
        setStats(reconciledStats);
        if (hasChanged) {
          await dbSaveUserStats(reconciledStats);
        }
      } catch (e) {
        console.error('Error loading learning data', e);
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, [user]);

  // Re-verify streak status when tab regains visibility or focus (e.g. across midnight)
  useEffect(() => {
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible' && user) {
        setStats((prevStats) => {
          if (!prevStats) return prevStats;
          const { stats: reconciled, hasChanged } = reconcileStreakOnAppOpen(prevStats);
          if (hasChanged) {
            dbSaveUserStats(reconciled);
          }
          return reconciled;
        });
      }
    };

    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

    return () => {
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
    };
  }, [user]);

  const refreshLearningData = async () => {
    if (!user) return;
    try {
      const [progress, userStats] = await Promise.all([
        dbGetUserProgress(user.id),
        dbGetUserStats(user.id),
      ]);
      const { stats: reconciledStats, hasChanged } = reconcileStreakOnAppOpen(userStats);
      setProgressMap(progress);
      setStats(reconciledStats);
      if (hasChanged) {
        await dbSaveUserStats(reconciledStats);
      }
    } catch (e) {
      console.error('Error refreshing learning data', e);
    }
  };

  // Complete a lesson and its quiz
  const completeLesson = async (
    lessonId: string,
    quizScorePercentage: number,
    correctCount: number,
    totalQuestions: number
  ): Promise<{ xpGained: number; streakIncreased: boolean }> => {
    if (!user) throw new Error('User not logged in');

    const lesson = getLessonById(lessonId);
    if (!lesson) throw new Error('Lesson not found');

    const isFirstTimeCompletion = !progressMap[lessonId]?.completed;

    // XP calculation: 20 XP for lesson completion + 5 XP per correct quiz question
    const baseXP = isFirstTimeCompletion ? 20 : 5;
    const quizXP = correctCount * 5;
    const totalGainedXP = baseXP + quizXP;

    // 1. Update Progress
    const newProgress: UserProgress = {
      id: progressMap[lessonId]?.id || `prog_${Date.now()}`,
      user_id: user.id,
      lesson_id: lessonId,
      subject_id: lesson.subject_id,
      completed: true,
      quiz_score: quizScorePercentage,
      total_questions: totalQuestions,
      correct_answers: correctCount,
      completed_at: new Date().toISOString(),
      last_revised_at: progressMap[lessonId]?.last_revised_at,
    };

    const updatedProgressMap = {
      ...progressMap,
      [lessonId]: newProgress,
    };
    setProgressMap(updatedProgressMap);
    await dbSaveUserProgress(newProgress);

    // 2. Update Stats & Streak using streakHelper
    const currentStats: UserStats = stats || {
      user_id: user.id,
      total_xp: 0,
      current_streak: 0,
      longest_streak: 0,
      last_activity_date: null,
      lessons_completed_count: 0,
      revisions_completed_count: 0,
    };

    const { stats: baseStats } = reconcileStreakOnAppOpen(currentStats);
    const { updatedStats: streakUpdated, streakIncreased } = updateStreakAfterLesson(baseStats);

    const updatedStats: UserStats = {
      ...streakUpdated,
      total_xp: currentStats.total_xp + totalGainedXP,
      lessons_completed_count: isFirstTimeCompletion
        ? currentStats.lessons_completed_count + 1
        : currentStats.lessons_completed_count,
    };

    setStats(updatedStats);
    await dbSaveUserStats(updatedStats);

    return { xpGained: totalGainedXP, streakIncreased };
  };

  // Complete a revision session
  const completeRevision = async (
    correctCount: number,
    totalQuestions: number
  ): Promise<{ xpGained: number }> => {
    if (!user) throw new Error('User not logged in');

    // 10 XP for revision completion + 5 XP per correct answer
    const gainedXP = 10 + correctCount * 5;

    const currentStats: UserStats = stats || {
      user_id: user.id,
      total_xp: 0,
      current_streak: 0,
      longest_streak: 0,
      last_activity_date: null,
      lessons_completed_count: 0,
      revisions_completed_count: 0,
    };

    const { stats: baseStats } = reconcileStreakOnAppOpen(currentStats);
    const { updatedStats: streakUpdated } = updateStreakAfterLesson(baseStats);

    const updatedStats: UserStats = {
      ...streakUpdated,
      total_xp: currentStats.total_xp + gainedXP,
      revisions_completed_count: currentStats.revisions_completed_count + 1,
    };

    setStats(updatedStats);
    await dbSaveUserStats(updatedStats);

    return { xpGained: gainedXP };
  };

  // Revision question picker (selects 5 questions from completed lessons or subject pool)
  const getRevisionQuestions = (limit: number = 5): Question[] => {
    const completedLessonIds = Object.keys(progressMap).filter(
      (id) => progressMap[id]?.completed
    );

    let eligibleQuestions: Question[] = [];

    if (completedLessonIds.length > 0) {
      // Pull questions from completed lessons
      eligibleQuestions = ALL_QUESTIONS.filter((q) =>
        completedLessonIds.includes(q.lesson_id)
      );
    }

    // If fewer than limit questions available, supplement from user's selected subjects
    if (eligibleQuestions.length < limit) {
      const selectedSubjects = preferences?.selected_subjects || ['law-rights', 'money-finance', 'economics'];
      const fallbackQuestions = ALL_QUESTIONS.filter((q) =>
        selectedSubjects.includes(q.subject_id)
      );
      eligibleQuestions = [...eligibleQuestions, ...fallbackQuestions];
    }

    // Shuffle and pick
    const shuffled = [...eligibleQuestions].sort(() => 0.5 - Math.random());
    // Deduplicate by question text
    const uniqueQuestions: Question[] = [];
    const seen = new Set<string>();
    for (const q of shuffled) {
      if (!seen.has(q.id)) {
        seen.add(q.id);
        uniqueQuestions.push(q);
      }
      if (uniqueQuestions.length >= limit) break;
    }

    return uniqueQuestions;
  };

  // Subject Progress calculation
  const getSubjectProgress = (subjectId: SubjectId) => {
    const subjectTopics = getTopicsBySubject(subjectId);
    const totalCount = subjectTopics.length;
    let completedCount = 0;

    subjectTopics.forEach((t) => {
      if (progressMap[t.lesson_id]?.completed) {
        completedCount++;
      }
    });

    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    return { completedCount, totalCount, percentage };
  };

  // Status for roadmap items: 'completed' | 'current' | 'locked'
  const getTopicStatus = (topic: Topic): 'completed' | 'current' | 'locked' => {
    if (progressMap[topic.lesson_id]?.completed) {
      return 'completed';
    }

    const subjectTopics = getTopicsBySubject(topic.subject_id);
    const index = subjectTopics.findIndex((t) => t.id === topic.id);

    if (index === 0) {
      return 'current';
    }

    // If previous topic is completed, this one is unlocked/current
    const prevTopic = subjectTopics[index - 1];
    if (progressMap[prevTopic.lesson_id]?.completed) {
      return 'current';
    }

    return 'locked';
  };

  // Next recommended topic in a subject
  const getNextRecommendedTopic = (subjectId: SubjectId): Topic | null => {
    const subjectTopics = getTopicsBySubject(subjectId);
    for (const topic of subjectTopics) {
      if (!progressMap[topic.lesson_id]?.completed) {
        return topic;
      }
    }
    return subjectTopics[0] || null;
  };

  // Today's Mission Recommendation Engine
  const todayMission = useMemo(() => {
    const selectedSubjects: SubjectId[] =
      preferences?.selected_subjects && preferences.selected_subjects.length > 0
        ? preferences.selected_subjects
        : ['economics', 'money-finance', 'law-rights'];

    const userLevel = preferences?.level || 'Beginner';

    // 1. Find the first uncompleted lesson across user's preferred subjects matching level or sequence
    for (const subId of selectedSubjects) {
      const subjectTopics = getTopicsBySubject(subId);
      for (const t of subjectTopics) {
        if (!progressMap[t.lesson_id]?.completed) {
          const lesson = getLessonByTopicId(t.id);
          if (lesson) return lesson;
        }
      }
    }

    // Default fallback: Understanding Inflation (Economics lesson 3) or Lesson 1
    return getLessonById('lesson-eco-3') || ALL_LESSONS[0];
  }, [preferences, progressMap]);

  // Save Preferences
  const savePreferences = async (updatedPrefs: Partial<UserPreferences>) => {
    if (!user || !preferences) return;
    const newPrefs: UserPreferences = {
      ...preferences,
      ...updatedPrefs,
      user_id: user.id,
    };
    updateUserPreferencesState(newPrefs);
    await dbSaveUserPreferences(newPrefs);
  };

  const streakStatus: StreakStatus = stats?.streak_status || stats?.streakStatus || 'not_started';
  const currentStreak = stats?.current_streak ?? stats?.currentStreak ?? 0;
  const longestStreak = stats?.longest_streak ?? stats?.longestStreak ?? 0;
  const previousBrokenStreak = stats?.previous_broken_streak ?? stats?.previousBrokenStreak ?? 0;

  return (
    <LearningContext.Provider
      value={{
        subjects: ALL_SUBJECTS,
        topics: ALL_TOPICS,
        progressMap,
        stats,
        loadingData,
        todayMission,
        streakStatus,
        currentStreak,
        longestStreak,
        previousBrokenStreak,
        getSubjectProgress,
        getTopicStatus,
        getNextRecommendedTopic,
        completeLesson,
        completeRevision,
        getRevisionQuestions,
        savePreferences,
        refreshLearningData,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
