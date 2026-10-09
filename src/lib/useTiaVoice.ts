import { useState, useEffect, useRef, useCallback } from 'react';
import { AppLanguage, TiaLanguageConfig, TiaState } from '../types';
import {
  getTiaLanguageConfig,
  selectTiaVoice,
  cleanTiaSpeechText,
} from '../services/tiaLanguageConfig';

export interface UseTiaVoiceReturn {
  tiaState: TiaState;
  setTiaState: (state: TiaState) => void;
  isListening: boolean;
  isSpeaking: boolean;
  isFollowUpActive: boolean;
  followUpCountdown: number;
  transcript: string;
  isVoiceSupported: boolean;
  isSpeechSynthesisSupported: boolean;
  languageConfig: TiaLanguageConfig;
  startListening: () => void;
  startFollowUpListening: () => void;
  stopListening: () => void;
  speakText: (text: string, onEnd?: () => void) => void;
  stopSpeaking: () => void;
  replayLastSpeech: () => void;
  voiceVolumeLevel: number;
}

// Type definitions for SpeechRecognition if missing in DOM lib
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

/**
 * Natural sentence and paragraph chunker for reliable Web Speech API playback.
 * Avoids browser 15-second cutoff and audio stall bugs by breaking long text into
 * natural sentence boundaries (Hindi । or English . ! ? \n).
 */
export function splitSpeechIntoSentenceChunks(text: string): string[] {
  if (!text) return [];
  const clean = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  if (!clean) return [];

  // Matches Hindi full stop '।', regular full stop '.', exclamation '!', question '?', or newline '\n'
  const sentenceRegex = /[^।\.!\?\n]+[।\.!\?\n]*/g;
  const rawParts = clean.match(sentenceRegex);

  if (!rawParts || rawParts.length === 0) {
    return [clean];
  }

  const chunks: string[] = [];
  let currentChunk = '';

  for (const part of rawParts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // If adding this part exceeds ~160 chars and we already have content, push currentChunk
    if (currentChunk && currentChunk.length + trimmed.length > 160) {
      chunks.push(currentChunk.trim());
      currentChunk = trimmed;
    } else {
      currentChunk = currentChunk ? `${currentChunk} ${trimmed}` : trimmed;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.length > 0 ? chunks : [clean];
}

export function useTiaVoice(currentLanguage: AppLanguage = 'en'): UseTiaVoiceReturn {
  const [tiaState, setTiaState] = useState<TiaState>('idle');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isFollowUpActive, setIsFollowUpActive] = useState<boolean>(false);
  const [followUpCountdown, setFollowUpCountdown] = useState<number>(0);
  const [transcript, setTranscript] = useState<string>('');
  const [voiceVolumeLevel, setVoiceVolumeLevel] = useState<number>(0);
  const lastSpokenTextRef = useRef<string>('');

  const languageConfig = getTiaLanguageConfig(currentLanguage);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const volumeIntervalRef = useRef<any>(null);
  const currentLanguageRef = useRef<AppLanguage>(currentLanguage);

  // Follow-up listening references
  const isFollowUpModeRef = useRef<boolean>(false);
  const followUpTimeoutRef = useRef<any>(null);
  const followUpIntervalRef = useRef<any>(null);
  const speechDetectedDuringFollowUpRef = useRef<boolean>(false);

  // Speech Queue references to ensure full completion of long responses
  const speechQueueRef = useRef<string[]>([]);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isSpeechCancelledRef = useRef<boolean>(false);
  const onSpeechEndCallbackRef = useRef<(() => void) | undefined>(undefined);

  // Keep ref in sync
  currentLanguageRef.current = currentLanguage;

  const isVoiceSupported =
    typeof window !== 'undefined' &&
    Boolean(
      (window as unknown as IWindow).SpeechRecognition ||
        (window as unknown as IWindow).webkitSpeechRecognition
    );

  const isSpeechSynthesisSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Cleanup helper for follow-up timer
  const clearFollowUpTimer = useCallback(() => {
    if (followUpTimeoutRef.current) {
      clearTimeout(followUpTimeoutRef.current);
      followUpTimeoutRef.current = null;
    }
    if (followUpIntervalRef.current) {
      clearInterval(followUpIntervalRef.current);
      followUpIntervalRef.current = null;
    }
    isFollowUpModeRef.current = false;
    setIsFollowUpActive(false);
    setFollowUpCountdown(0);
  }, []);

  // Stop listening handler
  const stopListening = useCallback(() => {
    clearFollowUpTimer();
    speechDetectedDuringFollowUpRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    if (volumeIntervalRef.current) {
      clearInterval(volumeIntervalRef.current);
      volumeIntervalRef.current = null;
    }
    setVoiceVolumeLevel(0);
    setTiaState('idle');
  }, [clearFollowUpTimer]);

  // Initialize Speech Synthesis reference
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      // Ensure voices list is primed
      if (typeof synthRef.current.getVoices === 'function') {
        synthRef.current.getVoices();
        synthRef.current.onvoiceschanged = () => {
          synthRef.current?.getVoices();
        };
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
      clearFollowUpTimer();
    };
  }, [clearFollowUpTimer]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRec =
      (window as unknown as IWindow).SpeechRecognition ||
      (window as unknown as IWindow).webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
          if (isFollowUpModeRef.current) {
            setTiaState('followup_listening');
          } else {
            setTiaState('listening');
          }
          setTranscript('');

          // Start volume wave animation simulation
          if (!volumeIntervalRef.current) {
            volumeIntervalRef.current = setInterval(() => {
              setVoiceVolumeLevel(Math.random() * 0.8 + 0.2);
            }, 120);
          }
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);

          // If speech detected during follow-up, mark it and promote to full listening
          if (currentTranscript.trim().length > 0) {
            speechDetectedDuringFollowUpRef.current = true;
            if (isFollowUpModeRef.current) {
              // Cancel follow-up timer early since user is speaking
              clearFollowUpTimer();
              setTiaState('listening');
            }
          }
        };

        recognition.onerror = (err: any) => {
          console.warn('Speech recognition warning/fallback:', err);
          setIsListening(false);
          clearFollowUpTimer();
          setTiaState('idle');
          if (volumeIntervalRef.current) {
            clearInterval(volumeIntervalRef.current);
            volumeIntervalRef.current = null;
          }
          setVoiceVolumeLevel(0);
        };

        recognition.onend = () => {
          setIsListening(false);
          clearFollowUpTimer();
          if (volumeIntervalRef.current) {
            clearInterval(volumeIntervalRef.current);
            volumeIntervalRef.current = null;
          }
          setVoiceVolumeLevel(0);
        };

        recognitionRef.current = recognition;
      } catch (e) {
        console.warn('Could not initialize SpeechRecognition:', e);
      }
    }
  }, [clearFollowUpTimer]);

  // When language changes: stop current speech immediately & update recognition locale
  useEffect(() => {
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setTiaState('idle');
      if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
      setVoiceVolumeLevel(0);
    }
    clearFollowUpTimer();

    if (recognitionRef.current) {
      recognitionRef.current.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    }
  }, [currentLanguage, clearFollowUpTimer]);

  // Mock voice input fallback for sandbox or when mic permission isn't granted
  const simulateVoiceInput = useCallback((isFollowUp = false) => {
    const isHindi = currentLanguageRef.current === 'hi';
    setIsListening(true);
    setTiaState(isFollowUp ? 'followup_listening' : 'listening');
    setTranscript(
      isFollowUp
        ? isHindi
          ? 'फॉलो-अप सुन रही हूँ...'
          : 'Listening for follow-up...'
        : isHindi
        ? 'आपकी बात सुन रही हूँ... बोलिए!'
        : 'Listening to you... Speak freely.'
    );

    volumeIntervalRef.current = setInterval(() => {
      setVoiceVolumeLevel(Math.random() * 0.8 + 0.2);
    }, 120);

    setTimeout(() => {
      setTranscript(
        isHindi
          ? 'क्या आप मुझे यह पाठ आसान शब्दों में एक उदाहरण के साथ समझा सकती हैं?'
          : 'Can you explain this concept simply with a real-life example?'
      );
      if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
      setVoiceVolumeLevel(0);
      setIsListening(false);
      setTiaState('thinking');
    }, 2400);
  }, []);

  // Start listening handler (manual tap on mic)
  const startListening = useCallback(() => {
    clearFollowUpTimer();
    speechDetectedDuringFollowUpRef.current = false;

    // If speaking, stop speaking first
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = currentLanguageRef.current === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
        setTiaState('listening');
      } catch {
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            if (recognitionRef.current) {
              recognitionRef.current.lang = currentLanguageRef.current === 'hi' ? 'hi-IN' : 'en-IN';
              recognitionRef.current.start();
            }
          }, 150);
        } catch {
          simulateVoiceInput(false);
        }
      }
    } else {
      simulateVoiceInput(false);
    }
  }, [clearFollowUpTimer, simulateVoiceInput]);

  // Start follow-up listening mode (opened automatically ONLY after Tia finishes speaking)
  const startFollowUpListening = useCallback(() => {
    // If user explicitly muted or recognition isn't present, exit gracefully
    clearFollowUpTimer();
    speechDetectedDuringFollowUpRef.current = false;
    isFollowUpModeRef.current = true;
    setIsFollowUpActive(true);

    const initialDurationSec = 4;
    setFollowUpCountdown(initialDurationSec);

    // Set countdown interval (ticks every 1000ms)
    followUpIntervalRef.current = setInterval(() => {
      setFollowUpCountdown((prev) => {
        if (prev <= 1) {
          if (followUpIntervalRef.current) {
            clearInterval(followUpIntervalRef.current);
            followUpIntervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-timeout after duration: if silence, close mic & return to idle
    followUpTimeoutRef.current = setTimeout(() => {
      // If user started speaking, don't kill speech!
      if (!speechDetectedDuringFollowUpRef.current) {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch {
            // ignore
          }
        }
        setIsListening(false);
        setTiaState('idle');
        if (volumeIntervalRef.current) {
          clearInterval(volumeIntervalRef.current);
          volumeIntervalRef.current = null;
        }
        setVoiceVolumeLevel(0);
      }
      clearFollowUpTimer();
    }, initialDurationSec * 1000);

    // Turn on speech recognition for this follow-up listening window
    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = currentLanguageRef.current === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
        setTiaState('followup_listening');
      } catch {
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            if (recognitionRef.current && isFollowUpModeRef.current) {
              recognitionRef.current.lang = currentLanguageRef.current === 'hi' ? 'hi-IN' : 'en-IN';
              recognitionRef.current.start();
            }
          }, 150);
        } catch {
          // ignore in environments without recognition
        }
      }
    }
  }, [clearFollowUpTimer]);

  // Speak text with dynamic language voice matching currentLanguage (hi-IN or en-IN)
  // Uses a sentence-level speech queue so long AI answers finish completely without browser cutoffs
  const speakText = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!synthRef.current) {
        if (onEnd) onEnd();
        return;
      }

      // 1. Cancel previous speech sequence
      isSpeechCancelledRef.current = true;
      speechQueueRef.current = [];
      activeUtteranceRef.current = null;
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
        volumeIntervalRef.current = null;
      }

      try {
        synthRef.current.cancel();
      } catch {
        // ignore
      }

      // 2. Prepare clean speech audio text:
      // Preserves Devanagari, Hindi punctuation (।), English educational terms; removes emojis and markdown
      const isHindi = currentLanguageRef.current === 'hi';
      const cleanSpeech = cleanTiaSpeechText(text, isHindi);

      if (!cleanSpeech) {
        setIsSpeaking(false);
        setTiaState('idle');
        setVoiceVolumeLevel(0);
        if (onEnd) onEnd();
        return;
      }

      // 3. Split into natural sentence chunks
      const chunks = splitSpeechIntoSentenceChunks(cleanSpeech);
      if (chunks.length === 0) {
        setIsSpeaking(false);
        setTiaState('idle');
        setVoiceVolumeLevel(0);
        if (onEnd) onEnd();
        return;
      }

      lastSpokenTextRef.current = cleanSpeech;
      speechQueueRef.current = [...chunks];
      onSpeechEndCallbackRef.current = onEnd;
      isSpeechCancelledRef.current = false;

      // 4. Sequential chunk player
      const playNextChunk = () => {
        if (isSpeechCancelledRef.current || !synthRef.current) {
          return;
        }

        // All chunks finished
        if (speechQueueRef.current.length === 0) {
          setIsSpeaking(false);
          setTiaState('idle');
          if (volumeIntervalRef.current) {
            clearInterval(volumeIntervalRef.current);
            volumeIntervalRef.current = null;
          }
          setVoiceVolumeLevel(0);
          activeUtteranceRef.current = null;
          const callback = onSpeechEndCallbackRef.current;
          onSpeechEndCallbackRef.current = undefined;
          if (callback) callback();
          return;
        }

        const nextChunk = speechQueueRef.current.shift()!;
        const currentLang = currentLanguageRef.current;
        const isChunkHindi = currentLang === 'hi';
        const activeConfig = getTiaLanguageConfig(isChunkHindi ? 'hi' : 'en');

        const utterance = new SpeechSynthesisUtterance(nextChunk);
        // Persist utterance in ref to prevent Chrome garbage-collection cutoff bug
        activeUtteranceRef.current = utterance;

        utterance.lang = activeConfig.ttsLocale; // 'hi-IN' or 'en-IN'
        utterance.pitch = activeConfig.voiceSettings.pitch;
        utterance.rate = activeConfig.voiceSettings.rate;

        const voices = synthRef.current.getVoices() || [];
        const preferredVoice = selectTiaVoice(voices, isChunkHindi ? 'hi' : 'en');
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onstart = () => {
          if (isSpeechCancelledRef.current) return;
          setIsSpeaking(true);
          setTiaState('speaking');
          if (!volumeIntervalRef.current) {
            volumeIntervalRef.current = setInterval(() => {
              setVoiceVolumeLevel(Math.random() * 0.85 + 0.15);
            }, 100);
          }
        };

        utterance.onend = () => {
          if (!isSpeechCancelledRef.current) {
            playNextChunk();
          }
        };

        utterance.onerror = (err: any) => {
          if (err?.error === 'canceled' || err?.error === 'interrupted' || isSpeechCancelledRef.current) {
            return;
          }
          console.warn('[useTiaVoice] Speech chunk encountered error, advancing to next chunk:', err);
          if (!isSpeechCancelledRef.current) {
            playNextChunk();
          }
        };

        try {
          synthRef.current.speak(utterance);
        } catch (speakErr) {
          console.warn('[useTiaVoice] SpeechSynthesis.speak failed on chunk:', speakErr);
          if (!isSpeechCancelledRef.current) {
            playNextChunk();
          }
        }
      };

      playNextChunk();
    },
    []
  );

  // Stop speaking explicitly
  const stopSpeaking = useCallback(() => {
    isSpeechCancelledRef.current = true;
    speechQueueRef.current = [];
    activeUtteranceRef.current = null;
    onSpeechEndCallbackRef.current = undefined;

    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch {
        // ignore
      }
    }
    setIsSpeaking(false);
    setTiaState('idle');
    if (volumeIntervalRef.current) {
      clearInterval(volumeIntervalRef.current);
      volumeIntervalRef.current = null;
    }
    setVoiceVolumeLevel(0);
  }, []);

  // Replay last spoken speech
  const replayLastSpeech = useCallback(() => {
    if (lastSpokenTextRef.current) {
      speakText(lastSpokenTextRef.current);
    }
  }, [speakText]);

  return {
    tiaState,
    setTiaState,
    isListening,
    isSpeaking,
    isFollowUpActive,
    followUpCountdown,
    transcript,
    isVoiceSupported,
    isSpeechSynthesisSupported,
    languageConfig,
    startListening,
    startFollowUpListening,
    stopListening,
    speakText,
    stopSpeaking,
    replayLastSpeech,
    voiceVolumeLevel,
  };
}
