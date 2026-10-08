import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { TiaAvatar } from './TiaAvatar';
import { TiaState } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface TiaFloatingButtonProps {
  onClick: () => void;
  state?: TiaState;
  hasLessonContext?: boolean;
}

export const TiaFloatingButton: React.FC<TiaFloatingButtonProps> = ({
  onClick,
  state = 'idle',
  hasLessonContext = false,
}) => {
  const { language } = useLanguage();
  const [showBubble, setShowBubble] = useState<boolean>(true);
  const [bubbleText, setBubbleText] = useState<string>('');

  useEffect(() => {
    const isHindi = language === 'hi';
    const hints = isHindi
      ? [
          hasLessonContext ? 'क्या यह पाठ समझना है? 💡' : 'सीखने में मदद चाहिए? टिया से पूछें! ✨',
          '😂 "मज़ाकिया बनाएं" आज़माएँ!',
          'टिया से बात करने के लिए टैप करें 🎙️',
          '1-मिनट के वॉइस क्विज़ के लिए तैयार? 🎯',
        ]
      : [
          hasLessonContext ? 'Want me to explain this lesson? 💡' : 'Need help learning? Ask Tia! ✨',
          'Try clicking "😂 Make It Funny"!',
          'Tap to talk with Tia 🎙️',
          'Ready for a 1-minute voice quiz? 🎯',
        ];

    setBubbleText(hints[0]);

    const interval = setInterval(() => {
      setBubbleText(hints[Math.floor(Math.random() * hints.length)]);
    }, 12000);

    return () => clearInterval(interval);
  }, [hasLessonContext, language]);

  const isHindi = language === 'hi';

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+70px)] sm:bottom-8 right-[11px] sm:right-6 z-40 flex flex-col items-end gap-1.5 pointer-events-none">
      {/* Speech bubble prompt */}
      {showBubble && (
        <div className="pointer-events-auto flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-2xl bg-white/95 dark:bg-[#131926]/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] shadow-[0_4px_16px_rgb(0,0,0,0.12)] dark:shadow-[0_4px_16px_rgb(0,0,0,0.5)] text-[#121212] dark:text-[#F8FAFC] max-w-[150px] sm:max-w-[210px] animate-fadeIn transition-colors">
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 shrink-0" />
          <span className="font-medium text-[9px] sm:text-[11px] leading-tight truncate">{bubbleText}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="p-0.5 text-black/40 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors rounded-full cursor-pointer ml-auto shrink-0"
            aria-label="Dismiss bubble"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      )}

      {/* Main compact floating launcher */}
      <button
        onClick={onClick}
        className="pointer-events-auto group box-border flex items-center gap-[5.5px] sm:gap-2 px-1.5 py-1 sm:pl-2 sm:pr-3 sm:py-1.5 rounded-full bg-[#121212] hover:bg-black text-white shadow-[0_6px_20px_-3px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_24px_-3px_rgba(0,0,0,0.45)] active:scale-95 transition-all duration-200 border border-white/[0.12] cursor-pointer hover:scale-[1.02] w-[118px] max-[360px]:w-[112px] h-[44px] max-[360px]:h-[42px] sm:w-[150px] sm:h-[50px] select-none"
        aria-label="Open Tia AI Voice Learning Assistant"
      >
        <div className="shrink-0 flex items-center justify-center">
          <TiaAvatar state={state} size="xs" showBadge={false} />
        </div>
        <div className="flex flex-col text-left min-w-0 flex-1 justify-center overflow-hidden pr-0.5">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[12.5px] max-[360px]:text-[12px] leading-tight tracking-tight text-white whitespace-nowrap truncate">
              Tia AI
            </span>
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
          </div>
          <span className="text-[8px] text-white/65 font-mono tracking-tight leading-none mt-0.5 whitespace-nowrap truncate">
            {isHindi ? 'वॉइस ट्यूटर' : 'Voice Tutor'}
          </span>
        </div>
      </button>
    </div>
  );
};
