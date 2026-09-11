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
  const speakText = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!synthRef.current) {
        if (onEnd) onEnd();
        return;
      }

      // Cancel current speech
      synthRef.current.cancel();

      // Prepare clean speech audio text:
      // Preserves Devanagari, Hindi punctuation (।), English educational terms; removes emojis and markdown
      const isHindi = currentLanguageRef.current === 'hi';
      const cleanSpeech = cleanTiaSpeechText(text, isHindi);

      if (!cleanSpeech) {
        if (onEnd) onEnd();
        return;
      }

      const activeConfig = getTiaLanguageConfig(isHindi ? 'hi' : 'en');
      lastSpokenTextRef.current = cleanSpeech;
      const utterance = new SpeechSynthesisUtterance(cleanSpeech);

      // Set speech parameters from centralized configuration
      utterance.lang = activeConfig.ttsLocale; // 'hi-IN' or 'en-IN'
      utterance.pitch = activeConfig.voiceSettings.pitch; // 1.10 for Hindi female, 1.08 for English
      utterance.rate = activeConfig.voiceSettings.rate; // 0.95 for Hindi (clear phonemes), 1.02 for English

      // Select voice using centralized selector
      const voices = synthRef.current.getVoices() || [];
      const preferredVoice = selectTiaVoice(voices, isHindi ? 'hi' : 'en');

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setTiaState('speaking');
        // Visualizer wave effect
        volumeIntervalRef.current = setInterval(() => {
          setVoiceVolumeLevel(Math.random() * 0.9 + 0.1);
        }, 100);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setTiaState('idle');
        if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
        setVoiceVolumeLevel(0);
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setTiaState('idle');
        if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
        setVoiceVolumeLevel(0);
        if (onEnd) onEnd();
      };

      synthRef.current.speak(utterance);
    },
    []
  );

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
    setTiaState('idle');
    if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
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
