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
    <div className="fixed bottom-24 sm:bottom-8 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Speech bubble prompt */}
      {showBubble && (
        <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-xs text-[#121212] max-w-[240px] animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="font-medium text-[11px] leading-tight truncate">{bubbleText}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="p-0.5 text-black/40 hover:text-black transition-colors rounded-full cursor-pointer ml-auto shrink-0"
            aria-label="Dismiss bubble"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={onClick}
        className="pointer-events-auto group flex items-center gap-3 p-1.5 pr-4.5 rounded-full bg-[#121212] hover:bg-black text-white shadow-[0_12px_36px_-6px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_44px_-6px_rgba(0,0,0,0.45)] active:scale-95 transition-all duration-300 border border-white/[0.12] cursor-pointer hover:scale-[1.03]"
        aria-label="Open Tia AI Voice Learning Assistant"
      >
        <TiaAvatar state={state} size="sm" showBadge={false} />
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs tracking-wide">Tia AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-[9px] text-white/60 font-mono">
            {isHindi ? 'वॉइस ट्यूटर (hi-IN)' : 'Voice Tutor (en-IN)'}
          </span>
        </div>
      </button>
    </div>
  );
};
