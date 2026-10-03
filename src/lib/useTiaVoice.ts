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
  transcript: string;
  isVoiceSupported: boolean;
  isSpeechSynthesisSupported: boolean;
  languageConfig: TiaLanguageConfig;
  startListening: () => void;
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
  const [transcript, setTranscript] = useState<string>('');
  const [voiceVolumeLevel, setVoiceVolumeLevel] = useState<number>(0);
  const lastSpokenTextRef = useRef<string>('');

  const languageConfig = getTiaLanguageConfig(currentLanguage);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const volumeIntervalRef = useRef<any>(null);
  const currentLanguageRef = useRef<AppLanguage>(currentLanguage);

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
    };
  }, []);

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
          setTiaState('listening');
          setTranscript('');

          // Start volume wave animation simulation
          volumeIntervalRef.current = setInterval(() => {
            setVoiceVolumeLevel(Math.random() * 0.8 + 0.2);
          }, 120);
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognition.onerror = (err: any) => {
          console.warn('Speech recognition warning/fallback:', err);
          setIsListening(false);
          setTiaState('idle');
          if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
          setVoiceVolumeLevel(0);
        };

        recognition.onend = () => {
          setIsListening(false);
          if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
          setVoiceVolumeLevel(0);
        };

        recognitionRef.current = recognition;
      } catch (e) {
        console.warn('Could not initialize SpeechRecognition:', e);
      }
    }
  }, []);

  // When language changes: stop current speech immediately & update recognition locale
  useEffect(() => {
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setTiaState('idle');
      if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
      setVoiceVolumeLevel(0);
    }

    if (recognitionRef.current) {
      recognitionRef.current.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    }
  }, [currentLanguage]);

  // Mock voice input fallback for sandbox or when mic permission isn't granted
  const simulateVoiceInput = useCallback(() => {
    const isHindi = currentLanguageRef.current === 'hi';
    setIsListening(true);
    setTiaState('listening');
    setTranscript(isHindi ? 'आपकी बात सुन रही हूँ... बोलिए!' : 'Listening to you... Speak freely.');

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

  // Start listening handler
  const startListening = useCallback(() => {
    // If speaking, stop speaking first
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }

    if (recognitionRef.current) {
      try {
        // Dynamically ensure recognition uses selected language
        recognitionRef.current.lang = currentLanguageRef.current === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
        setTiaState('listening');
      } catch {
        // Recognition already started or error -> restart
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            if (recognitionRef.current) {
              recognitionRef.current.lang = currentLanguageRef.current === 'hi' ? 'hi-IN' : 'en-IN';
              recognitionRef.current.start();
            }
          }, 150);
        } catch {
          // fallback simulation
          simulateVoiceInput();
        }
      }
    } else {
      simulateVoiceInput();
    }
  }, [simulateVoiceInput]);

  // Stop listening handler
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
    setVoiceVolumeLevel(0);
    setTiaState('idle');
  }, []);

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
    transcript,
    isVoiceSupported,
    isSpeechSynthesisSupported,
    languageConfig,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    replayLastSpeech,
    voiceVolumeLevel,
  };
}
