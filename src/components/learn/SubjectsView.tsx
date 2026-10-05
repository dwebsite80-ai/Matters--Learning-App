import React, { useState } from 'react';
import {
  ChevronRight,
  Search,
  X,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { SubjectId } from '../../types';
import { getSubjectThumbnail } from '../../data/courseImages';

interface SubjectsViewProps {
  onSelectSubject: (subjectId: SubjectId) => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({ onSelectSubject }) => {
  const { subjects, getSubjectProgress } = useLearning();
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label_en: 'All', label_hi: 'सभी' },
    { id: 'philosophy', label_en: 'Philosophy', label_hi: 'दर्शनशास्त्र', ids: ['philosophy', 'paradoxes'] },
    { id: 'finance', label_en: 'Finance', label_hi: 'वित्त', ids: ['money-finance', 'economics', 'case-studies'] },
    { id: 'law', label_en: 'Law & Rights', label_hi: 'विधि व अधिकार', ids: ['law-rights', 'polity-constitution'] },
    { id: 'history', label_en: 'History', label_hi: 'इतिहास', ids: ['history-movement', 'bihar-gk'] },
    { id: 'science', label_en: 'Science', label_hi: 'विज्ञान', ids: ['modern-farming', 'survival-skills', 'first-aid'] },
    { id: 'society', label_en: 'Society', label_hi: 'समाज', ids: ['personality-development', 'dressing-sense', 'time-management'] },
  ];

  // Filter subjects based on search query and category pill
  const filteredSubjects = subjects.filter((sub) => {
    // 1. Category filter
    if (selectedCategory !== 'all') {
      const activeCat = categories.find((c) => c.id === selectedCategory);
      if (activeCat?.ids && !activeCat.ids.includes(sub.id)) {
        return false;
      }
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = sub.name.toLowerCase().includes(q);
      const matchNameHi = sub.name_hi && sub.name_hi.toLowerCase().includes(q);
      const matchDesc = sub.description.toLowerCase().includes(q);
      const matchDescHi = sub.description_hi && sub.description_hi.toLowerCase().includes(q);
      if (!matchName && !matchNameHi && !matchDesc && !matchDescHi) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="max-w-md mx-auto px-4 sm:px-5 py-3 sm:py-5 space-y-4 animate-fadeIn pb-28">
      {/* 1. HEADER */}
      <div className="space-y-0.5 pt-1">
        <h1 className="text-2xl sm:text-3xl font-serif italic text-[#090D16] tracking-tight font-medium">
          {language === 'hi' ? 'अपने लिए कुछ नया सीखें' : 'Learn Something New For Yourself'}
        </h1>
        <p className="text-xs text-slate-500 font-light">
          {language === 'hi'
            ? 'ज्ञान, विचार और कौशल — एक ही जगह'
            : 'Knowledge, Ideas & Skills — All in One Place'}
        </p>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === 'hi' ? 'कोर्स खोजें...' : 'Search courses...'}
          className="w-full pl-10 pr-9 py-2.5 bg-white rounded-2xl border border-black/[0.08] text-xs text-[#090D16] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 3. HORIZONTAL CATEGORY PILLS */}
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 flex items-center gap-1.5 py-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const label = language === 'hi' ? cat.label_hi : cat.label_en;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 shrink-0 ${
                isActive
                  ? 'bg-violet-700 text-white shadow-xs'
                  : 'bg-white border border-black/[0.08] text-slate-600 hover:text-black hover:border-black/20'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 4. VERTICAL COURSE LIST (MATCHING REFERENCE MOCKUP SCREEN 2) */}
      <div className="space-y-3 pt-1">
        {filteredSubjects.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-black/[0.06] p-5 space-y-2">
            <p className="text-sm font-semibold text-slate-600">
              {language === 'hi' ? 'कोई मेल खाता कोर्स नहीं मिला' : 'No matching courses found'}
            </p>
            <p className="text-xs text-slate-400">
              {language === 'hi' ? 'कृपया अन्य कीवर्ड खोजें।' : 'Try another search keyword.'}
            </p>
          </div>
        ) : (
          filteredSubjects.map((sub) => {
            const progress = getSubjectProgress(sub.id);
            const subName = language === 'hi' && sub.name_hi ? sub.name_hi : sub.name;
            const subDesc = language === 'hi' && sub.description_hi ? sub.description_hi : sub.description;
            const thumbnail = getSubjectThumbnail(sub.id);

            return (
              <div
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className="p-3 sm:p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:border-black/20 hover:shadow-md transition-all cursor-pointer active:scale-[0.99] flex items-center gap-3.5 group"
              >
                {/* [Large Square High-Quality Photographic Thumbnail] */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-black/10 shadow-2xs">
                  <img
                    src={thumbnail}
                    alt={subName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* [Course Information] */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-serif italic font-bold text-sm sm:text-base text-[#090D16] group-hover:text-violet-700 transition-colors truncate">
                      {subName}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light">
                    {subDesc}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="font-mono">
                      {progress.totalCount} {language === 'hi' ? 'पाठ' : 'lessons'}
                    </span>
                    <span className="font-mono font-bold text-slate-600">
                      {progress.percentage}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 to-[#FBBF24] rounded-full transition-all duration-500"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Circular Arrow Button */}
                <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 shrink-0 group-hover:bg-[#090D16] group-hover:text-white transition-colors">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
