import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LearningProvider } from './context/LearningContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { AuthView } from './components/auth/AuthView';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { HomeDashboard } from './components/home/HomeDashboard';
import { SubjectsView } from './components/learn/SubjectsView';
import { TopicRoadmap } from './components/learn/TopicRoadmap';
import { LessonPlayer } from './components/lesson/LessonPlayer';
import { QuizPlayer } from './components/quiz/QuizPlayer';
import { RevisionView } from './components/revision/RevisionView';
import { ProgressView } from './components/progress/ProgressView';
import { ProfileView } from './components/profile/ProfileView';
import { SchemaModal } from './components/modals/SchemaModal';
import { ActiveTab, Lesson, SubjectId, TiaLessonContext, TiaMode } from './types';
import { getQuestionsByLessonId, getLessonById, getSubjectById, getTopicsBySubject, ALL_LESSONS } from './data/initialContent';
import { scrollToTop, useScrollToTop } from './lib/scrollHelper';
import { TiaFloatingButton } from './components/tia/TiaFloatingButton';
import { TiaAssistantModal } from './components/tia/TiaAssistantModal';

function MainAppContent() {
  const { user, preferences, loading, refreshUserData } = useAuth();

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeQuizLesson, setActiveQuizLesson] = useState<Lesson | null>(null);
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState<boolean>(false);
  const [isTiaOpen, setIsTiaOpen] = useState<boolean>(false);
  const [tiaInitialMode, setTiaInitialMode] = useState<TiaMode>('chat');

  const handleOpenTia = (mode: TiaMode = 'chat') => {
    setTiaInitialMode(mode);
    setIsTiaOpen(true);
  };

  // Build real-time course & lesson context for Tia
  const currentSubjectId = activeLesson?.subject_id || activeQuizLesson?.subject_id || selectedSubjectId;
  const currentSubject = currentSubjectId ? getSubjectById(currentSubjectId) : undefined;
  const targetLesson = activeLesson || activeQuizLesson;

  const courseTopics = currentSubjectId
    ? getTopicsBySubject(currentSubjectId).map((t) => ({
        id: t.id,
        title: t.title,
        title_hi: t.title_hi,
        description: t.description,
      }))
    : undefined;

  const courseLessons = currentSubjectId
    ? ALL_LESSONS.filter((l) => l.subject_id === currentSubjectId).map((l) => ({
        id: l.id,
        title: l.title_en || l.title,
        title_hi: l.title_hi,
        subtitle: l.subtitle_en || l.subtitle,
      }))
    : undefined;

  const tiaContext: TiaLessonContext | undefined = targetLesson
    ? {
        subjectId: targetLesson.subject_id,
        subjectName: currentSubject?.name || targetLesson.subject_id,
        subjectName_hi: currentSubject?.name_hi,
        courseDescription: currentSubject?.description,
        courseDescription_hi: currentSubject?.description_hi,
        courseTopics,
        courseLessons,
        lessonId: targetLesson.id,
        lessonTitle: targetLesson.title_en || targetLesson.title,
        lessonTitle_hi: targetLesson.title_hi,
        lessonSubtitle: targetLesson.subtitle_en || targetLesson.subtitle,
        lessonSubtitle_hi: targetLesson.subtitle_hi,
        lessonHook: targetLesson.hook_en || targetLesson.hook,
        difficulty: targetLesson.difficulty,
        sections: targetLesson.sections?.map((s) => ({
          title: s.title,
          title_hi: s.title_hi,
          content: s.content,
          content_hi: s.content_hi,
          example: s.example,
        })),
        practicalExample: targetLesson.practical_example
          ? {
              scenario: targetLesson.practical_example.scenario,
              scenario_hi: targetLesson.practical_example.scenario_hi,
              analysis: targetLesson.practical_example.analysis,
              analysis_hi: targetLesson.practical_example.analysis_hi,
              tip: targetLesson.practical_example.actionable_tip,
              tip_hi: targetLesson.practical_example.actionable_tip_hi,
            }
          : undefined,
        keyTakeaways: targetLesson.key_takeaways,
        keyTakeaways_hi: targetLesson.key_takeaways_hi,
        currentQuizQuestion: activeQuizLesson
          ? getQuestionsByLessonId(activeQuizLesson.id)[0]
          : undefined,
        studentName: user?.user_metadata?.name || 'Anurag',
      }
    : currentSubject
    ? {
        subjectId: currentSubject.id,
        subjectName: currentSubject.name,
        subjectName_hi: currentSubject.name_hi,
        courseDescription: currentSubject.description,
        courseDescription_hi: currentSubject.description_hi,
        courseTopics,
        courseLessons,
        lessonId: '',
        lessonTitle: currentSubject.name,
        difficulty: 'Beginner',
        studentName: user?.user_metadata?.name || 'Anurag',
      }
    : undefined;

  // Configure manual scroll restoration so browser refresh starts at the top
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    scrollToTop({ behavior: 'instant' });
  }, []);

  // Screen identifier for instant scroll reset on route/screen changes
  const currentScreenKey = activeQuizLesson
    ? `quiz-${activeQuizLesson.id}`
    : activeLesson
    ? `lesson-${activeLesson.id}`
    : selectedSubjectId
    ? `roadmap-${selectedSubjectId}`
    : `tab-${activeTab}`;

  useScrollToTop([currentScreenKey], { behavior: 'instant' });

  // Loading spinner during session restoration
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-500">Loading your learning space...</p>
      </div>
    );
  }

  // 1. Unauthenticated -> Show Auth (Login / Signup / Demo)
  if (!user) {
    return <AuthView />;
  }

  // 2. Authenticated but haven't completed onboarding
  if (!preferences?.onboarding_completed) {
    return (
      <OnboardingFlow
        onComplete={() => {
          refreshUserData();
          setActiveTab('home');
          scrollToTop({ behavior: 'instant' });
        }}
      />
    );
  }

  // Navigation handlers
  const handleStartLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveQuizLesson(null);
    scrollToTop({ behavior: 'instant' });
  };

  const handleStartQuizFromLesson = () => {
    if (activeLesson) {
      setActiveQuizLesson(activeLesson);
      setActiveLesson(null);
      scrollToTop({ behavior: 'instant' });
    }
  };

  const handleFinishQuiz = () => {
    const prevSub = activeQuizLesson?.subject_id;
    setActiveQuizLesson(null);
    setActiveLesson(null);
    if (prevSub) {
      setSelectedSubjectId(prevSub);
      setActiveTab('learn');
    } else {
      setActiveTab('home');
    }
    scrollToTop({ behavior: 'instant' });
  };

  const handleSelectSubject = (subjectId: SubjectId) => {
    setSelectedSubjectId(subjectId);
    setActiveTab('learn');
    scrollToTop({ behavior: 'instant' });
  };

  const handleStartRevision = () => {
    setActiveTab('revision');
    scrollToTop({ behavior: 'instant' });
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setActiveLesson(null);
    setActiveQuizLesson(null);
    if (tab !== 'learn') {
      setSelectedSubjectId(null);
    }
    scrollToTop({ behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex flex-col pb-24 md:pb-12 overflow-x-hidden w-full max-w-full">
      {/* Top Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full pt-16 sm:pt-20">
        {/* Active Quiz Player */}
        {activeQuizLesson ? (
          <QuizPlayer
            lesson={activeQuizLesson}
            questions={getQuestionsByLessonId(activeQuizLesson.id)}
            onFinish={handleFinishQuiz}
            onOpenTia={handleOpenTia}
          />
        ) : activeLesson ? (
          /* Active Lesson Player */
          <LessonPlayer
            lesson={activeLesson}
            onBack={() => {
              setActiveLesson(null);
              if (selectedSubjectId) {
                setActiveTab('learn');
              }
            }}
            onStartQuiz={handleStartQuizFromLesson}
            onOpenTia={handleOpenTia}
          />
        ) : activeTab === 'home' ? (
          /* Home Dashboard */
          <HomeDashboard
            onStartLesson={handleStartLesson}
            onStartRevision={handleStartRevision}
            onSelectSubject={handleSelectSubject}
            setActiveTab={handleTabChange}
          />
        ) : activeTab === 'learn' ? (
          /* Learn View / Subject Roadmap */
          selectedSubjectId ? (
            <TopicRoadmap
              subjectId={selectedSubjectId}
              onBack={() => setSelectedSubjectId(null)}
              onStartLesson={handleStartLesson}
            />
          ) : (
            <SubjectsView onSelectSubject={(subId) => setSelectedSubjectId(subId)} />
          )
        ) : activeTab === 'revision' ? (
          /* Spaced Revision View */
          <RevisionView
            onStartFirstLesson={() => {
              const ecoLesson = getLessonById('lesson-eco-3');
              if (ecoLesson) handleStartLesson(ecoLesson);
              else handleTabChange('learn');
            }}
          />
        ) : activeTab === 'progress' ? (
          /* Analytics & Progress View */
          <ProgressView />
        ) : activeTab === 'profile' ? (
          /* Profile & Preferences View */
          <ProfileView onOpenSchemaModal={() => setIsSchemaModalOpen(true)} />
        ) : null}
      </main>

      {/* Mobile Bottom Bar */}
      {!activeLesson && !activeQuizLesson && (
        <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
      )}

      {/* Floating Tia Voice Learning Assistant Button */}
      <TiaFloatingButton
        onClick={() => handleOpenTia('chat')}
        hasLessonContext={Boolean(activeLesson || activeQuizLesson)}
      />

      {/* Tia AI Learning Assistant Modal/Sheet */}
      <TiaAssistantModal
        isOpen={isTiaOpen}
        onClose={() => setIsTiaOpen(false)}
        context={tiaContext}
        initialMode={tiaInitialMode}
      />

      {/* Schema & Supabase Setup Modal */}
      <SchemaModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <LearningProvider>
          <MainAppContent />
        </LearningProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
