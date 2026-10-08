import React, { useState } from 'react';
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

  // If initial currentAvatar matches a female avatar, auto-select female tab
  React.useEffect(() => {
    if (currentAvatar) {
      setSelectedImage(currentAvatar);
      const isFemale = INDIAN_FEMALE_AVATARS.some((a) => a.image === currentAvatar);
      if (isFemale) {
        setSelectedGender('female');
      }
    }
  }, [currentAvatar, isOpen]);

  if (!isOpen) return null;

  const currentList: AvatarOption[] =
    selectedGender === 'male' ? INDIAN_MALE_AVATARS : INDIAN_FEMALE_AVATARS;

  const handleApply = () => {
    onSelectAvatar(selectedImage);
    setJustSaved(true);
    setTimeout(() => {
      setJustSaved(false);
      onClose();
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-[#FAFAF8] dark:bg-[#101522] rounded-t-[32px] sm:rounded-[32px] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative px-6 pt-5 pb-3 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
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
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gender Tabs */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex bg-slate-200/70 dark:bg-[#1A2234] p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setSelectedGender('male')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
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
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedGender === 'female'
                  ? 'bg-white dark:bg-[#0E131F] text-violet-700 dark:text-violet-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Avatars Grid */}
        <div className="px-6 py-4 overflow-y-auto max-h-[50vh] sm:max-h-[55vh]">
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {currentList.map((avatar) => {
              const isSelected = selectedImage === avatar.image;
              return (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedImage(avatar.image)}
                  className={`group relative flex flex-col items-center focus:outline-none transition-transform active:scale-95`}
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
                      <div className="absolute inset-0 bg-violet-600/20 flex items-center justify-center">
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

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white/70 dark:bg-[#0E131F]/70 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-violet-600 dark:border-violet-400 shadow-xs">
              <img
                src={selectedImage}
                alt="Selected preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              Selected avatar preview
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 sm:flex-initial justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center justify-center gap-1.5 transition-all duration-200 ${
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
};
