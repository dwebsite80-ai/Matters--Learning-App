import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Award,
  Bookmark,
  MoreVertical,
  ChevronRight,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { SubjectId, Lesson } from '../../types';
import { getTopicsBySubject, getLessonByTopicId, getSubjectById } from '../../data/initialContent';
import { useScrollToTop } from '../../lib/scrollHelper';
import {
  getSubjectBanner,
  getLessonImage,
  getImageObjectPosition,
} from '../../data/courseImages';
import { MattersImage } from '../common/MattersImage';

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
  const bannerImage = getSubjectBanner(subjectId);

  return (
    <div className="max-w-md mx-auto px-4 sm:px-5 py-3 sm:py-5 space-y-4 animate-fadeIn pb-28">
      {/* 1. TOP NAVIGATION HEADER */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white border border-black/[0.08] text-[#090D16] hover:bg-slate-50 transition-all cursor-pointer active:scale-95 shadow-2xs"
          title={language === 'hi' ? 'वापस लौटें' : 'Back'}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="font-serif italic font-bold text-lg text-[#090D16] truncate">
          {subName}
        </h1>

        <div className="flex items-center gap-1">
          <button
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            title="Bookmark"
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            title="Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. HERO BANNER IMAGE (MATCHING REFERENCE MOCKUP SCREEN 3) */}
      <div className="relative h-36 sm:h-44 w-full rounded-2xl overflow-hidden shadow-sm border border-black/10">
        <MattersImage
          src={bannerImage}
          alt={subName}
          subjectId={subjectId}
          className="w-full h-full object-cover"
          style={{ objectPosition: getImageObjectPosition(subjectId) }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 3. COURSE OVERVIEW CARD */}
      <div className="bg-white rounded-2xl border border-black/[0.06] p-4 shadow-sm space-y-2.5">
        <h2 className="font-serif italic font-bold text-lg sm:text-xl text-[#090D16]">
          {subName}
        </h2>
        <p className="text-xs text-slate-500 font-light leading-relaxed">
          {subDesc}
        </p>

        <div className="pt-1 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono font-medium text-slate-500">
            <span>
              {language === 'hi'
                ? `${progress.completedCount} / ${progress.totalCount} पाठ पूर्ण`
                : `${progress.completedCount} of ${progress.totalCount} lessons completed`}
            </span>
            <span className="font-bold text-slate-700">{progress.percentage}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-[#FBBF24] rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. LESSON LIST TIMELINE (MATCHING REFERENCE MOCKUP SCREEN 3) */}
      <div className="space-y-3 pt-1">
        {topics.map((topic, index) => {
          const status = getTopicStatus(topic);
          const lesson = getLessonByTopicId(topic.id);
          const userProg = lesson ? progressMap[lesson.id] : undefined;
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';

          const cardTitle = language === 'hi'
            ? (lesson?.title_hi || lesson?.title || topic.title_hi || topic.title)
            : (lesson?.title_en || lesson?.title || topic.title);
          const cardMinutes = lesson?.estimatedMinutes ?? lesson?.estimated_minutes ?? topic.estimated_minutes ?? 10;
          const cardDifficulty = lesson?.difficulty ?? topic.difficulty ?? 'Beginner';
          const lessonNumber = index + 1;
          const lessonImg = getLessonImage(lesson || topic, subjectId, cardTitle);

          return (
            <div
              key={topic.id}
              onClick={() => {
                if (lesson) onStartLesson(lesson);
              }}
              className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer active:scale-[0.99] flex items-center gap-3 group ${
                isCurrent
                  ? 'bg-amber-50/40 border-amber-300 shadow-sm ring-1 ring-amber-300/50'
                  : isCompleted
                  ? 'bg-white border-black/[0.06] shadow-sm hover:border-black/20'
                  : 'bg-white border-black/[0.06] shadow-2xs hover:border-black/20'
              }`}
            >
              {/* Thumbnail Image for Lesson */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-black/10 shadow-2xs relative">
                <MattersImage
                  src={lessonImg}
                  alt={cardTitle}
                  fallbackSrc={bannerImage}
                  subjectId={subjectId}
                  lessonId={lesson?.id || topic.id}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ objectPosition: getImageObjectPosition(lesson || topic, subjectId) }}
                />
                {isCompleted && (
                  <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs z-10">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isCurrent
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {language === 'hi' ? `पाठ ${lessonNumber}` : `Lesson ${lessonNumber}`}
                  </span>
                  {isCompleted && userProg && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Score: {userProg.quiz_score}%
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      Score: 56%
                    </span>
                  )}
                </div>

                <h3 className="font-serif italic font-bold text-sm text-[#090D16] group-hover:text-violet-700 transition-colors leading-snug line-clamp-1">
                  {cardTitle}
                </h3>

                <div className="flex items-center gap-2.5 text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {cardMinutes} mins
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    {cardDifficulty}
                  </span>
                  <span>·</span>
                  <span className="font-bold text-violet-700">+20 XP</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-[#090D16] group-hover:text-white transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
