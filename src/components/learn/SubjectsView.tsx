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
      default:
        return BookOpen;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-black/5 pb-5">
        <span className="text-[10px] uppercase tracking-widest text-[#888] font-semibold block mb-1">
          {language === 'hi' ? 'संरचित पाठ्यक्रम' : 'Structured Curriculum'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif italic text-[#1A1A1A] tracking-tight">
          {language === 'hi' ? 'सभी मुख्य विषय' : 'Essential Subjects'}
        </h1>
        <p className="text-xs text-gray-500 mt-1 max-w-xl font-light">
          {language === 'hi'
            ? 'व्यावहारिक जीवन ज्ञान एवं प्रतियोगी परीक्षा की नींव, प्रत्येक विषय में 10 संरचित पाठ।'
            : 'Practical life knowledge divided into 10 structured roadmap topics per domain.'}
        </p>
      </div>

      <div className="space-y-5">
        {subjects.map((sub) => {
          const Icon = getIcon(sub.id);
          const progress = getSubjectProgress(sub.id);

          const iconBg =
            sub.id === 'law-rights'
              ? 'bg-[#E6F4EA] text-emerald-800'
              : sub.id === 'money-finance'
              ? 'bg-[#FEF7E0] text-amber-800'
              : sub.id === 'economics'
              ? 'bg-[#F4EBF7] text-purple-800'
              : sub.id === 'bihar-gk'
              ? 'bg-[#FDF2F8] text-rose-800'
              : sub.id === 'polity-constitution'
              ? 'bg-[#F5F3FF] text-blue-800'
              : sub.id === 'personality-development'
              ? 'bg-[#E6FFFA] text-teal-800'
              : sub.id === 'dressing-sense'
              ? 'bg-[#EDE9FE] text-violet-800'
              : sub.id === 'case-studies'
              ? 'bg-[#FEF3C7] text-amber-900'
              : sub.id === 'time-management'
              ? 'bg-[#CCFBF1] text-teal-900'
              : 'bg-[#FFFBEB] text-amber-900';

          const subName = language === 'hi' && sub.name_hi ? sub.name_hi : sub.name;
          const subDesc = language === 'hi' && sub.description_hi ? sub.description_hi : sub.description;

          return (
            <div
              key={sub.id}
              onClick={() => onSelectSubject(sub.id)}
              className="bg-white rounded-[28px] sm:rounded-[32px] border border-black/5 p-6 sm:p-7 shadow-sm hover:border-black/20 transition-all cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div
                  className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 shadow-xs`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-serif italic font-bold text-xl text-[#1A1A1A] group-hover:underline">
                      {subName}
                    </h3>
                    <span className="text-xs font-mono text-gray-500 font-medium">
                      {progress.completedCount} / {progress.totalCount} {language === 'hi' ? 'पाठ पूर्ण' : 'Lessons Complete'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed font-light">
                    {subDesc}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] font-mono font-medium text-gray-500 mb-1.5">
                      <span>{language === 'hi' ? 'पूर्णता प्रतिशत' : 'Completion'}</span>
                      <span>{progress.percentage}%</span>
                    </div>
                    <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1A1A1A] rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA row */}
                  <div className="mt-4 pt-3.5 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-black" />
                      <span>
                        {progress.totalCount} {language === 'hi' ? 'मुख्य व्यावहारिक पाठ' : 'Core Practical Topics'}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#1A1A1A] text-white hover:bg-black group-hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>{language === 'hi' ? 'पाठ्यक्रम देखें' : 'Explore Roadmap'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Future Subjects Preview */}
      <div className="bg-[#1A1A1A] text-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 relative overflow-hidden">
        <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{language === 'hi' ? 'आगामी रिलीज़' : 'Upcoming Releases'}</span>
        </div>
        <h4 className="font-serif italic text-xl text-white">
          {language === 'hi'
            ? 'साइबर सुरक्षा, आपातकालीन प्राथमिक उपचार और नागरिक अधिकार'
            : 'Cyber Safety, Emergency First Aid & Negotiation'}
        </h4>
        <p className="text-xs text-white/70 mt-1 max-w-xl font-light">
          {language === 'hi'
            ? 'दैनिक जीवन के निर्णयों को और अधिक सशक्त बनाने के लिए आगामी व्यावहारिक मॉड्यूल।'
            : 'Upcoming practical modules scheduled for roll-out to test further real-life decision capabilities.'}
        </p>
      </div>
    </div>
  );
};
