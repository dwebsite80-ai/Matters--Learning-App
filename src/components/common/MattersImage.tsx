import React, { useState, useEffect } from 'react';
import { SubjectId } from '../../types';
import { getSubjectThumbnail, getImageObjectPosition } from '../../data/courseImages';

interface MattersImageProps {
  src?: string | null;
  alt: string;
  fallbackSrc?: string | null;
  subjectId?: SubjectId | string;
  lessonId?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  containerClassName?: string;
  showShimmer?: boolean;
}

/**
 * Subject Emoji / Icon mapping for local CSS/SVG placeholders
 */
const SUBJECT_EMOJIS: Record<string, string> = {
  'law-rights': '⚖️',
  'money-finance': '💰',
  economics: '📈',
  'bihar-gk': '🏛️',
  'polity-constitution': '🇮🇳',
  'history-movement': '📜',
  'personality-development': '✨',
  'dressing-sense': '👔',
  'case-studies': '🏢',
  'time-management': '⏳',
  'first-aid': '🩹',
  'survival-skills': '🧭',
  'modern-farming': '🌱',
  philosophy: '🏛️',
  paradoxes: '🌀',
};

/**
 * Curated, highly reliable high-resolution category fallback images (Tier 3)
 * Guaranteed 200 OK across CDNs
 */
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'law-rights': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  'money-finance': 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80',
  economics: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
  'polity-constitution': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
  'history-movement': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
  'dressing-sense': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
  'case-studies': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  'time-management': 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80',
  'first-aid': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
  'survival-skills': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
  'modern-farming': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
  philosophy: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  paradoxes: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
};

const isValidCandidate = (val: any): boolean => {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (
    trimmed === '' ||
    trimmed === 'undefined' ||
    trimmed === 'null' ||
    trimmed === '[object Object]' ||
    trimmed.startsWith('undefined')
  ) {
    return false;
  }
  return true;
};

/**
 * Reusable, production-grade image component with multi-level fallback system.
 * Guaranteed to NEVER show native broken image icons, empty white boxes, or plain alt text.
 *
 * Fallback priority:
 * 1. Primary image (src)
 * 2. Explicit fallback (fallbackSrc)
 * 3. Course/Subject image (via subjectId) + Curated reliable category fallback
 * 4. Local CSS/SVG visual placeholder
 */
export const MattersImage: React.FC<MattersImageProps> = ({
  src,
  alt,
  fallbackSrc,
  subjectId,
  lessonId,
  className = 'w-full h-full object-cover',
  style,
  loading = 'lazy',
  containerClassName,
  showShimmer = false,
}) => {
  // Construct the candidate fallback ladder
  const buildCandidateSources = (): string[] => {
    const list: string[] = [];

    // Tier 1: Primary src if valid
    if (isValidCandidate(src)) {
      list.push((src as string).trim());
    }

    // Tier 2: Explicit fallbackSrc if valid and unique
    if (isValidCandidate(fallbackSrc)) {
      const trimmed = (fallbackSrc as string).trim();
      if (!list.includes(trimmed)) {
        list.push(trimmed);
      }
    }

    // Tier 3: Subject thumbnail if subjectId provided
    if (subjectId) {
      try {
        const subThumb = getSubjectThumbnail(subjectId as SubjectId);
        if (isValidCandidate(subThumb) && !list.includes(subThumb)) {
          list.push(subThumb);
        }
      } catch {
        // Safe fallback
      }

      // Tier 3b: Curated reliable category fallback image
      const catFallback = CATEGORY_FALLBACK_IMAGES[subjectId];
      if (catFallback && !list.includes(catFallback)) {
        list.push(catFallback);
      }
    }

    return list;
  };

  const candidates = buildCandidateSources();
  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const [hasExhaustedAll, setHasExhaustedAll] = useState<boolean>(candidates.length === 0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Reset state when src, fallbackSrc, or subjectId changes
  useEffect(() => {
    const newCandidates = buildCandidateSources();
    setCandidateIndex(0);
    setHasExhaustedAll(newCandidates.length === 0);
    setIsLoaded(false);
  }, [src, fallbackSrc, subjectId]);

  // Compute final object position
  const computedObjectPosition = style?.objectPosition || getImageObjectPosition(lessonId || subjectId, subjectId);

  // Handle image load error: step down the ladder immediately
  const handleError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
      setIsLoaded(false);
    } else {
      // All candidate URLs failed; switch to pure local CSS/SVG placeholder
      setHasExhaustedAll(true);
    }
  };

  const currentSrc = candidates[candidateIndex];
  const emoji = (subjectId && SUBJECT_EMOJIS[subjectId]) || '✦';

  // Tier 4: Guaranteed Local Matters Visual Placeholder
  if (hasExhaustedAll || !currentSrc) {
    return (
      <div
        className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0c1222] via-[#1a233b] to-[#090D16] select-none ${
          containerClassName || ''
        }`}
        style={style}
        role="img"
        aria-label={alt}
      >
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_50%_40%,#fbbf24_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#8b5cf6_0%,transparent_60%)]" />

        {/* Centered Premium Matters Visual Badge */}
        <div className="relative z-10 flex flex-col items-center justify-center p-2 text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105">
            <span className="text-xl sm:text-2xl filter drop-shadow">{emoji}</span>
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300/80 font-bold mt-1.5 drop-shadow">
            MATTERS
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-900/10 ${containerClassName || ''}`}>
      {/* Subtle skeleton shimmer or warm placeholder during load */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-200 animate-pulse z-0" />
      )}

      {/* Image with zero-flash opacity gating: NEVER shows broken icon before or during error recovery */}
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          ...style,
          objectPosition: computedObjectPosition,
        }}
      />
    </div>
  );
};
