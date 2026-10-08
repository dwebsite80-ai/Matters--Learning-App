import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, X } from 'lucide-react';
import { TiaAvatar } from './TiaAvatar';
import { TiaState } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface TiaFloatingButtonProps {
  onClick: () => void;
  state?: TiaState;
  hasLessonContext?: boolean;
}

const TIA_STORAGE_POS_KEY = 'matters_tia_position_v1';
const DRAG_THRESHOLD_PX = 7;

export const TiaFloatingButton: React.FC<TiaFloatingButtonProps> = ({
  onClick,
  state = 'idle',
  hasLessonContext = false,
}) => {
  const { language } = useLanguage();
  const [showBubble, setShowBubble] = useState<boolean>(true);
  const [bubbleText, setBubbleText] = useState<string>('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const posStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const justDraggedRef = useRef<boolean>(false);

  // Clamps position within safe visible viewport boundaries
  const clampPosition = useCallback(
    (x: number, y: number, btnWidth?: number, btnHeight?: number) => {
      if (typeof window === 'undefined') return { x, y };

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const isMobile = winW < 768;

      const w = btnWidth || (buttonRef.current?.offsetWidth ?? (isMobile ? 118 : 150));
      const h = btnHeight || (buttonRef.current?.offsetHeight ?? (isMobile ? 44 : 50));

      const minX = 10;
      const maxX = Math.max(minX, winW - w - 10);

      // Keep safe distance below top navbar (~56-64px)
      const minY = 62;

      // Keep safe distance above mobile bottom navigation (~70-74px)
      const bottomNavReserve = isMobile ? 74 : 24;
      const maxY = Math.max(minY, winH - h - bottomNavReserve);

      return {
        x: Math.round(Math.min(Math.max(minX, x), maxX)),
        y: Math.round(Math.min(Math.max(minY, y), maxY)),
      };
    },
    []
  );

  // Initialize position from localStorage or smart bottom-right default
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const isMobile = winW < 768;
    const w = isMobile ? 118 : 150;
    const h = isMobile ? 44 : 50;

    let initialPos: { x: number; y: number } | null = null;

    try {
      const saved = localStorage.getItem(TIA_STORAGE_POS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
          initialPos = clampPosition(parsed.x, parsed.y, w, h);
        }
      }
    } catch {
      // ignore
    }

    if (!initialPos) {
      // Default: bottom-right above mobile nav bar
      const defX = winW - w - (isMobile ? 12 : 24);
      const defY = winH - h - (isMobile ? 74 : 32);
      initialPos = clampPosition(defX, defY, w, h);
    }

    setPosition(initialPos);
  }, [clampPosition]);

  // Re-clamp on window resize so Tia never gets lost outside viewport
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return null;
        return clampPosition(prev.x, prev.y);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clampPosition]);

  // Speech bubble cyclical text
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

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    // Only primary mouse button or touch/pen
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    posStartRef.current = position || {
      x: window.innerWidth - 130,
      y: window.innerHeight - 120,
    };
    hasMovedRef.current = false;
    isDraggingRef.current = true;
    justDraggedRef.current = false;
    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;

    if (!hasMovedRef.current && Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) {
      hasMovedRef.current = true;
    }

    if (hasMovedRef.current) {
      const newX = posStartRef.current.x + dx;
      const newY = posStartRef.current.y + dy;
      const clamped = clampPosition(newX, newY);
      setPosition(clamped);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (hasMovedRef.current) {
      // It was a drag action
      justDraggedRef.current = true;

      // Persist newly placed position
      if (position) {
        try {
          localStorage.setItem(TIA_STORAGE_POS_KEY, JSON.stringify(position));
        } catch {
          // ignore
        }
      }

      // Clear dragged flag after microtask to ensure click event doesn't fire
      setTimeout(() => {
        justDraggedRef.current = false;
      }, 80);
    } else {
      // Pure tap / click without movement: open modal!
      onClick();
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (justDraggedRef.current || hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick();
  };

  const isHindi = language === 'hi';

  // Smart placement for speech bubble so it never clips offscreen
  const isTopHalf = position ? position.y < 130 : false;
  const isLeftHalf = position ? position.x < (typeof window !== 'undefined' ? window.innerWidth / 2 : 200) : false;

  return (
    <div
      style={
        position
          ? {
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
              top: 0,
              left: 0,
            }
          : {
              bottom: 'calc(env(safe-area-inset-bottom, 0px) + 70px)',
              right: '11px',
            }
      }
      className={`fixed z-40 flex flex-col pointer-events-none transition-transform ${
        isDragging ? 'duration-0 select-none' : 'duration-75 ease-out'
      }`}
    >
      {/* Speech bubble prompt */}
      {showBubble && (
        <div
          className={`pointer-events-auto absolute ${
            isTopHalf ? 'top-[calc(100%+6px)]' : 'bottom-[calc(100%+6px)]'
          } ${
            isLeftHalf ? 'left-0' : 'right-0'
          } flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-2xl bg-white/95 dark:bg-[#131926]/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] shadow-[0_4px_16px_rgb(0,0,0,0.12)] dark:shadow-[0_4px_16px_rgb(0,0,0,0.5)] text-[#121212] dark:text-[#F8FAFC] max-w-[150px] sm:max-w-[210px] animate-fadeIn transition-all`}
        >
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 shrink-0" />
          <span className="font-medium text-[9px] sm:text-[11px] leading-tight truncate">
            {bubbleText}
          </span>
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

      {/* Main compact floating draggable launcher */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`pointer-events-auto group box-border flex items-center gap-[5.5px] sm:gap-2 px-1.5 py-1 sm:pl-2 sm:pr-3 sm:py-1.5 rounded-full bg-[#121212] hover:bg-black text-white shadow-[0_6px_20px_-3px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_24px_-3px_rgba(0,0,0,0.45)] border border-white/[0.12] w-[118px] max-[360px]:w-[112px] h-[44px] max-[360px]:h-[42px] sm:w-[150px] sm:h-[50px] select-none touch-none cursor-grab active:cursor-grabbing transition-all ${
          isDragging
            ? 'scale-105 shadow-[0_12px_28px_rgba(0,0,0,0.55)] ring-2 ring-violet-400/50 opacity-95'
            : 'hover:scale-[1.02] active:scale-95'
        }`}
        aria-label="Open Tia AI Voice Learning Assistant (Touch and drag to reposition)"
        title="Drag to reposition · Tap to chat"
      >
        <div className="shrink-0 flex items-center justify-center pointer-events-none">
          <TiaAvatar state={state} size="xs" showBadge={false} />
        </div>
        <div className="flex flex-col text-left min-w-0 flex-1 justify-center overflow-hidden pr-0.5 pointer-events-none">
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

