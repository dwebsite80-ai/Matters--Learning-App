import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Play,
  Square,
  Sparkles,
  Languages,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Info,
  Check,
  Zap,
  Bot,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Server,
  AlertCircle,
  HelpCircle,
  Radio,
  RadioTower,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { TiaAvatar } from './TiaAvatar';
import { useLanguage } from '../../context/LanguageContext';
import {
  getStoredTiaSettings,
  saveStoredTiaSettings,
  resetStoredTiaSettings,
  TiaAppSettings,
  TiaVoiceEngine,
} from '../../services/tiaSettingsStorage';
import { selectTiaVoice } from '../../services/tiaLanguageConfig';
import { stopActiveAudioPlayback, playTiaResponseAudio, TiaTtsDiagnosticInfo } from '../../services/tiaAudioPlayer';

interface TiaSettingsViewProps {
  onBack: () => void;
}

export const TiaSettingsView: React.FC<TiaSettingsViewProps> = ({ onBack }) => {
  const { language, setLanguage } = useLanguage();
  const isHindi = language === 'hi';

  const [settings, setSettings] = useState<TiaAppSettings>(() => getStoredTiaSettings());
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [activeVoiceName, setActiveVoiceName] = useState<string>('Detecting system voice...');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Server-side provider availability status
  const [serverTtsStatus, setServerTtsStatus] = useState<any>(null);
  const [lastTestResult, setLastTestResult] = useState<TiaTtsDiagnosticInfo | null>(() => {
    try {
      const saved = sessionStorage.getItem('matters_last_tts_test');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const saveLastTest = (diag: TiaTtsDiagnosticInfo) => {
    saveLastTest(diag);
    try {
      sessionStorage.setItem('matters_last_tts_test', JSON.stringify(diag));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // Fetch live TTS status from server
    fetch('/api/tia/tts/status')
      .then((res) => res.json())
      .then((data) => {
        setServerTtsStatus(data);
      })
      .catch((err) => {
        console.warn('Could not fetch server TTS status:', err);
      });
  }, []);

  // Sync with current app language
  useEffect(() => {
    if (settings.language !== language) {
      setSettings((prev) => ({ ...prev, language: language as 'hi' | 'en' }));
    }
  }, [language]);

  // Load available system synthesis voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setActiveVoiceName('Web Speech API not supported in browser');
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      const selected = selectTiaVoice(voices, language);
      if (selected) {
        setActiveVoiceName(`${selected.name} (${selected.lang})`);
      } else {
        setActiveVoiceName(
          language === 'hi'
            ? 'Native hi-IN browser synthesis'
            : 'Native en-IN browser synthesis'
        );
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [language]);

  const updateSetting = <K extends keyof TiaAppSettings>(
    key: K,
    val: TiaAppSettings[K]
  ) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: val };
      saveStoredTiaSettings(updated);
      return updated;
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const updateVoiceSetting = (
    key: keyof TiaAppSettings['voice'],
    val: any
  ) => {
    setSettings((prev) => {
      const updated: TiaAppSettings = {
        ...prev,
        voice: {
          ...prev.voice,
          [key]: val,
        },
      };
      saveStoredTiaSettings(updated);
      return updated;
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const updatePersonalitySetting = (
    key: keyof TiaAppSettings['personality'],
    val: any
  ) => {
    setSettings((prev) => {
      const updated: TiaAppSettings = {
        ...prev,
        personality: {
          ...prev.personality,
          [key]: val,
        },
      };
      saveStoredTiaSettings(updated);
      return updated;
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Preview voice sample using real browser speech synthesis OR Cloud Audio with fallback
  const handlePreviewVoice = async () => {
    handleStopVoice();
    setPreviewError(null);
    setIsPlayingPreview(true);

    const sampleText =
      language === 'hi'
        ? settings.voice.engine === 'gemini_tts'
          ? `नमस्ते! मैं टिया हूँ, जेमिनी स्टूडियो एचडी आवाज़ ${settings.voice.geminiVoice} के साथ आपकी एआई मेंटर।`
          : 'नमस्ते! मैं टिया हूँ, आपकी दोस्ताना और समझदार एआई मेंटर।'
        : settings.voice.engine === 'gemini_tts'
          ? `Hello there! I am Tia, speaking with Gemini Studio HD voice ${settings.voice.geminiVoice}.`
          : 'Hello there! I am Tia, your friendly and witty AI learning mentor.';

    // Fallback runner using browser synthesis
    const runBrowserFallback = () => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setIsPlayingPreview(false);
        setPreviewError('Speech synthesis is not available on this device');
        return;
      }
      try {
        const utterance = new SpeechSynthesisUtterance(sampleText);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.pitch = settings.voice.pitch;
        utterance.rate = settings.voice.rate;

        const voices = window.speechSynthesis.getVoices();
        const preferred = selectTiaVoice(voices, language);
        if (preferred) {
          utterance.voice = preferred;
        }

        utterance.onstart = () => setIsPlayingPreview(true);
        utterance.onend = () => setIsPlayingPreview(false);
        utterance.onerror = (e) => {
          setIsPlayingPreview(false);
          if (e.error !== 'canceled') {
            setPreviewError(`Preview speech error: ${e.error}`);
          }
        };

        window.speechSynthesis.speak(utterance);
      } catch (err: any) {
        setIsPlayingPreview(false);
        setPreviewError(err?.message || 'Could not play voice preview');
      }
    };

    if (settings.voice.engine === 'browser') {
      saveLastTest({
        engine: 'Browser Voice',
        voiceName: language === 'hi' ? 'Female Hindi' : 'Female English',
        isFallback: false,
        status: 'success',
        timestamp: Date.now(),
      });
      runBrowserFallback();
      return;
    }

    // Try cloud audio synthesis with browser fallback
    try {
      await playTiaResponseAudio({
        text: sampleText,
        language,
        provider: settings.voice.engine,
        voiceName:
          settings.voice.engine === 'gemini_tts'
            ? settings.voice.geminiVoice
            : settings.voice.chirpVoice,
        onDiagnosticUpdate: (diag) => {
          saveLastTest(diag);
        },
        onStart: () => setIsPlayingPreview(true),
        onEnd: () => setIsPlayingPreview(false),
        onError: (err) => {
          console.warn('[Tia Preview] Cloud preview issue, falling back to browser:', err);
        },
        fallbackToBrowser: (reason) => {
          console.log('[Tia Preview] Executing browser fallback, reason:', reason);
          saveLastTest({
            engine: 'Browser Voice (Fallback)',
            voiceName: settings.voice.geminiVoice,
            isFallback: true,
            status: 'fallback',
            reason: reason || 'Cloud synthesis unavailable',
            timestamp: Date.now(),
          });
          runBrowserFallback();
        },
      });
    } catch {
      runBrowserFallback();
    }
  };

  const handleStopVoice = () => {
    stopActiveAudioPlayback();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingPreview(false);
  };

  const handleResetToDefaults = () => {
    handleStopVoice();
    const defaults = resetStoredTiaSettings();
    setSettings(defaults);
    setShowResetConfirm(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const isGeminiAvailable = serverTtsStatus?.providers?.gemini_tts?.available ?? true;
  const isChirpAvailable = serverTtsStatus?.providers?.google_cloud_chirp?.available ?? false;

  return (
    <div className="flex flex-col h-full bg-[#FAFAF8] dark:bg-[#0B0F19] text-[#121212] dark:text-[#F8FAFC] transition-colors">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-white/90 dark:bg-[#131926]/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              handleStopVoice();
              onBack();
            }}
            className="p-2 -ml-1 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title={isHindi ? 'वापस टिया चैट पर जाएं' : 'Back to Tia Chat'}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-serif italic font-bold text-[#090D16] dark:text-[#F8FAFC] flex items-center gap-2">
              <span>{isHindi ? 'टिया सेटिंग्स' : 'Tia Settings'}</span>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 font-semibold">
                Control Hub
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isHindi
                ? 'प्रीमियम वॉइस, भाषा, और बातचीत की शैली को कस्टमाइज़ करें'
                : 'Configure Studio HD voice, language, and assistant behavior'}
            </p>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isHindi ? 'सहेजा गया!' : 'Saved!'}</span>
          </div>
        )}
      </div>

      {/* Main Settings Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 max-w-2xl mx-auto w-full">
        {/* SECTION A: TIA PROFILE */}
        <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <TiaAvatar state="idle" size="lg" />
              <div
                className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#131926]"
                title="Online & Ready"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-serif italic font-bold text-[#090D16] dark:text-[#F8FAFC]">
                  Tia (टिया)
                </h2>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200">
                  AI Mentor
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                  Ready
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isHindi
                  ? 'आपकी समझदार, दोस्ताना और मज़ाकिया भारतीय एआई मेंटर—जो हर सवाल का सही, आसान और ज्ञानवर्धक जवाब देती है।'
                  : 'Your witty, sharp, and encouraging Indian AI mentor—answering any topic with humor, clarity, and everyday analogies.'}
              </p>
              <div className="mt-3 flex items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-violet-600" />
                  <span>{isHindi ? 'वर्तमान भाषा: हिंदी (hi-IN)' : 'Active: English (en-IN)'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Headphones className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {settings.voice.engine === 'gemini_tts'
                      ? `Gemini HD (${settings.voice.geminiVoice})`
                      : settings.voice.engine === 'google_cloud_chirp'
                      ? `Google Chirp 3 HD`
                      : 'Browser Voice'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION B: VOICE ENGINE & SELECTION */}
        <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                  {isHindi ? 'वॉइस इंजन प्रदाता (Voice Engine)' : 'Voice Synthesizer Provider'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isHindi
                    ? 'ब्राउज़र वॉइस, प्रीमियम स्टूडियो एचडी या गूगल क्लाउड चिर्प'
                    : 'Choose between Browser Native, Gemini Studio HD, or Cloud Chirp 3 HD'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Active Fallback Safe
            </span>
          </div>

          {/* Engine Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* 1. Browser Native Web Speech (Free & Reliable) */}
            <button
              type="button"
              onClick={() => updateVoiceSetting('engine', 'browser')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                settings.voice.engine === 'browser'
                  ? 'bg-violet-50/70 dark:bg-violet-950/50 border-violet-500 text-violet-950 dark:text-violet-100 shadow-2xs'
                  : 'bg-slate-50 dark:bg-[#1A2234] border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Browser Voice</span>
                {settings.voice.engine === 'browser' && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                )}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Free native Web Speech API. 0 latency, works offline.
              </p>
              <div className="mt-2 flex items-center justify-between text-[9px] font-mono">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">₹0 / month</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                  Reliable
                </span>
              </div>
            </button>

            {/* 2. Premium Studio HD — Gemini TTS (Aoede / Kore) */}
            <button
              type="button"
              onClick={() => {
                if (isGeminiAvailable) {
                  updateVoiceSetting('engine', 'gemini_tts');
                }
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                settings.voice.engine === 'gemini_tts'
                  ? 'bg-violet-50/70 dark:bg-violet-950/50 border-violet-500 text-violet-950 dark:text-violet-100 shadow-2xs'
                  : 'bg-slate-50 dark:bg-[#1A2234] border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Premium HD</span>
                </span>
                {settings.voice.engine === 'gemini_tts' && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                )}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Gemini Studio HD (Aoede & Kore female voices).
              </p>
              <div className="mt-2 flex items-center justify-between text-[9px] font-mono">
                <span className="text-violet-600 dark:text-violet-400">Gemini Tier</span>
                <span className="px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900/60 text-violet-800 dark:text-violet-200 font-bold">
                  Studio HD
                </span>
              </div>
            </button>

            {/* 3. Google Cloud Chirp 3 HD */}
            <button
              type="button"
              onClick={() => {
                if (isChirpAvailable) {
                  updateVoiceSetting('engine', 'google_cloud_chirp');
                }
              }}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                settings.voice.engine === 'google_cloud_chirp'
                  ? 'bg-violet-50/70 dark:bg-violet-950/50 border-violet-500 text-violet-950 dark:text-violet-100 shadow-2xs'
                  : 'bg-slate-50 dark:bg-[#1A2234] border-black/[0.06] dark:border-white/[0.08] opacity-80'
              } ${isChirpAvailable ? 'cursor-pointer hover:border-black/20' : 'cursor-not-allowed'}`}
              title={
                !isChirpAvailable
                  ? 'Google Cloud Service Account not configured on server'
                  : 'Select Google Cloud Chirp 3 HD'
              }
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Cloud Chirp 3 HD
                </span>
                {settings.voice.engine === 'google_cloud_chirp' && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-600" />
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Google Cloud Text-to-Speech high-definition voices.
              </p>
              <div className="mt-2 flex items-center justify-between text-[9px] font-mono">
                <span className="text-slate-400">GCP Chirp</span>
                <span
                  className={`px-1.5 py-0.5 rounded ${
                    isChirpAvailable
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                  }`}
                >
                  {isChirpAvailable ? 'Connected' : 'Not configured'}
                </span>
              </div>
            </button>
          </div>

          {/* Sub-Selection: Female Voice Selection for Premium HD */}
          {settings.voice.engine === 'gemini_tts' && (
            <div className="p-3.5 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/50 space-y-2.5 animate-fadeIn">
              <label className="text-xs font-bold text-violet-900 dark:text-violet-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{isHindi ? 'प्रीमियम महिला वॉइस चुनें:' : 'Select Premium Female Voice:'}</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateVoiceSetting('geminiVoice', 'Aoede')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    settings.voice.geminiVoice === 'Aoede'
                      ? 'bg-white dark:bg-[#1A2234] border-violet-500 shadow-xs text-violet-950 dark:text-violet-100 font-bold'
                      : 'bg-white/60 dark:bg-[#131926]/60 border-black/[0.06] text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Aoede (आओइडी)</span>
                    {settings.voice.geminiVoice === 'Aoede' && (
                      <Check className="w-3.5 h-3.5 text-violet-600" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Deep, expressive, engaging studio tone
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => updateVoiceSetting('geminiVoice', 'Kore')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    settings.voice.geminiVoice === 'Kore'
                      ? 'bg-white dark:bg-[#1A2234] border-violet-500 shadow-xs text-violet-950 dark:text-violet-100 font-bold'
                      : 'bg-white/60 dark:bg-[#131926]/60 border-black/[0.06] text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Kore (कोरे)</span>
                    {settings.voice.geminiVoice === 'Kore' && (
                      <Check className="w-3.5 h-3.5 text-violet-600" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Crisp, bright, warm conversational tone
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Sub-Selection: Female Voice Selection for Google Cloud Chirp */}
          {settings.voice.engine === 'google_cloud_chirp' && (
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#161D2C] border border-black/[0.06] space-y-2 animate-fadeIn">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Google Cloud Chirp 3 HD Voices:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A2234] border border-black/[0.06]">
                  <p className="font-semibold">Hindi Female</p>
                  <p className="text-[10px] text-slate-400 font-mono">hi-IN-Chirp3-HD-F</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A2234] border border-black/[0.06]">
                  <p className="font-semibold">Indian English Female</p>
                  <p className="text-[10px] text-slate-400 font-mono">en-IN-Chirp3-HD-F</p>
                </div>
              </div>
              {!isChirpAvailable && (
                <p className="text-[11px] text-amber-700 dark:text-amber-300">
                  Notice: Google Cloud Chirp requires service account credentials configured in Cloud Run. Browser voice automatically serves as free fallback.
                </p>
              )}
            </div>
          )}

          {/* Female Voice Priority Guarantee (Enforced) */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A2234] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                {isHindi ? 'महिला आवाज़ प्राथमिकता (Female Voice Selection)' : 'Female Voice Preference'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isHindi
                  ? 'प्राकृतिक महिला भारतीय आवाज़ों (Swara, Kalpana, Lekha, Aoede, Kore) को प्राथमिकता दी जाती है'
                  : 'Prioritizes female Indian voices (Swara, Kalpana, Lekha, Aoede, Kore) and penalizes male voices'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 text-xs font-mono font-bold">
              <Check className="w-3.5 h-3.5" />
              <span>Enforced</span>
            </div>
          </div>

          {/* Voice Speed (Rate) Control Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                {isHindi ? 'बोलने की गति (Speech Rate)' : 'Voice Speed (Cadence)'}
              </span>
              <span className="font-mono text-violet-700 dark:text-violet-400 font-bold">
                {settings.voice.rate.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.25"
              step="0.05"
              value={settings.voice.rate}
              onChange={(e) => updateVoiceSetting('rate', parseFloat(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.80x (Calm)</span>
              <span>1.00x (Natural)</span>
              <span>1.25x (Fast)</span>
            </div>
          </div>

          {/* Active Voice Information & Voice Preview Buttons */}
          <div className="p-3.5 rounded-xl bg-violet-50/50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {isHindi ? 'सक्रिय आवाज़ इंजन:' : 'Active Synthesizer:'}
              </span>
              <span className="font-mono text-[11px] text-violet-700 dark:text-violet-300 font-semibold truncate max-w-[220px]">
                {settings.voice.engine === 'gemini_tts'
                  ? `Gemini Studio HD (${settings.voice.geminiVoice})`
                  : settings.voice.engine === 'google_cloud_chirp'
                  ? 'Google Cloud Chirp 3 HD'
                  : activeVoiceName}
              </span>
            </div>

            {lastTestResult && (
              <div
                className={`p-2 rounded-xl text-xs flex items-center justify-between border ${
                  lastTestResult.isFallback
                    ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 text-amber-900 dark:text-amber-200'
                    : 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold">{lastTestResult.engine}</span>
                  {lastTestResult.model && (
                    <span className="font-mono text-[10px] opacity-80">({lastTestResult.model})</span>
                  )}
                </div>
                <span className="font-mono text-[10px] font-bold">
                  {lastTestResult.isFallback ? 'Fallback Triggered' : 'Real HD Audio Playing'}
                </span>
              </div>
            )}

            {previewError && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{previewError}</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handlePreviewVoice}
                disabled={isPlayingPreview}
                className="flex-1 py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>
                  {isPlayingPreview
                    ? isHindi
                      ? 'बोल रही हूँ...'
                      : 'Speaking sample...'
                    : isHindi
                    ? 'आवाज़ सुनकर देखें (Preview)'
                    : 'Test Voice Preview'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleStopVoice}
                className="py-2 px-3 rounded-xl bg-white dark:bg-[#1A2234] border border-black/10 dark:border-white/10 hover:bg-black/5 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{isHindi ? 'रोकें' : 'Stop'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION C: PERSONALITY SETTINGS */}
        <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                  {isHindi ? 'व्यक्तित्व एवं अंदाज़ (Personality & Tone)' : 'Personality & Humor Controls'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isHindi
                    ? 'हास्य (Humor), बातचीत की शैली, और देसी उदाहरण'
                    : 'Tone of voice, spontaneous wit, and everyday analogies'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Prompt Calibrated
            </span>
          </div>

          {/* Humor Level */}
          <div>
            <label className="text-xs font-semibold text-[#090D16] dark:text-[#F8FAFC] block mb-1.5">
              {isHindi ? 'हास्य एवं मज़ाकिया अंदाज़ (Humor Level)' : 'Humor & Wit Style'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'witty', label: isHindi ? 'हाज़िरजवाब (Witty)' : 'Witty & Fun', badge: isHindi ? 'अनुशंसित' : 'Default' },
                { id: 'balanced', label: isHindi ? 'संतुलित (Balanced)' : 'Balanced', badge: isHindi ? 'हल्का' : 'Mild' },
                { id: 'serious', label: isHindi ? 'गंभीर (Formal)' : 'Direct', badge: isHindi ? 'सीधा' : 'Factual' },
              ].map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => updatePersonalitySetting('humorLevel', h.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    settings.personality.humorLevel === h.id
                      ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-100 font-bold shadow-2xs'
                      : 'bg-slate-50 dark:bg-[#1A2234] border-black/[0.04] dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <p className="text-xs">{h.label}</p>
                  <span className="text-[9px] font-mono text-slate-400 block mt-0.5">{h.badge}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Relatable Desi Analogies Toggle */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A2234] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
            <div className="pr-4">
              <p className="text-xs font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                {isHindi ? 'रोज़मर्रा के भारतीय उदाहरण (Everyday Analogies)' : 'Relatable Indian Analogies'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isHindi
                  ? 'चाय की चर्चा, क्रिकेट, कॉलेज और ट्रैफिक जैसे वास्तविक जीवन के उदाहरण'
                  : 'Chai discussions, cricket moments, college banter, and everyday life'}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                updatePersonalitySetting(
                  'useEverydayAnalogies',
                  !settings.personality.useEverydayAnalogies
                )
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.personality.useEverydayAnalogies
                  ? 'bg-amber-500'
                  : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-xs absolute top-0.5 ${
                  settings.personality.useEverydayAnalogies
                    ? 'translate-x-5.5'
                    : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Explanation Depth Setting */}
          <div>
            <label className="text-xs font-semibold text-[#090D16] dark:text-[#F8FAFC] block mb-1.5">
              {isHindi ? 'जवाब की गहराई (Explanation Depth)' : 'Response Depth & Reasoning'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'concise', label: isHindi ? 'संक्षिप्त (Concise)' : 'Short & Crisp' },
                { id: 'balanced', label: isHindi ? 'संतुलित (Balanced)' : '2–3 Paragraphs' },
                { id: 'detailed', label: isHindi ? 'विस्तृत (Detailed)' : 'Deep Dive' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => updatePersonalitySetting('depth', d.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    settings.personality.depth === d.id
                      ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-100 font-bold shadow-2xs'
                      : 'bg-slate-50 dark:bg-[#1A2234] border-black/[0.04] dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <p className="text-xs">{d.label}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION D: LANGUAGE SETTINGS */}
        <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Languages className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                  {isHindi ? 'भाषा चयन (Language Settings)' : 'Language Configuration'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isHindi
                    ? 'टिया चैट और वॉइस दोनों की प्राथमिक भाषा'
                    : 'Primary language for both Tia text answers and spoken audio'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Bi-directional
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Hindi Card */}
            <button
              type="button"
              onClick={() => {
                setLanguage('hi');
                updateSetting('language', 'hi');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-blue-50/70 dark:bg-blue-950/50 border-blue-500 text-blue-950 dark:text-blue-100 shadow-2xs'
                  : 'bg-slate-50 dark:bg-[#1A2234] border-black/[0.06] dark:border-white/[0.08] text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">हिन्दी (Hindi)</span>
                {language === 'hi' && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                देवनागरी लिपि में स्वाभाविक वॉइस व बातचीत
              </p>
              <span className="inline-block mt-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                hi-IN Locale
              </span>
            </button>

            {/* English Card */}
            <button
              type="button"
              onClick={() => {
                setLanguage('en');
                updateSetting('language', 'en');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-blue-50/70 dark:bg-blue-950/50 border-blue-500 text-blue-950 dark:text-blue-100 shadow-2xs'
                  : 'bg-slate-50 dark:bg-[#1A2234] border-black/[0.06] dark:border-white/[0.08] text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">English (Indian)</span>
                {language === 'en' && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Fluent, witty Indian English cadence
              </p>
              <span className="inline-block mt-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                en-IN Locale
              </span>
            </button>
          </div>
        </section>

        {/* SECTION E: ASSISTANT BEHAVIOR */}
        <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                  {isHindi ? 'असिस्टेंट व्यवहार (Assistant Behavior)' : 'Assistant Behavior Controls'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isHindi
                    ? 'स्वचालित वॉइस उत्तर एवं फॉलो-अप लिसनिंग'
                    : 'Auto-speech output and continuous conversation options'}
                </p>
              </div>
            </div>
          </div>

          {/* Auto-Speak Response */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A2234] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
            <div className="pr-4">
              <p className="text-xs font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                {isHindi ? 'उत्तर आने पर बोलकर सुनाएं (Auto-Speak)' : 'Read Answers Aloud Automatically'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isHindi
                  ? 'टिया के उत्तर आते ही टेक्स्ट-टू-स्पीच अपने आप शुरू हो जाएगा'
                  : 'Automatically play synthesized speech when Tia answers a message'}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                updateVoiceSetting(
                  'autoSpeakResponse',
                  !settings.voice.autoSpeakResponse
                )
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.voice.autoSpeakResponse
                  ? 'bg-emerald-500'
                  : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-xs absolute top-0.5 ${
                  settings.voice.autoSpeakResponse
                    ? 'translate-x-5.5'
                    : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Follow-up Listening (4-second window) */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A2234] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
            <div className="pr-4">
              <p className="text-xs font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                {isHindi ? 'फॉलो-अप लिसनिंग (Follow-up Listening)' : 'Follow-up Listening Window (4s)'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isHindi
                  ? 'टिया के बोलने के बाद 4 सेकंड तक माइक खुला रहता है ताकि आप बिना बटन दबाए बातचीत जारी रख सकें'
                  : 'After Tia speaks, the mic listens for 4 seconds so you can talk without repressing the mic'}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                updateVoiceSetting(
                  'enableFollowUpListening',
                  !settings.voice.enableFollowUpListening
                )
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.voice.enableFollowUpListening
                  ? 'bg-emerald-500'
                  : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-xs absolute top-0.5 ${
                  settings.voice.enableFollowUpListening
                    ? 'translate-x-5.5'
                    : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </section>

        {/* SECTION F: ADVANCED / TECHNICAL INFO (COLLAPSIBLE) */}
        <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-3">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                {isHindi ? 'उन्नत एवं तकनीकी विवरण (Advanced Info)' : 'Advanced Technical Architecture & Pricing'}
              </span>
            </div>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showAdvanced && (
            <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-black/[0.02] dark:border-white/[0.02]">
                <span className="text-slate-500">Active TTS Engine:</span>
                <span className="text-violet-700 dark:text-violet-300 font-bold">
                  {settings.voice.engine === 'gemini_tts'
                    ? 'Gemini Studio HD (Neural)'
                    : settings.voice.engine === 'google_cloud_chirp'
                    ? 'Google Cloud Chirp 3 HD'
                    : 'Browser Web Speech API'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.02] dark:border-white/[0.02]">
                <span className="text-slate-500">Estimated Cost Footprint:</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-bold">
                  {settings.voice.engine === 'browser'
                    ? '₹0 / month (Free tier)'
                    : '₹50 - ₹180 / month (well within ₹300-₹700 budget)'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.02] dark:border-white/[0.02]">
                <span className="text-slate-500">Auto-Fallback Protection:</span>
                <span className="text-emerald-600 font-bold">
                  Enabled (Instant Browser Voice Fallback)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.02] dark:border-white/[0.02]">
                <span className="text-slate-500">Backend TTS Status Route:</span>
                <span className="text-slate-800 dark:text-slate-200">
                  /api/tia/tts/status
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.02] dark:border-white/[0.02]">
                <span className="text-slate-500">Backend Audio Synthesizer:</span>
                <span className="text-slate-800 dark:text-slate-200">
                  /api/tia/tts/synthesize
                </span>
              </div>

              <div className="mt-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-900 dark:text-amber-200 font-sans flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  {isHindi
                    ? 'सुरक्षा नोट: कोई भी एपीआई की या क्रेडेंशियल्स ब्राउज़र पर प्रदर्शित नहीं किए जाते हैं। सभी जेमिनी कॉल्स सर्वर साइड सुरक्षित रूप से प्रोसेस होते हैं।'
                    : 'Security Notice: API keys and credentials are never exposed to the client. All inferences are proxied server-side.'}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* SECTION G: RESET TO DEFAULTS */}
        <div className="pt-2 text-center">
          {showResetConfirm ? (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 space-y-3">
              <p className="text-xs font-semibold text-rose-900 dark:text-rose-200">
                {isHindi
                  ? 'क्या आप वाकई टिया की सभी सेटिंग्स को डिफ़ॉल्ट पर रीसेट करना चाहते हैं?'
                  : 'Are you sure you want to reset all Tia settings to defaults?'}
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {isHindi ? 'हाँ, रीसेट करें' : 'Yes, Reset'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-1.5 rounded-xl bg-white dark:bg-[#1A2234] border border-black/10 dark:border-white/10 text-xs font-semibold hover:bg-black/5 transition-colors cursor-pointer"
                >
                  {isHindi ? 'रद्द करें' : 'Cancel'}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 font-medium py-1 px-3 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isHindi ? 'डिफ़ॉल्ट सेटिंग्स पर रीसेट करें' : 'Reset Tia to Default Settings'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
