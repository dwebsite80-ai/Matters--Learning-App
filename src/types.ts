export type SubjectId =
  | 'law-rights'
  | 'money-finance'
  | 'economics'
  | 'bihar-gk'
  | 'polity-constitution'
  | 'history-movement'
  | 'personality-development'
  | 'dressing-sense'
  | 'case-studies'
  | 'time-management';

export type AppLanguage = 'en' | 'hi';

export type LearningLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type DailyMinutes = 10 | 20;
export type PreferredTime = 'Morning' | 'Afternoon' | 'Evening' | 'Custom';
export type LearningGoal = 
  | 'Improve my practical knowledge'
  | 'Build strong fundamentals'
  | 'Prepare for future exams'
  | 'Become better at everyday decision-making';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface UserPreferences {
  user_id: string;
  selected_subjects: SubjectId[];
  level: LearningLevel;
  daily_minutes: DailyMinutes;
  preferred_time: PreferredTime;
  learning_goal: LearningGoal;
  onboarding_completed: boolean;
  language?: AppLanguage;
}

export interface Subject {
  id: SubjectId;
  name: string;
  name_hi?: string;
  description: string;
  description_hi?: string;
  icon: string;
  badgeColor: string;
  themeColor: string;
  order_index: number;
}

export interface Topic {
  id: string;
  subject_id: SubjectId;
  title: string;
  title_hi?: string;
  description: string;
  description_hi?: string;
  difficulty: LearningLevel;
  order_index: number;
  estimated_minutes: number;
  lesson_id: string;
}

export interface LessonContentSection {
  title: string;
  title_hi?: string;
  content: string;
  content_hi?: string;
  highlight?: string;
  highlight_hi?: string;
  example?: string;
  example_hi?: string;
  iconType?: 'hook' | 'concept' | 'example' | 'tip' | 'warning';
}

export interface Lesson {
  id: string;
  topic_id: string;
  subject_id: SubjectId;
  lessonNumber?: number;
  lesson_number?: number;
  title: string;
  title_en?: string;
  title_hi?: string;
  subtitle?: string;
  subtitle_en?: string;
  subtitle_hi?: string;
  estimated_minutes: number;
  estimatedMinutes?: number;
  difficulty: LearningLevel;
  hook: string;
  hook_en?: string;
  hook_hi?: string;
  content_en?: string;
  content_hi?: string;
  sections: LessonContentSection[];
  practical_example: {
    scenario: string;
    scenario_hi?: string;
    analysis: string;
    analysis_hi?: string;
    actionable_tip: string;
    actionable_tip_hi?: string;
  };
  key_takeaways: string[];
  key_takeaways_hi?: string[];
  practical_activity?: {
    title: string;
    title_hi?: string;
    time_minutes?: number;
    description: string;
    description_hi?: string;
    steps: string[];
    steps_hi?: string[];
  };
  practicalActivity_en?: {
    title: string;
    description: string;
    steps?: string[];
    time_minutes?: number;
  };
  practicalActivity_hi?: {
    title: string;
    description: string;
    steps?: string[];
    time_minutes?: number;
  };
  quizQuestions?: Question[];
}

export interface Question {
  id: string;
  lesson_id: string;
  subject_id: SubjectId;
  question: string;
  question_hi?: string;
  option_a: string;
  option_a_hi?: string;
  option_b: string;
  option_b_hi?: string;
  option_c: string;
  option_c_hi?: string;
  option_d: string;
  option_d_hi?: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  explanation_hi?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  subject_id: SubjectId;
  completed: boolean;
  quiz_score: number; // percentage (0 - 100)
  total_questions: number;
  correct_answers: number;
  completed_at: string;
  last_revised_at?: string;
}

export type StreakStatus = 'not_started' | 'active' | 'continue_today' | 'broken';

export interface UserStats {
  user_id: string;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  lessons_completed_count: number;
  revisions_completed_count: number;
  streak_status?: StreakStatus;
  completed_dates?: string[];
  previous_broken_streak?: number;
  // CamelCase aliases for interoperability with localStorage specs
  currentStreak?: number;
  longestStreak?: number;
  lastActivityDate?: string | null;
  streakStatus?: StreakStatus;
  completedDates?: string[];
  previousBrokenStreak?: number;
}

export type ActiveTab = 'home' | 'learn' | 'revision' | 'progress' | 'profile';

export type TiaState = 'idle' | 'listening' | 'thinking' | 'speaking';

export type TiaMode =
  | 'chat'
  | 'explain'
  | 'funny'
  | 'quiz'
  | 'speaking_practice'
  | 'revision';

export interface TiaMessage {
  id: string;
  sender: 'user' | 'tia';
  text: string;
  speechText?: string;
  mode?: TiaMode;
  timestamp: number;
  isVoice?: boolean;
  quickActions?: string[];
  quizData?: {
    question: string;
    options?: string[];
    hint?: string;
    correctAnswer?: string;
  };
}

export interface TiaLanguageConfig {
  language: 'hi' | 'en';
  locale: 'hi-IN' | 'en-IN';
  ttsLocale: 'hi-IN' | 'en-IN';
  responseLanguage: 'Hindi' | 'English';
  systemInstruction: string;
}

export interface TiaLessonContext {
  subjectId: SubjectId;
  subjectName: string;
  subjectName_hi?: string;
  courseDescription?: string;
  courseDescription_hi?: string;
  courseTopics?: {
    id: string;
    title: string;
    title_hi?: string;
    description?: string;
  }[];
  courseLessons?: {
    id: string;
    title: string;
    title_hi?: string;
    subtitle?: string;
  }[];
  lessonId: string;
  lessonTitle: string;
  lessonTitle_hi?: string;
  lessonSubtitle?: string;
  lessonSubtitle_hi?: string;
  lessonHook?: string;
  lessonHook_hi?: string;
  difficulty?: string;
  sections?: {
    title: string;
    title_hi?: string;
    content: string;
    content_hi?: string;
    example?: string;
    example_hi?: string;
  }[];
  practicalExample?: {
    scenario: string;
    scenario_hi?: string;
    analysis: string;
    analysis_hi?: string;
    tip: string;
    tip_hi?: string;
  };
  keyTakeaways?: string[];
  keyTakeaways_hi?: string[];
  currentQuizQuestion?: Question;
  studentName?: string;
}

export interface TiaQuizEvaluation {
  isCorrect: boolean;
  feedback: string;
  explanation: string;
  funnyRemark?: string;
  nextPrompt?: string;
}
