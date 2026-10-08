import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, Sparkles } from 'lucide-react';
import {
  INDIAN_MALE_AVATARS,
  INDIAN_FEMALE_AVATARS,
  AvatarOption,
} from '../../data/avatars';

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  onSelectAvatar: (avatarUrl: string) => void;
}

export const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  onSelectAvatar,
}) => {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [selectedImage, setSelectedImage] = useState<string>(currentAvatar);
  const [justSaved, setJustSaved] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const scrollYRef = useRef<number>(0);

  // Auto-detect gender of initial avatar
  useEffect(() => {
    if (currentAvatar) {
      setSelectedImage(currentAvatar);
      const isFemale = INDIAN_FEMALE_AVATARS.some((a) => a.image === currentAvatar);
      if (isFemale) {
        setSelectedGender('female');
      }
    }
  }, [currentAvatar, isOpen]);

  // Prevent background scroll and restore exact scroll position upon closing
  useEffect(() => {
    if (!isOpen) return;

    // Capture the exact viewport scroll position when opening
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;
    scrollYRef.current = scrollY;

    // Save previous document body styles
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;

    // Lock body in place without shifting
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Keyboard accessibility: Close on Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restore body styles
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      document.body.style.overflow = prevOverflow;

      // Restore exact previous scroll position with zero jump
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;
  if (typeof document === 'undefined') return null;

  const currentList: AvatarOption[] =
    selectedGender === 'male' ? INDIAN_MALE_AVATARS : INDIAN_FEMALE_AVATARS;

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 180);
  };

  const handleApply = () => {
    onSelectAvatar(selectedImage);
    setJustSaved(true);
    setTimeout(() => {
      setJustSaved(false);
      handleDismiss();
    }, 300);
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-modal-title"
      className={`fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-auto transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* 1. Fullscreen Dark Backdrop covering entire viewport (Header, Cards, BottomNav, Tia) */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn cursor-pointer"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* 2. Bottom Sheet on Mobile / Centered Card on Desktop */}
      <div
        className={`relative z-10 w-full sm:max-w-md md:max-w-lg bg-[#FAFAF8] dark:bg-[#101522] rounded-t-[32px] sm:rounded-[32px] border border-black/10 dark:border-white/10 shadow-[0_-16px_48px_rgba(0,0,0,0.32)] dark:shadow-[0_-16px_48px_rgba(0,0,0,0.7)] flex flex-col max-h-[75vh] sm:max-h-[85vh] overflow-hidden transition-transform duration-200 ${
          isClosing
            ? 'translate-y-full sm:scale-95'
            : 'animate-sheetSlideUp sm:animate-slideUp'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Indicator */}
        <div className="w-12 h-1.5 rounded-full bg-black/15 dark:bg-white/20 mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Sheet Header: Always visible & fixed at top of sheet */}
        <div className="shrink-0 px-5 sm:px-6 pt-3 sm:pt-5 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="avatar-modal-title"
                className="text-lg sm:text-xl font-bold font-serif text-[#090D16] dark:text-[#F8FAFC] flex items-center gap-2"
              >
                Choose Your Avatar
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Pick an avatar that feels like you.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close dialog"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gender Tabs */}
          <div className="mt-3.5 flex bg-slate-200/70 dark:bg-[#1A2234] p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setSelectedGender('male')}
              className={`flex-1 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedGender === 'male'
                  ? 'bg-white dark:bg-[#0E131F] text-violet-700 dark:text-violet-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setSelectedGender('female')}
              className={`flex-1 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedGender === 'female'
                  ? 'bg-white dark:bg-[#0E131F] text-violet-700 dark:text-violet-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Scrollable Avatar Grid: Only this section scrolls internally */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-4">
          <div className="grid grid-cols-4 gap-3 sm:gap-4 pb-2">
            {currentList.map((avatar) => {
              const isSelected = selectedImage === avatar.image;
              return (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedImage(avatar.image)}
                  className="group relative flex flex-col items-center focus:outline-none transition-transform active:scale-95 cursor-pointer"
                  title={`Select ${avatar.name}`}
                  aria-label={`Select ${avatar.name}`}
                >
                  <div
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden transition-all duration-200 ${
                      isSelected
                        ? 'ring-4 ring-violet-600 dark:ring-violet-500 scale-105 shadow-md'
                        : 'border-2 border-black/10 dark:border-white/10 group-hover:border-violet-300 dark:group-hover:border-violet-700 opacity-90 group-hover:opacity-100'
                    }`}
                  >
                    <img
                      src={avatar.image}
                      alt={avatar.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Checkmark overlay badge on selected avatar */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-violet-600/25 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-md animate-scaleIn">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fixed Bottom Action Area: Always visible with safe-area insets */}
        <div className="shrink-0 px-5 sm:px-6 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] bg-white/90 dark:bg-[#0E131F]/90 backdrop-blur-md border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-violet-600 dark:border-violet-400 shadow-xs shrink-0">
              <img
                src={selectedImage}
                alt="Selected preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden xs:inline">
              Selected
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 xs:flex-initial justify-end">
            <button
              type="button"
              onClick={handleDismiss}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                justSaved
                  ? 'bg-emerald-600'
                  : 'bg-violet-600 hover:bg-violet-700 active:scale-98'
              }`}
            >
              {justSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                'Save Avatar'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
