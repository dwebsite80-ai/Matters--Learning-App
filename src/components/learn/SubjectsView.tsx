import React from 'react';
import {
  Scale,
  Coins,
  TrendingUp,
  ChevronRight,
  BookOpen,
  Sparkles,
  Landmark,
  ShieldCheck,
  Compass,
  Shirt,
  Lightbulb,
  Clock,
  HeartPulse,
  Flame,
  Sprout,
  BrainCircuit,
  HelpCircle,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { SubjectId } from '../../types';

interface SubjectsViewProps {
  onSelectSubject: (subjectId: SubjectId) => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({ onSelectSubject }) => {
  const { subjects, getSubjectProgress } = useLearning();
  const { language } = useLanguage();

  const getIcon = (id: SubjectId) => {
    switch (id) {
      case 'law-rights':
        return Scale;
      case 'money-finance':
        return Coins;
      case 'economics':
        return TrendingUp;
      case 'bihar-gk':
        return Landmark;
      case 'polity-constitution':
        return ShieldCheck;
      case 'history-movement':
        return Compass;
      case 'personality-development':
        return Sparkles;
      case 'dressing-sense':
        return Shirt;
      case 'case-studies':
        return Lightbulb;
      case 'time-management':
        return Clock;
      case 'first-aid':
        return HeartPulse;
      case 'survival-skills':
        return Flame;
      case 'modern-farming':
        return Sprout;
      case 'philosophy':
        return HelpCircle;
      case 'paradoxes':
        return BrainCircuit;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-black/[0.06] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-black/50 font-bold font-mono">
            {language === 'hi' ? 'संरचित पाठ्यक्रम' : 'Structured Curriculum'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#090D16] tracking-tight font-medium">
          {language === 'hi' ? 'सभी मुख्य विषय' : 'Essential Domains'}
        </h1>
        <p className="text-xs sm:text-sm text-black/60 mt-2 max-w-xl font-light leading-relaxed">
          {language === 'hi'
            ? 'व्यावहारिक जीवन ज्ञान एवं प्रतियोगी परीक्षा की नींव, प्रत्येक विषय में संरचित पाठ।'
            : 'Essential practical wisdom divided into 10 structured roadmap topics per domain.'}
        </p>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {subjects.map((sub) => {
          const Icon = getIcon(sub.id);
          const progress = getSubjectProgress(sub.id);

          const subName = language === 'hi' && sub.name_hi ? sub.name_hi : sub.name;
          const subDesc = language === 'hi' && sub.description_hi ? sub.description_hi : sub.description;

          return (
            <div
              key={sub.id}
              onClick={() => onSelectSubject(sub.id)}
              className="bg-white rounded-[30px] sm:rounded-[36px] border border-black/[0.06] p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.08)] hover:border-black/20 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAFAF8] border border-black/[0.06] flex items-center justify-center text-black/80 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-violet-50 group-hover:text-violet-700 group-hover:border-violet-200 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-black/60 bg-black/[0.04] px-3 py-1.5 rounded-full border border-black/[0.04] shadow-2xs">
                    {progress.completedCount} / {progress.totalCount} {language === 'hi' ? 'पूर्ण' : 'Done'}
                  </span>
                </div>

                <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-[#090D16] group-hover:text-violet-700 transition-colors">
                  {subName}
                </h3>

                <p className="text-xs sm:text-sm text-black/60 mt-2 leading-relaxed font-light line-clamp-2">
                  {subDesc}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-black/[0.06]">
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[11px] font-mono font-medium text-black/50 mb-1.5">
                    <span>{language === 'hi' ? 'पूर्णता' : 'Mastery'}</span>
                    <span className="font-bold text-black/80">{progress.percentage}%</span>
                  </div>
                  <div className="w-full bg-black/[0.04] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 via-indigo-600 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>

                {/* CTA row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-black/55 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-black/70" />
                    <span>
                      {progress.totalCount} {language === 'hi' ? 'मुख्य पाठ' : 'Lessons'}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#090D16] group-hover:text-violet-700 transition-colors">
                    <span>{language === 'hi' ? 'रोडमैप देखें' : 'View Roadmap'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Modules Preview Card */}
      <div className="bg-[#090D16] text-white rounded-[32px] sm:rounded-[40px] p-7 sm:p-10 relative overflow-hidden border border-white/[0.1] shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 via-violet-600/25 to-transparent rounded-full blur-[90px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-amber-300 text-[10px] uppercase font-bold tracking-widest mb-3 font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{language === 'hi' ? 'आगामी रिलीज़' : 'Upcoming Expansion'}</span>
          </div>
          <h4 className="font-serif italic text-2xl sm:text-3xl text-white font-normal leading-snug">
            {language === 'hi'
              ? 'साइबर सुरक्षा, आपातकालीन प्राथमिक उपचार और नागरिक अधिकार'
              : 'Cyber Defense, Emergency Preparedness & High-Stakes Negotiation'}
          </h4>
          <p className="text-xs sm:text-sm text-white/75 mt-3 font-light leading-relaxed">
            {language === 'hi'
              ? 'दैनिक जीवन के निर्णयों को और अधिक सशक्त बनाने के लिए आगामी व्यावहारिक मॉड्यूल।'
              : 'Curated practical micro-modules being prepared to further accelerate real-life decision-making capabilities.'}
          </p>
        </div>
      </div>
    </div>
  );
};
