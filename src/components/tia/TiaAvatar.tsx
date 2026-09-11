import React from 'react';
import { Sparkles, Mic, Volume2 } from 'lucide-react';
import { TiaState } from '../../types';

interface TiaAvatarProps {
  state?: TiaState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const TiaAvatar: React.FC<TiaAvatarProps> = ({
  state = 'idle',
  size = 'md',
  showBadge = false,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-xl',
    xl: 'w-28 h-28 text-3xl',
  };

  const getRingColor = () => {
    switch (state) {
      case 'listening':
        return 'ring-4 ring-emerald-400/60 animate-pulse';
      case 'thinking':
        return 'ring-4 ring-amber-400/60 animate-spin';
      case 'speaking':
        return 'ring-4 ring-indigo-500/80 shadow-lg shadow-indigo-500/30';
      default:
        return 'ring-2 ring-amber-400/40';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full select-none ${className} ${onClick ? 'cursor-pointer active:scale-95 transition-transform' : ''}`}
    >
      {/* Outer Pulse Rings for Listening / Speaking */}
      {state === 'listening' && (
        <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
      )}
      {state === 'speaking' && (
        <span className="absolute inset-0 rounded-full bg-indigo-500/25 animate-ping opacity-75" />
      )}

      {/* Main Avatar Body */}
      <div
        className={`${sizeMap[size]} rounded-full bg-gradient-to-tr from-[#FF6B6B] via-[#FFE66D] to-[#4ECDC4] p-[3px] shadow-md transition-all duration-300 ${getRingColor()}`}
      >
        <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center overflow-hidden relative border border-white/20">
          {/* Facial features & visual character */}
          <div className="flex flex-col items-center justify-center">
            {/* Eyes */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className={`w-1.5 h-2.5 rounded-full bg-white transition-all ${
                  state === 'listening'
                    ? 'scale-y-125 bg-emerald-300'
                    : state === 'thinking'
                    ? 'animate-bounce bg-amber-300'
                    : state === 'speaking'
                    ? 'scale-110 bg-indigo-200'
                    : ''
                }`}
              />
              <span
                className={`w-1.5 h-2.5 rounded-full bg-white transition-all ${
                  state === 'listening'
                    ? 'scale-y-125 bg-emerald-300'
                    : state === 'thinking'
                    ? 'animate-bounce delay-100 bg-amber-300'
                    : state === 'speaking'
                    ? 'scale-110 bg-indigo-200'
                    : ''
                }`}
              />
            </div>

            {/* Mouth / Soundwave */}
            {state === 'speaking' ? (
              <div className="flex items-center gap-0.5 mt-0.5">
                <span className="w-0.5 h-2 bg-white animate-pulse" />
                <span className="w-0.5 h-3 bg-white animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-white animate-pulse delay-150" />
              </div>
            ) : state === 'listening' ? (
              <div className="w-3 h-1 bg-emerald-300 rounded-full animate-pulse" />
            ) : state === 'thinking' ? (
              <div className="w-2 h-2 rounded-full border-t border-amber-300 animate-spin" />
            ) : (
              /* Playful smile */
              <div className="w-3 h-1.5 border-b-2 border-white rounded-b-full" />
            )}
          </div>

          {/* Cheeks blush */}
          <span className="absolute bottom-2 left-2 w-1.5 h-1 rounded-full bg-rose-400/60" />
          <span className="absolute bottom-2 right-2 w-1.5 h-1 rounded-full bg-rose-400/60" />
        </div>
      </div>

      {/* State Badge Icon */}
      {showBadge && (
        <div
          className={`absolute -bottom-1 -right-1 p-1 rounded-full text-white text-[9px] shadow-sm border border-white ${
            state === 'listening'
              ? 'bg-emerald-500'
              : state === 'thinking'
              ? 'bg-amber-500'
              : state === 'speaking'
              ? 'bg-indigo-600'
              : 'bg-[#1A1A1A]'
          }`}
        >
          {state === 'listening' ? (
            <Mic className="w-2.5 h-2.5 animate-pulse" />
          ) : state === 'speaking' ? (
            <Volume2 className="w-2.5 h-2.5 animate-bounce" />
          ) : (
            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
          )}
        </div>
      )}
    </div>
  );
};
