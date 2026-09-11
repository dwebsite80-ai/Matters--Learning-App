import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Unlock,
  Play,
  Clock,
  Award,
  Sparkles,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { SubjectId, Topic, Lesson } from '../../types';
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
      <div className="flex items-center gap-3 border-b border-black/5 pb-4">
        <button
          onClick={onBack}
          className="p-2.5 rounded-full border border-black/10 bg-white hover:bg-[#F5F5F0] text-[#1A1A1A] transition-colors cursor-pointer"
          title={language === 'hi' ? 'विषयों पर वापस लौटें' : 'Back to Subjects'}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest block mb-0.5">
            {language === 'hi' ? 'विषय रोडमैप' : 'Subject Roadmap'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A] tracking-tight">
            {subName}
          </h1>
        </div>
      </div>

      {/* Subject Header Card */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-black/5 p-6 sm:p-7 shadow-sm">
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
          {subDesc}
        </p>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-mono font-medium text-gray-500 mb-1.5">
            <span>
              {language === 'hi'
                ? `प्रगति: ${progress.completedCount} / ${progress.totalCount} पूर्ण`
                : `Roadmap Progress: ${progress.completedCount} of ${progress.totalCount} completed`}
            </span>
            <span>{progress.percentage}%</span>
          </div>
          <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1A1A1A] rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Roadmap List */}
      <div className="space-y-4 relative">
        {/* Subtle vertical connecting line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-black/10 -z-0" />

        {topics.map((topic, index) => {
          const status = getTopicStatus(topic);
          const lesson = getLessonByTopicId(topic.id);
          const userProg = lesson ? progressMap[lesson.id] : undefined;
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';

          // Ensure card and detail page read from the SAME lesson object with resilient language resolution
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
              className={`relative z-10 p-5 rounded-[24px] border transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-white border-2 border-[#1A1A1A] shadow-md scale-[1.01]'
                  : isCompleted
                  ? 'bg-[#E6F4EA]/40 border-emerald-300 hover:bg-[#E6F4EA]/70'
                  : 'bg-white border-black/5 hover:border-black/20'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Status Indicator Icon */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-[#F5F5F0] text-gray-400'
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

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-gray-500">
                        {language === 'hi' ? `पाठ ${lessonNumber}` : `Lesson ${lessonNumber}`}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#1A1A1A] text-white">
                          {language === 'hi' ? 'अगला' : 'Up Next'}
                        </span>
                      )}
                      {isCompleted && userProg && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                          {language === 'hi' ? `प्रश्नोत्तरी: ${userProg.quiz_score}%` : `Quiz: ${userProg.quiz_score}%`}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-serif italic font-bold text-base text-[#1A1A1A] mt-1">
                    {cardTitle}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 font-light leading-relaxed">
                    {cardSubtitle}
                  </p>

                  <div className="mt-3.5 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {cardMinutes} {language === 'hi' ? 'मिनट' : 'min'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        {language === 'hi'
                          ? (cardDifficulty === 'Beginner' ? 'सरल' : cardDifficulty === 'Intermediate' ? 'मध्यम' : 'उन्नत')
                          : cardDifficulty}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`flex items-center gap-1 text-xs font-bold px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#1A1A1A] text-white hover:bg-black'
                          : isCompleted
                          ? 'text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50'
                          : 'text-[#1A1A1A] bg-[#F5F5F0] hover:bg-gray-200'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>
                        {isCompleted
                          ? (language === 'hi' ? 'पुनरावलोकन' : 'Review')
                          : (language === 'hi' ? 'शुरू करें' : 'Start')}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
