import React from 'react';
import { Lock } from 'lucide-react';
import { MedalTier, MedalMotif } from '../../data/achievementsData';

interface PremiumMedalProps {
  tier: MedalTier;
  motif: MedalMotif;
  locked?: boolean;
  size?: number;
  className?: string;
}

export const PremiumMedal: React.FC<PremiumMedalProps> = ({
  tier,
  motif,
  locked = false,
  size = 56,
  className = '',
}) => {
  // Unique gradient IDs based on tier and motif to prevent SVG ID collisions
  const idPrefix = `medal-${tier}-${motif}-${locked ? 'locked' : 'unlocked'}`;

  // Theme palettes for materials
  const palettes = {
    gold: {
      outerRimStart: '#FFE57F',
      outerRimEnd: '#B7791F',
      innerBezelStart: '#FFF8D6',
      innerBezelEnd: '#D69E2E',
      faceGradStart: '#F6E05E',
      faceGradEnd: '#D69E2E',
      deepShadow: '#744210',
      motifFill: '#744210',
      motifHighlight: '#FFF8D6',
      ribbonLeft: '#9B2C2C',
      ribbonRight: '#C53030',
      glowColor: 'rgba(246, 224, 94, 0.35)',
    },
    silver: {
      outerRimStart: '#FFFFFF',
      outerRimEnd: '#64748B',
      innerBezelStart: '#F8FAFC',
      innerBezelEnd: '#94A3B8',
      faceGradStart: '#E2E8F0',
      faceGradEnd: '#94A3B8',
      deepShadow: '#334155',
      motifFill: '#334155',
      motifHighlight: '#FFFFFF',
      ribbonLeft: '#1E3A8A',
      ribbonRight: '#2563EB',
      glowColor: 'rgba(203, 213, 225, 0.35)',
    },
    bronze: {
      outerRimStart: '#FED7AA',
      outerRimEnd: '#7C2D12',
      innerBezelStart: '#FFEDD5',
      innerBezelEnd: '#C2410C',
      faceGradStart: '#FDBA74',
      faceGradEnd: '#9A3412',
      deepShadow: '#431407',
      motifFill: '#431407',
      motifHighlight: '#FFEDD5',
      ribbonLeft: '#78350F',
      ribbonRight: '#92400E',
      glowColor: 'rgba(249, 115, 22, 0.3)',
    },
    amethyst: {
      outerRimStart: '#F5D0FE',
      outerRimEnd: '#581C87',
      innerBezelStart: '#FAF5FF',
      innerBezelEnd: '#7E22CE',
      faceGradStart: '#C084FC',
      faceGradEnd: '#6B21A8',
      deepShadow: '#3B0764',
      motifFill: '#3B0764',
      motifHighlight: '#F3E8FF',
      ribbonLeft: '#4C1D95',
      ribbonRight: '#6D28D9',
      glowColor: 'rgba(168, 85, 247, 0.35)',
    },
    emerald: {
      outerRimStart: '#A7F3D0',
      outerRimEnd: '#064E3B',
      innerBezelStart: '#ECFDF5',
      innerBezelEnd: '#047857',
      faceGradStart: '#34D399',
      faceGradEnd: '#065F46',
      deepShadow: '#022C22',
      motifFill: '#022C22',
      motifHighlight: '#D1FAE5',
      ribbonLeft: '#064E3B',
      ribbonRight: '#047857',
      glowColor: 'rgba(16, 185, 129, 0.35)',
    },
    locked: {
      outerRimStart: '#64748B',
      outerRimEnd: '#1E293B',
      innerBezelStart: '#475569',
      innerBezelEnd: '#0F172A',
      faceGradStart: '#334155',
      faceGradEnd: '#1E293B',
      deepShadow: '#0F172A',
      motifFill: '#64748B',
      motifHighlight: '#94A3B8',
      ribbonLeft: '#1E293B',
      ribbonRight: '#334155',
      glowColor: 'rgba(100, 116, 139, 0.15)',
    },
  };

  const p = locked ? palettes.locked : palettes[tier] || palettes.gold;

  const renderMotifIcon = () => {
    if (locked) {
      return (
        <g transform="translate(28, 28) scale(0.9)">
          {/* Subtle lock symbol engraved in metal */}
          <path
            d="M-5 -1 C-5 -5, -3 -8, 0 -8 C3 -8, 5 -5, 5 -1 L5 2 L-5 2 Z"
            fill="none"
            stroke={p.motifFill}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect
            x="-7"
            y="1"
            width="14"
            height="11"
            rx="2.5"
            fill={p.motifFill}
          />
          <circle cx="0" cy="6" r="1.5" fill="#0F172A" />
          <path d="M0 6.5 L0 9.5" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      );
    }

    switch (motif) {
      case 'sprout':
        // Seedling / First Step motif
        return (
          <g transform="translate(28, 29) scale(0.85)">
            <path
              d="M0 10 C0 2, -2 -2, -9 -2 C-9 4, -4 8, 0 10 Z"
              fill={p.motifFill}
            />
            <path
              d="M0 10 C0 0, 3 -6, 9 -7 C10 -1, 6 6, 0 10 Z"
              fill={p.motifHighlight}
              opacity="0.9"
            />
            <path
              d="M0 11 L0 4"
              stroke={p.motifFill}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        );

      case 'flame':
        // Eternal Flame / Streak motif
        return (
          <g transform="translate(28, 29) scale(0.85)">
            <path
              d="M0 10 C-6 10, -8 5, -8 0 C-8 -5, -3 -8, -1 -12 C1 -8, 8 -7, 8 0 C8 5, 6 10, 0 10 Z"
              fill={p.motifFill}
            />
            <path
              d="M0 8 C-3 8, -4 5, -4 2 C-4 -1, -1 -3, 0 -6 C1 -3, 4 -1, 4 2 C4 5, 3 8, 0 8 Z"
              fill={p.motifHighlight}
            />
          </g>
        );

      case 'star':
        // 5-Point Star / Century Club motif
        return (
          <g transform="translate(28, 29) scale(0.85)">
            <polygon
              points="0,-12 3.5,-3.5 12.5,-3.5 5,2 8,11 0,5.5 -8,11 -5,2 -12.5,-3.5 -3.5,-3.5"
              fill={p.motifFill}
            />
            <polygon
              points="0,-12 3.5,-3.5 0,0 -3.5,-3.5"
              fill={p.motifHighlight}
              opacity="0.8"
            />
          </g>
        );

      case 'book':
        // Open Book / Scholar motif
        return (
          <g transform="translate(28, 29) scale(0.85)">
            <path
              d="M-10 -7 C-6 -8, -2 -6, 0 -3 C2 -6, 6 -8, 10 -7 L10 7 C6 6, 2 8, 0 10 C-2 8, -6 6, -10 7 Z"
              fill={p.motifFill}
            />
            <path
              d="M0 -3 L0 10"
              stroke={p.motifHighlight}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M-8 -3 C-5 -4, -2 -3, 0 -1"
              stroke={p.motifHighlight}
              strokeWidth="1.2"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M8 -3 C5 -4, 2 -3, 0 -1"
              stroke={p.motifHighlight}
              strokeWidth="1.2"
              fill="none"
              opacity="0.75"
            />
          </g>
        );

      case 'compass':
        // Compass / Knowledge Seeker motif
        return (
          <g transform="translate(28, 28) scale(0.85)">
            <circle cx="0" cy="0" r="10" fill="none" stroke={p.motifFill} strokeWidth="1.8" />
            <polygon points="0,-9 3,0 0,9 -3,0" fill={p.motifFill} />
            <polygon points="0,-9 3,0 0,0" fill={p.motifHighlight} />
            <polygon points="-9,0 0,3 9,0 0,-3" fill={p.motifFill} opacity="0.6" />
            <circle cx="0" cy="0" r="2" fill={p.motifHighlight} />
          </g>
        );

      case 'shield':
        // Shield / Decathlon motif
        return (
          <g transform="translate(28, 28) scale(0.85)">
            <path
              d="M0 -11 C5 -10, 9 -8, 9 -4 C9 4, 5 9, 0 12 C-5 9, -9 4, -9 -4 C-9 -8, -5 -10, 0 -11 Z"
              fill={p.motifFill}
            />
            <path
              d="M0 -9 C3 -8, 7 -7, 7 -3 C7 3, 4 7, 0 10 Z"
              fill={p.motifHighlight}
              opacity="0.65"
            />
          </g>
        );

      case 'crown':
        // Royal Crown / Titan motif
        return (
          <g transform="translate(28, 28) scale(0.85)">
            <path
              d="M-10 8 L10 8 L11 1 L7 4 L0 -7 L-7 4 L-11 1 Z"
              fill={p.motifFill}
            />
            <circle cx="0" cy="-8.5" r="1.5" fill={p.motifHighlight} />
            <circle cx="-11" cy="-0.5" r="1.2" fill={p.motifHighlight} />
            <circle cx="11" cy="-0.5" r="1.2" fill={p.motifHighlight} />
            <rect x="-8" y="5" width="16" height="2" rx="1" fill={p.motifHighlight} opacity="0.9" />
          </g>
        );

      case 'trophy':
      default:
        // Trophy / Polymath motif
        return (
          <g transform="translate(28, 28) scale(0.85)">
            <path
              d="M-6 -10 L6 -10 L5 -1 C5 4, 3 7, 0 7 C-3 7, -5 4, -5 -1 Z"
              fill={p.motifFill}
            />
            <path
              d="M0 7 L0 10 M-4 10 L4 10"
              stroke={p.motifFill}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M-6 -7 C-9 -7, -10 -4, -10 -1 C-10 2, -7 3, -5 3"
              fill="none"
              stroke={p.motifFill}
              strokeWidth="1.6"
            />
            <path
              d="M6 -7 C9 -7, 10 -4, 10 -1 C10 2, 7 3, 5 3"
              fill="none"
              stroke={p.motifFill}
              strokeWidth="1.6"
            />
            <ellipse cx="-1.5" cy="-4" rx="2" ry="4" fill={p.motifHighlight} opacity="0.6" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      title={locked ? 'Locked Milestone' : `${tier.toUpperCase()} Medal`}
    >
      <svg
        viewBox="0 0 56 56"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-md overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Outer Beveled Rim Gradient */}
          <linearGradient id={`${idPrefix}-rim`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={p.outerRimStart} />
            <stop offset="45%" stopColor={p.innerBezelStart} />
            <stop offset="75%" stopColor={p.innerBezelEnd} />
            <stop offset="100%" stopColor={p.outerRimEnd} />
          </linearGradient>

          {/* Stepped Inner Bezel Gradient */}
          <linearGradient id={`${idPrefix}-bezel`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={p.deepShadow} />
            <stop offset="50%" stopColor={p.outerRimStart} />
            <stop offset="100%" stopColor={p.innerBezelEnd} />
          </linearGradient>

          {/* Sunken Coin Face Gradient */}
          <radialGradient
            id={`${idPrefix}-face`}
            cx="35%"
            cy="30%"
            r="70%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor={p.innerBezelStart} />
            <stop offset="40%" stopColor={p.faceGradStart} />
            <stop offset="100%" stopColor={p.faceGradEnd} />
          </radialGradient>

          {/* Specular Curved Highlight */}
          <linearGradient id={`${idPrefix}-specular`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={locked ? '0.2' : '0.7'} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Ambient Glow Filter */}
          <filter id={`${idPrefix}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="2.5"
              floodColor={p.deepShadow}
              floodOpacity={locked ? '0.35' : '0.45'}
            />
          </filter>
        </defs>

        {/* 1. Hanging Ribbon Accent (Top tab) */}
        {!locked && (
          <g>
            <path
              d="M21 0 L25 8 L17 8 Z"
              fill={p.ribbonLeft}
            />
            <path
              d="M35 0 L39 8 L31 8 Z"
              fill={p.ribbonRight}
            />
          </g>
        )}

        {/* 2. Outer Heavy Medal Coin Rim with Drop Shadow */}
        <circle
          cx="28"
          cy="28"
          r="25"
          fill={`url(#${idPrefix}-rim)`}
          filter={`url(#${idPrefix}-glow)`}
        />

        {/* 3. Milled Coin Edge Details (12 subtle perimeter notches) */}
        <circle
          cx="28"
          cy="28"
          r="23.2"
          fill="none"
          stroke={p.deepShadow}
          strokeWidth="0.8"
          opacity="0.4"
        />

        {/* 4. Raised Stepped Inner Border Ring */}
        <circle
          cx="28"
          cy="28"
          r="21.5"
          fill={`url(#${idPrefix}-bezel)`}
        />

        {/* 5. Concave/Sunken Coin Center Face */}
        <circle
          cx="28"
          cy="28"
          r="19"
          fill={`url(#${idPrefix}-face)`}
        />

        {/* 6. Decorative Beaded Inset Ring (Dotted Ring) */}
        <circle
          cx="28"
          cy="28"
          r="17"
          fill="none"
          stroke={p.deepShadow}
          strokeWidth="0.75"
          strokeDasharray="1.2 1.8"
          opacity={locked ? '0.3' : '0.55'}
        />

        {/* 7. Central Embossed Motif */}
        {renderMotifIcon()}

        {/* 8. Polished Specular Highlight Dome (Curved metallic gloss reflection) */}
        <path
          d="M12 24 C14 14, 24 10, 38 10 C44 10, 41 15, 33 18 C24 21, 16 26, 12 24 Z"
          fill={`url(#${idPrefix}-specular)`}
          pointerEvents="none"
        />

        {/* 9. Bottom Rim Reflection Accent */}
        <path
          d="M18 43 C23 45, 33 45, 38 43"
          stroke={p.outerRimStart}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
      </svg>

      {/* 10. Locked badge overlay in corner if locked */}
      {locked && (
        <div
          className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#090D16] border border-slate-700/80 flex items-center justify-center shadow-md z-10"
          aria-hidden="true"
        >
          <Lock className="w-2.5 h-2.5 text-slate-300" />
        </div>
      )}
    </div>
  );
};
