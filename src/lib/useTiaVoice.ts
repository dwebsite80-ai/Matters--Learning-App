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
  errorMessage: string | null;
  clearErrorMessage: () => void;
  isVoiceSupported: boolean;
  isSpeechSynthesisSupported: boolean;
  languageConfig: TiaLanguageConfig;
  startListening: () => Promise<void>;
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

export function useTiaVoice(
  currentLanguage: AppLanguage = 'en',
  onSpeechRecognized?: (question: string) => void
): UseTiaVoiceReturn {
  const [tiaState, setTiaState] = useState<TiaState>('idle');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isFollowUpActive, setIsFollowUpActive] = useState<boolean>(false);
  const [followUpCountdown, setFollowUpCountdown] = useState<number>(0);
  const [transcript, setTranscript] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [voiceVolumeLevel, setVoiceVolumeLevel] = useState<number>(0);

  const lastSpokenTextRef = useRef<string>('');
  const languageConfig = getTiaLanguageConfig(currentLanguage);

  const recognitionInstanceRef = useRef<any>(null);
  const isRecognitionRunningRef = useRef<boolean>(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const volumeIntervalRef = useRef<any>(null);
  const currentLanguageRef = useRef<AppLanguage>(currentLanguage);
  currentLanguageRef.current = currentLanguage;

  const onSpeechRecognizedRef = useRef<((question: string) => void) | undefined>(onSpeechRecognized);
  onSpeechRecognizedRef.current = onSpeechRecognized;

  // Follow-up listening references
  const isFollowUpModeRef = useRef<boolean>(false);
  const followUpTimeoutRef = useRef<any>(null);
  const followUpIntervalRef = useRef<any>(null);
  const speechDetectedDuringFollowUpRef = useRef<boolean>(false);
  const transcriptAccumulatorRef = useRef<string>('');
  const hasSubmittedRef = useRef<boolean>(false);

  // Speech Queue references to ensure full completion of long responses
  const speechQueueRef = useRef<string[]>([]);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isSpeechCancelledRef = useRef<boolean>(false);
  const onSpeechEndCallbackRef = useRef<(() => void) | undefined>(undefined);

  const isVoiceSupported =
    typeof window !== 'undefined' &&
    Boolean(
      (window as unknown as IWindow).SpeechRecognition ||
        (window as unknown as IWindow).webkitSpeechRecognition
    );

  const isSpeechSynthesisSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const clearErrorMessage = useCallback(() => {
    setErrorMessage(null);
  }, []);

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

    if (recognitionInstanceRef.current && isRecognitionRunningRef.current) {
      try {
        recognitionInstanceRef.current.abort();
      } catch {
        // ignore
      }
      isRecognitionRunningRef.current = false;
    }

    setIsListening(false);
    if (volumeIntervalRef.current) {
      clearInterval(volumeIntervalRef.current);
      volumeIntervalRef.current = null;
    }
    setVoiceVolumeLevel(0);
    setTiaState('idle');
  }, [clearFollowUpTimer]);

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
      if (recognitionInstanceRef.current && isRecognitionRunningRef.current) {
        try {
          recognitionInstanceRef.current.abort();
        } catch {
          // ignore
        }
      }
      isRecognitionRunningRef.current = false;
      clearFollowUpTimer();
    };
  }, [clearFollowUpTimer]);

  // When language changes: stop current speech and listening immediately
  useEffect(() => {
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setTiaState('idle');
      if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
      setVoiceVolumeLevel(0);
    }
    stopListening();
  }, [currentLanguage, stopListening]);

  // Create or reuse the SpeechRecognition instance with persistent event handlers
  const getOrCreateRecognition = useCallback(() => {
    if (recognitionInstanceRef.current) {
      return recognitionInstanceRef.current;
    }

    const SpeechRec =
      typeof window !== 'undefined'
        ? (window as unknown as IWindow).SpeechRecognition ||
          (window as unknown as IWindow).webkitSpeechRecognition
        : null;

    if (!SpeechRec) {
      return null;
    }

    const rec = new SpeechRec();
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      isRecognitionRunningRef.current = true;
      console.log('[Tia Voice] Recognition started successfully');
      setIsListening(true);
      if (isFollowUpModeRef.current) {
        setTiaState('followup_listening');
      } else {
        setTiaState('listening');
      }

      if (!volumeIntervalRef.current) {
        volumeIntervalRef.current = setInterval(() => {
          setVoiceVolumeLevel(Math.random() * 0.8 + 0.2);
        }, 120);
      }
    };

    rec.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = 0; i < event.results.length; ++i) {
        const res = event.results[i];
        if (res.isFinal) {
          finalTranscript += res[0].transcript;
        } else {
          interimTranscript += res[0].transcript;
        }
      }

      const currentText = (finalTranscript || interimTranscript).trim();

      if (currentText.length > 0) {
        transcriptAccumulatorRef.current = currentText;
        setTranscript(currentText);
        console.log('[Tia Voice] Recognition result received', { text: currentText });

        // If speech detected during follow-up, cancel silence timeout and promote to active listening
        if (isFollowUpModeRef.current) {
          speechDetectedDuringFollowUpRef.current = true;
          if (followUpTimeoutRef.current) {
            clearTimeout(followUpTimeoutRef.current);
            followUpTimeoutRef.current = null;
          }
          if (followUpIntervalRef.current) {
            clearInterval(followUpIntervalRef.current);
            followUpIntervalRef.current = null;
          }
          setIsFollowUpActive(false);
          setTiaState('listening');
        }
      }
    };

    rec.onerror = (err: any) => {
      const errorType = err?.error || 'unknown';
      console.warn('[Tia Voice] Recognition error:', errorType, err);

      const isHi = currentLanguageRef.current === 'hi';
      const isIframe = typeof window !== 'undefined' && window.self !== window.top;

      switch (errorType) {
        case 'not-allowed':
          if (isIframe) {
            setErrorMessage(
              isHi
                ? 'माइक्रोफ़ोन अनुमति नहीं मिली (पूर्वावलोकन/iframe में)। कृपया अनुमति दें या इसे नए टैब में खोलें।'
                : 'Microphone permission blocked in embedded preview. Please grant permission or open in a new tab.'
            );
          } else {
            setErrorMessage(
              isHi
                ? 'माइक्रोफ़ोन अनुमति अस्वीकृत है। कृपया ब्राउज़र सेटिंग्स में माइक्रोफ़ोन की अनुमति दें।'
                : 'Microphone permission denied. Please allow microphone access in your browser settings.'
            );
          }
          break;

        case 'service-not-allowed':
          setErrorMessage(
            isHi
              ? 'स्पीच रिकॉग्निशन सेवा उपलब्ध नहीं है या ब्राउज़र द्वारा प्रतिबंधित है।'
              : 'Speech recognition service is unavailable or restricted by browser settings.'
          );
          break;

        case 'audio-capture':
          setErrorMessage(
            isHi
              ? 'माइक्रोफ़ोन नहीं मिला या किसी अन्य एप्लिकेशन द्वारा उपयोग में है।'
              : 'No microphone found or audio capture device is currently in use.'
          );
          break;

        case 'network':
          setErrorMessage(
            isHi
              ? 'वॉइस नेटवर्क कनेक्शन में त्रुटि। कृपया इंटरनेट कनेक्शन जांचें।'
              : 'Network error connecting to speech recognition service.'
          );
          break;

        case 'no-speech':
          // User was silent during active listening; normal behavior, do not show error banner
          break;

        case 'aborted':
          // Intentionally stopped or cancelled; do not show error banner
          break;

        default:
          // Do NOT misclassify unknown or generic errors as microphone permission denied
          setErrorMessage(
            isHi
              ? 'वॉइस इनपुट में समस्या आई। कृपया पुनः प्रयास करें।'
              : 'Voice input error occurred. Please try again.'
          );
          break;
      }
    };

    rec.onend = () => {
      isRecognitionRunningRef.current = false;
      console.log('[Tia Voice] Recognition ended');
      setIsListening(false);
      setIsFollowUpActive(false);
      clearFollowUpTimer();

      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
        volumeIntervalRef.current = null;
      }
      setVoiceVolumeLevel(0);

      const finalQuestion = transcriptAccumulatorRef.current.trim();
      transcriptAccumulatorRef.current = '';
      setTranscript('');

      if (finalQuestion.length > 0 && !hasSubmittedRef.current) {
        hasSubmittedRef.current = true;
        console.log('[Tia] Recognition completed', { question: finalQuestion });
        console.log('[Tia] Sending question to backend');
        setTiaState('thinking');
        if (onSpeechRecognizedRef.current) {
          onSpeechRecognizedRef.current(finalQuestion);
        }
      } else {
        setTiaState('idle');
      }
    };

    recognitionInstanceRef.current = rec;
    return rec;
  }, [clearFollowUpTimer]);

  // Start recognition session with safe state management
  const startRecognitionSession = useCallback(
    (mode: 'manual' | 'followup') => {
      console.log('[Tia Voice] Recognition start requested', { mode });

      // If speech synthesis is speaking, cancel it first
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
        setIsSpeaking(false);
      }

      // Prevent duplicate recognition sessions
      if (isRecognitionRunningRef.current && recognitionInstanceRef.current) {
        console.log('[Tia Voice] Recognition already running, resetting previous session');
        try {
          recognitionInstanceRef.current.abort();
        } catch {
          // ignore
        }
        isRecognitionRunningRef.current = false;
      }

      clearFollowUpTimer();

      // Reset state for this interaction
      isFollowUpModeRef.current = mode === 'followup';
      speechDetectedDuringFollowUpRef.current = false;
      hasSubmittedRef.current = false;
      transcriptAccumulatorRef.current = '';
      setTranscript('');
      clearErrorMessage();

      let recognition = getOrCreateRecognition();
      if (!recognition) {
        console.warn('[Tia Voice] Recognition error: SpeechRecognition not available in browser');
        const isHi = currentLanguageRef.current === 'hi';
        setErrorMessage(
          isHi
            ? 'आपके ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। कृपया Chrome या Edge का उपयोग करें।'
            : 'Voice input is not supported in your browser. Please use Chrome or Edge.'
        );
        setTiaState('idle');
        setIsListening(false);
        return;
      }

      // Configure selected language accurately (hi-IN or en-IN)
      recognition.lang = currentLanguageRef.current === 'hi' ? 'hi-IN' : 'en-IN';

      try {
        recognition.start();
      } catch (startErr: any) {
        console.warn('[Tia Voice] Recognition start error:', startErr);
        if (startErr.name === 'InvalidStateError') {
          // Session was still transitioning, abort and retry
          try {
            recognition.abort();
          } catch {}
          recognitionInstanceRef.current = null;
          recognition = getOrCreateRecognition();
          if (recognition) {
            recognition.lang = currentLanguageRef.current === 'hi' ? 'hi-IN' : 'en-IN';
            try {
              recognition.start();
            } catch (retryErr: any) {
              console.warn('[Tia Voice] Recognition error on retry:', retryErr);
              setIsListening(false);
              setTiaState('idle');
              return;
            }
          }
        } else {
          setIsListening(false);
          setTiaState('idle');
          return;
        }
      }

      if (mode === 'followup') {
        console.log('[Tia Voice] Follow-up listening started');
        setIsFollowUpActive(true);
        const initialDurationSec = 4;
        setFollowUpCountdown(initialDurationSec);

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

        // If silence for 4 seconds, close recognition and return to idle
        followUpTimeoutRef.current = setTimeout(() => {
          if (!speechDetectedDuringFollowUpRef.current) {
            console.log('[Tia Voice] Follow-up silence timeout expired, returning to idle');
            if (recognitionInstanceRef.current && isRecognitionRunningRef.current) {
              try {
                recognitionInstanceRef.current.stop();
              } catch {
                // ignore
              }
            }
            setIsListening(false);
            setIsFollowUpActive(false);
            setTiaState('idle');
            clearFollowUpTimer();
          }
        }, initialDurationSec * 1000);
      }
    },
    [clearFollowUpTimer, clearErrorMessage, getOrCreateRecognition]
  );

  // Start listening handler (manual tap on mic "बोलने के लिए दबाएँ")
  const startListening = useCallback(async () => {
    console.log('[Tia Voice] Manual microphone button clicked');
    clearErrorMessage();

    // If currently speaking, stop speech first
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }

    const SpeechRec =
      typeof window !== 'undefined'
        ? (window as unknown as IWindow).SpeechRecognition ||
          (window as unknown as IWindow).webkitSpeechRecognition
        : null;

    const isSupported = Boolean(SpeechRec);
    console.log('[Tia Voice] Speech recognition API supported:', isSupported);

    if (!isSupported) {
      const isHi = currentLanguageRef.current === 'hi';
      setErrorMessage(
        isHi
          ? 'आपके ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। कृपया Chrome या Edge का उपयोग करें।'
          : 'Voice input is not supported in your browser. Please use Chrome or Edge.'
      );
      return;
    }

    // Safely inspect permission query if supported, but do NOT treat unsupported query as error
    if (typeof navigator !== 'undefined' && navigator.permissions?.query) {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        console.log('[Tia Voice] Permission query result:', permissionStatus.state);
        if (permissionStatus.state === 'denied') {
          const isHi = currentLanguageRef.current === 'hi';
          setErrorMessage(
            isHi
              ? 'माइक्रोफ़ोन अनुमति अस्वीकृत है। कृपया ब्राउज़र सेटिंग्स में माइक्रोफ़ोन की अनुमति दें।'
              : 'Microphone permission denied. Please allow microphone access in your browser settings.'
          );
          return;
        }
      } catch (permQueryErr) {
        // Permissions query for microphone is not supported in all browsers; never block recognition
        console.log('[Tia Voice] Permission query result: unsupported/skipped', permQueryErr);
      }
    }

    // Start recognition session directly without unnecessary getUserMedia stream dependency
    startRecognitionSession('manual');
  }, [clearErrorMessage, startRecognitionSession]);

  // Start follow-up listening mode (opened automatically ONLY after Tia finishes speaking)
  const startFollowUpListening = useCallback(() => {
    const SpeechRec =
      typeof window !== 'undefined'
        ? (window as unknown as IWindow).SpeechRecognition ||
          (window as unknown as IWindow).webkitSpeechRecognition
        : null;

    if (!SpeechRec) return;
    startRecognitionSession('followup');
  }, [startRecognitionSession]);

  // Speak text with dynamic language voice matching currentLanguage (hi-IN or en-IN)
  // Uses a sentence-level speech queue so long AI answers finish completely without browser cutoffs
  const speakText = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!synthRef.current) {
        if (onEnd) onEnd();
        return;
      }

      // If recognition is active, stop it before speaking
      if (recognitionInstanceRef.current && isRecognitionRunningRef.current) {
        try {
          recognitionInstanceRef.current.abort();
        } catch {
          // ignore
        }
        isRecognitionRunningRef.current = false;
      }
      setIsListening(false);
      setIsFollowUpActive(false);
      clearFollowUpTimer();

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

      // 2. Prepare clean speech audio text
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

      console.log('[Tia] TTS started', { chunksCount: chunks.length, lang: isHindi ? 'hi-IN' : 'en-IN' });

      // 4. Sequential chunk player
      const playNextChunk = () => {
        if (isSpeechCancelledRef.current || !synthRef.current) {
          return;
        }

        // All chunks finished! Speech has completed!
        if (speechQueueRef.current.length === 0) {
          console.log('[Tia] TTS completed');
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
    [clearFollowUpTimer]
  );

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
    errorMessage,
    clearErrorMessage,
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
