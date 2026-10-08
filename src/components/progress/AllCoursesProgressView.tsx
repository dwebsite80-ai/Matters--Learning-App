import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Search,
  X,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { SubjectId } from '../../types';
import { getSubjectThumbnail, getImageObjectPosition } from '../../data/courseImages';
import { MattersImage } from '../common/MattersImage';

interface AllCoursesProgressViewProps {
  onBack: () => void;
  onSelectSubject?: (subjectId: SubjectId) => void;
}

export const AllCoursesProgressView: React.FC<AllCoursesProgressViewProps> = ({
  onBack,
  onSelectSubject,
}) => {
  const { subjects, getSubjectProgress } = useLearning();
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-progress' | 'completed' | 'not-started'>('all');

  // Overall course completion summary
  const summary = useMemo(() => {
    let totalLessons = 0;
    let completedLessons = 0;
    let completedCourses = 0;
    let inProgressCourses = 0;
    let notStartedCourses = 0;

    subjects.forEach((sub) => {
      const prog = getSubjectProgress(sub.id);
      totalLessons += prog.totalCount;
      completedLessons += prog.completedCount;
      if (prog.percentage === 100) {
        completedCourses++;
      } else if (prog.completedCount > 0) {
        inProgressCourses++;
      } else {
        notStartedCourses++;
      }
    });

    const overallPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return {
      totalCourses: subjects.length,
      totalLessons,
      completedLessons,
      completedCourses,
      inProgressCourses,
      notStartedCourses,
      overallPct,
    };
  }, [subjects, getSubjectProgress]);

  // Filtered courses
  const filteredSubjects = useMemo(() => {
    return subjects.filter((sub) => {
      const prog = getSubjectProgress(sub.id);

      // Status filter
      if (statusFilter === 'completed' && prog.percentage !== 100) return false;
      if (statusFilter === 'in-progress' && (prog.completedCount === 0 || prog.percentage === 100)) return false;
      if (statusFilter === 'not-started' && prog.completedCount > 0) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = sub.name.toLowerCase().includes(q);
        const matchNameHi = sub.name_hi && sub.name_hi.toLowerCase().includes(q);
        const matchDesc = sub.description.toLowerCase().includes(q);
        const matchDescHi = sub.description_hi && sub.description_hi.toLowerCase().includes(q);
        if (!matchName && !matchNameHi && !matchDesc && !matchDescHi) return false;
      }

      return true;
    });
  }, [subjects, getSubjectProgress, statusFilter, searchQuery]);

  return (
    <div className="max-w-md mx-auto px-4 sm:px-5 py-3 sm:py-5 space-y-4 animate-fadeIn pb-28">
      {/* 1. TOP HEADER WITH BACK BUTTON */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={onBack}
          id="back-to-progress-btn"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#131926] border border-black/[0.08] dark:border-white/[0.08] text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white shadow-2xs active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'प्रगति पर वापस' : 'Back to Progress'}</span>
        </button>

        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
          {summary.completedCourses}/{summary.totalCourses} {language === 'hi' ? 'कोर्स पूर्ण' : 'Courses Done'}
        </span>
      </div>

      {/* 2. TITLE & SUBTITLE */}
      <div className="space-y-0.5">
        <h1 className="text-2xl sm:text-3xl font-serif italic text-[#090D16] dark:text-[#F8FAFC] tracking-tight font-medium flex items-center gap-2">
          <span>{language === 'hi' ? 'समग्र कोर्स प्रगति' : 'Complete Course Progress'}</span>
          <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" />
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
          {language === 'hi'
            ? 'आपके सभी विषयों की प्रगति और पाठ स्थिति।'
            : 'Track mastery across all learning domains and practical guides.'}
        </p>
      </div>

      {/* 3. OVERALL COMPLETION BANNER */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#090D16] via-[#1E1138] to-[#120B24] text-white shadow-sm border border-white/[0.08] space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Overall Knowledge Progress
            </span>
            <h3 className="font-serif italic font-bold text-base text-white">
              {summary.completedLessons} of {summary.totalLessons} Lessons Done
            </h3>
          </div>
          <span className="text-xl font-mono font-bold text-amber-400">
            {summary.overallPct}%
          </span>
        </div>

        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-[#FBBF24] rounded-full transition-all duration-500"
            style={{ width: `${summary.overallPct}%` }}
          />
        </div>
      </div>

      {/* 4. SEARCH & STATUS FILTER */}
      <div className="space-y-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'कोर्स खोजें...' : 'Search all courses...'}
            className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-[#131926] rounded-2xl border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#090D16] dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-black dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all' as const, label: `All (${subjects.length})` },
            { id: 'in-progress' as const, label: `In Progress (${summary.inProgressCourses})` },
            { id: 'completed' as const, label: `Completed (${summary.completedCourses})` },
            { id: 'not-started' as const, label: `Not Started (${summary.notStartedCourses})` },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                statusFilter === f.id
                  ? 'bg-violet-600 text-white shadow-2xs'
                  : 'bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. COMPLETE LIST OF ALL COURSES */}
      <div className="space-y-2">
        {filteredSubjects.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08]">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              No matching courses found
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search or filter.
            </p>
          </div>
        ) : (
          filteredSubjects.map((sub) => {
            const prog = getSubjectProgress(sub.id);
            const subName = language === 'hi' && sub.name_hi ? sub.name_hi : sub.name;
            const subDesc = language === 'hi' && sub.description_hi ? sub.description_hi : sub.description;
            const thumbnail = getSubjectThumbnail(sub.id);

            const isCompleted = prog.percentage === 100;
            const isInProgress = prog.completedCount > 0 && !isCompleted;

            return (
              <div
                key={sub.id}
                onClick={() => onSelectSubject && onSelectSubject(sub.id)}
                className={`p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex items-center gap-3.5 transition-all group ${
                  onSelectSubject ? 'cursor-pointer hover:border-black/20 dark:hover:border-white/20 active:scale-[0.99]' : ''
                }`}
              >
                {/* Course Image */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-black/10 dark:border-white/10 shadow-2xs">
                  <MattersImage
                    src={thumbnail}
                    alt={subName}
                    subjectId={sub.id}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ objectPosition: getImageObjectPosition(sub.id) }}
                  />
                </div>

                {/* Course Info & Progress */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1.5">
                    <h3 className="font-serif italic font-bold text-sm sm:text-base text-[#090D16] dark:text-[#F8FAFC] truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {subName}
                    </h3>
                    <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                      {prog.percentage}%
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 font-light">
                    {subDesc}
                  </p>

                  <div className="w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 to-[#FBBF24] rounded-full transition-all duration-500"
                      style={{ width: `${prog.percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-400 pt-0.5 font-mono">
                    <span>
                      {prog.completedCount} / {prog.totalCount} {language === 'hi' ? 'पाठ' : 'lessons'}
                    </span>

                    {/* Status Pill */}
                    {isCompleted ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    ) : isInProgress ? (
                      <span className="text-violet-600 dark:text-violet-400 font-semibold flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        In Progress
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        Not Started
                      </span>
                    )}
                  </div>
                </div>

                {/* Chevron Right */}
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-violet-600 transition-colors" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
