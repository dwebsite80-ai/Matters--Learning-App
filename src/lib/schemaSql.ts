/**
 * Supabase SQL Schema definition for the Matters Microlearning App.
 * Users can execute this script directly in the Supabase SQL Editor.
 */

export const SUPABASE_SCHEMA_SQL = `-- 1. PROFILES TABLE (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. USER PREFERENCES TABLE
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  selected_subjects TEXT[] DEFAULT '{"law-rights", "money-finance", "economics"}'::TEXT[],
  level TEXT DEFAULT 'Beginner' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  daily_minutes INTEGER DEFAULT 10 CHECK (daily_minutes IN (10, 20)),
  preferred_time TEXT DEFAULT 'Morning' CHECK (preferred_time IN ('Morning', 'Afternoon', 'Evening', 'Custom')),
  learning_goal TEXT DEFAULT 'Improve my practical knowledge',
  onboarding_completed BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SUBJECTS TABLE
CREATE TABLE IF NOT EXISTS public.subjects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  badge_color TEXT,
  theme_color TEXT,
  order_index INTEGER DEFAULT 0
);

-- 4. TOPICS TABLE
CREATE TABLE IF NOT EXISTS public.topics (
  id TEXT PRIMARY KEY,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Beginner',
  order_index INTEGER DEFAULT 0,
  estimated_minutes INTEGER DEFAULT 10,
  lesson_id TEXT NOT NULL
);

-- 5. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
  id TEXT PRIMARY KEY,
  topic_id TEXT REFERENCES public.topics(id) ON DELETE CASCADE,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT,
  estimated_minutes INTEGER DEFAULT 10,
  difficulty TEXT DEFAULT 'Beginner',
  hook TEXT NOT NULL,
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  practical_example JSONB NOT NULL DEFAULT '{}'::jsonb,
  key_takeaways TEXT[] DEFAULT '{}'::text[]
);

-- 6. QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  explanation TEXT NOT NULL
);

-- 7. USER PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT true,
  quiz_score INTEGER DEFAULT 100,
  total_questions INTEGER DEFAULT 3,
  correct_answers INTEGER DEFAULT 3,
  completed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_revised_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

-- 8. USER STATS TABLE
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  lessons_completed_count INTEGER DEFAULT 0,
  revisions_completed_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES FOR PUBLIC CONTENT (Read-only for all authenticated users)
CREATE POLICY "Public subjects are viewable by all" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Public topics are viewable by all" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public lessons are viewable by all" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Public questions are viewable by all" ON public.questions FOR SELECT USING (true);

-- RLS POLICIES FOR USER-SPECIFIC DATA
CREATE POLICY "Users can manage own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own stats" ON public.user_stats FOR ALL USING (auth.uid() = user_id);
`;
