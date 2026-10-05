import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Unlock,
  Clock,
  Award,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { SubjectId, Lesson } from '../../types';
import { getTopicsBySubject, getLessonByTopicId, getSubjectById } from '../../data/initialContent';
import { useScrollToTop } from '../../lib/scrollHelper';

interface TopicRoadmapProps {
  subjectId: SubjectId;
  onBack: () => void;
  onStartLesson: (lesson: Lesson) => void;
}

export const TopicRoadmap: React.FC<TopicRoadmapProps> = ({
  subjectId,
  onBack,
  onStartLesson,
}) => {
  const { getSubjectProgress, getTopicStatus, progressMap } = useLearning();
  const { language } = useLanguage();

  useScrollToTop([subjectId], { behavior: 'instant' });

  const subject = getSubjectById(subjectId);
  const topics = getTopicsBySubject(subjectId);
  const progress = getSubjectProgress(subjectId);

  if (!subject) return null;

  const subName = language === 'hi' && subject.name_hi ? subject.name_hi : subject.name;
  const subDesc = language === 'hi' && subject.description_hi ? subject.description_hi : subject.description;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Navigation Header */}
      <div className="flex items-center gap-3.5 border-b border-black/[0.06] pb-5">
        <button
          onClick={onBack}
          className="p-2.5 rounded-full border border-black/[0.08] bg-white hover:bg-black/[0.04] text-[#090D16] transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
          title={language === 'hi' ? 'वापस लौटें' : 'Back to Subjects'}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-bold text-black/50 uppercase tracking-widest block font-mono">
            {language === 'hi' ? 'विषय रोडमैप' : 'Subject Roadmap'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-[#090D16] tracking-tight font-medium">
            {subName}
          </h1>
        </div>
      </div>

      {/* Subject Header Card */}
      <div className="bg-white rounded-[30px] sm:rounded-[36px] border border-black/[0.06] p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
        <p className="text-xs sm:text-sm text-black/75 leading-relaxed font-light">
          {subDesc}
        </p>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-mono font-medium text-black/50 mb-2">
            <span>
              {language === 'hi'
                ? `प्रगति: ${progress.completedCount} / ${progress.totalCount} पूर्ण`
                : `Roadmap Progress: ${progress.completedCount} of ${progress.totalCount} completed`}
            </span>
            <span className="font-bold text-black/80">{progress.percentage}%</span>
          </div>
          <div className="w-full bg-black/[0.04] h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 via-indigo-600 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Roadmap List */}
      <div className="space-y-4 relative">
        {/* Subtle vertical connecting line */}
        <div className="absolute left-6.5 top-6 bottom-6 w-0.5 bg-black/[0.06] -z-0" />

        {topics.map((topic, index) => {
          const status = getTopicStatus(topic);
          const lesson = getLessonByTopicId(topic.id);
          const userProg = lesson ? progressMap[lesson.id] : undefined;
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';

          const cardTitle = language === 'hi'
            ? (lesson?.title_hi || lesson?.title || topic.title_hi || topic.title)
            : (lesson?.title_en || lesson?.title || topic.title);
          const cardSubtitle = language === 'hi'
            ? (lesson?.subtitle_hi || lesson?.subtitle || topic.description_hi || topic.description)
            : (lesson?.subtitle_en || lesson?.subtitle || topic.description);
          const cardMinutes = lesson?.estimatedMinutes ?? lesson?.estimated_minutes ?? topic.estimated_minutes;
          const cardDifficulty = lesson?.difficulty ?? topic.difficulty;
          const lessonNumber = lesson?.lessonNumber ?? lesson?.lesson_number ?? (index + 1);

          return (
            <div
              key={topic.id}
              onClick={() => {
                if (lesson) onStartLesson(lesson);
              }}
              className={`relative z-10 p-5 sm:p-7 rounded-[26px] sm:rounded-[30px] border transition-all duration-200 cursor-pointer ${
                isCurrent
                  ? 'bg-white border-2 border-[#090D16] shadow-[0_12px_36px_-6px_rgba(9,13,22,0.12)] scale-[1.01]'
                  : isCompleted
                  ? 'bg-emerald-50/35 border-emerald-200/80 hover:bg-emerald-50/60 hover:shadow-xs'
                  : 'bg-white border-black/[0.06] hover:border-black/20 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Status Indicator Icon */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 shadow-2xs transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-[#090D16] text-white ring-4 ring-amber-400/35'
                      : 'bg-black/[0.04] text-black/40'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Unlock className="w-4 h-4" />
                  ) : (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-black/50">
                        {language === 'hi' ? `पाठ ${lessonNumber}` : `Lesson ${lessonNumber}`}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#090D16] text-white font-mono shadow-2xs">
                          {language === 'hi' ? 'अगला' : 'Up Next'}
                        </span>
                      )}
                      {isCompleted && userProg && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100/90 text-emerald-900 border border-emerald-300/80 font-mono">
                          {language === 'hi' ? `स्कोर: ${userProg.quiz_score}%` : `Score: ${userProg.quiz_score}%`}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-black/50 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-black/40" />
                        {cardMinutes}m
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Award className="w-3 h-3 text-amber-500" />
                        {cardDifficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif italic font-bold text-lg sm:text-xl text-[#090D16] leading-snug">
                    {cardTitle}
                  </h3>

                  {cardSubtitle && (
                    <p className="text-xs sm:text-sm text-black/60 mt-1 font-light leading-relaxed line-clamp-2">
                      {cardSubtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
