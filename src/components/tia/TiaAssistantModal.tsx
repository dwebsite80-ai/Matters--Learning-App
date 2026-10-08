import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Send,
  BookOpen,
  Languages,
} from 'lucide-react';
import { TiaAvatar } from './TiaAvatar';
import { TiaMarkdownRenderer } from './TiaMarkdownRenderer';
import { useTiaVoice } from '../../lib/useTiaVoice';
import { useLanguage } from '../../context/LanguageContext';
import {
  TiaLessonContext,
  TiaMessage,
  TiaMode,
} from '../../types';
import * as tiaService from '../../services/tiaService';

interface TiaAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: TiaLessonContext;
  initialMode?: TiaMode;
}

export const TiaAssistantModal: React.FC<TiaAssistantModalProps> = ({
  isOpen,
  onClose,
  context,
  initialMode = 'chat',
}) => {
  const { language, setLanguage } = useLanguage();
  const currentLanguage = language;

  const [activeMode, setActiveMode] = useState<TiaMode>(initialMode);
  const [messages, setMessages] = useState<TiaMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const prevLangRef = useRef<string>(currentLanguage);

  const {
    tiaState,
    setTiaState,
    isListening,
    isSpeaking,
    transcript,
    languageConfig,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    replayLastSpeech,
    voiceVolumeLevel,
  } = useTiaVoice(currentLanguage);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, tiaState]);

  const hasInitializedRef = useRef<boolean>(false);
  const activeRequestIdRef = useRef<number>(0);

  // Initial welcome greeting whenever modal opens
  useEffect(() => {
    if (isOpen && !hasInitializedRef.current) {
      hasInitializedRef.current = true;
      const isHindi = currentLanguage === 'hi';
      const lessonName = isHindi
        ? context?.lessonTitle_hi || context?.lessonTitle
        : context?.lessonTitle;

      const greetingText = isHindi
        ? lessonName
          ? `नमस्ते! मैं हूँ **टिया**, आपकी एआई लर्निंग गाइड। 🎙️\n\nमैं देख रही हूँ कि आप **${lessonName}** पढ़ रहे हैं। कहीं उलझन है, आसान व्याख्या चाहिए, या इसे मज़ाकिया अंदाज़ में समझना है? मुझसे कुछ भी पूछिए या माइक दबाकर बोलिए!`
          : `नमस्ते! मैं हूँ **टिया**, आपकी एआई वॉइस ट्यूटर। 🎙️\n\nमैं कठिन कॉन्सेप्ट्स को आसान, याद रखने योग्य और मज़ेदार बनाने के लिए यहाँ हूँ। आप जो भी सीखना चाहते हैं, बेझिझक बोलिए या टाइप कीजिए!`
        : lessonName
        ? `Hey! I'm **Tia**, your AI learning companion. 🎙️\n\nI see you're working on **${lessonName}**. Stuck anywhere, need a simpler explanation, or want me to make it funny? Ask me anything or tap the mic to speak!`
        : `Hey! I'm **Tia**, your AI voice tutor. 🎙️\n\nI'm here to help make complex concepts simple, memorable, and fun. Speak or type whatever you'd like to learn!`;

      const greetingSpeech = isHindi
        ? lessonName
          ? `नमस्ते! मैं हूँ टिया, आपकी एआई लर्निंग गाइड। मैं देख रही हूँ कि आप ${lessonName} पढ़ रहे हैं। कहीं उलझन है या आसान व्याख्या चाहिए, मुझसे कुछ भी पूछिए!`
          : `नमस्ते! मैं हूँ टिया, आपकी एआई वॉइस ट्यूटर। कठिन कॉन्सेप्ट्स को आसान और मज़ेदार बनाने के लिए मैं यहाँ हूँ। बेझिझक पूछिए!`
        : lessonName
        ? `Hey! I'm Tia, your AI learning companion. I see you're working on ${lessonName}. Ask me anything or tap the mic to speak!`
        : `Hey! I'm Tia, your AI voice tutor. I'm here to help make complex concepts simple and fun. Ask me anything!`;

      const greeting: TiaMessage = {
        id: 'welcome-msg',
        sender: 'tia',
        text: greetingText,
        speechText: greetingSpeech,
        mode: 'chat',
        timestamp: Date.now(),
        quickActions: isHindi
          ? [
              '💡 यह पाठ समझाइए',
              '😂 मज़ाकिया अंदाज़ में बताओ',
              '🎯 झटपट क्विज़',
              '🗣️ बोलने का अभ्यास',
            ]
          : [
              '💡 Explain This Lesson',
              '😂 Make It Funny',
              '🎯 Quick Quiz',
              '🗣️ Speaking Practice',
            ],
      };
      setMessages([greeting]);
    }
  }, [isOpen, context, currentLanguage]);

  useEffect(() => {
    if (!isOpen) {
      hasInitializedRef.current = false;
    }
  }, [isOpen]);

  // Language switch
  useEffect(() => {
    if (prevLangRef.current !== currentLanguage) {
      stopSpeaking();
      prevLangRef.current = currentLanguage;

      const isHi = currentLanguage === 'hi';
      const lessonName = isHi
        ? context?.lessonTitle_hi || context?.lessonTitle
        : context?.lessonTitle;

      const greetingText = isHi
        ? lessonName
          ? `नमस्ते! मैं हूँ **टिया**, आपकी एआई लर्निंग गाइड। 🎙️\n\nमैं देख रही हूँ कि आप **${lessonName}** पढ़ रहे हैं। कहीं उलझन है, आसान व्याख्या चाहिए, या इसे मज़ाकिया अंदाज़ में समझना है? मुझसे कुछ भी पूछिए या माइक दबाकर बोलिए!`
          : `नमस्ते! मैं हूँ **टिया**, आपकी एआई वॉइस ट्यूटर। 🎙️\n\nमैं कठिन कॉन्सेप्ट्स को आसान, याद रखने योग्य और मज़ेदार बनाने के लिए यहाँ हूँ। आप जो भी सीखना चाहते हैं, बेझिझक बोलिए या टाइप कीजिए!`
        : lessonName
        ? `Hey! I'm **Tia**, your AI learning companion. 🎙️\n\nI see you're working on **${lessonName}**. Stuck anywhere, need a simpler explanation, or want me to make it funny? Ask me anything or tap the mic to speak!`
        : `Hey! I'm **Tia**, your AI voice tutor. 🎙️\n\nI'm here to help make complex concepts simple, memorable, and fun. Speak or type whatever you'd like to learn!`;

      const greetingSpeech = isHi
        ? lessonName
          ? `नमस्ते! मैं हूँ टिया, आपकी एआई लर्निंग गाइड। मैं देख रही हूँ कि आप ${lessonName} पढ़ रहे हैं। कहीं उलझन है या आसान व्याख्या चाहिए, मुझसे कुछ भी पूछिए!`
          : `नमस्ते! मैं हूँ टिया, आपकी एआई वॉइस ट्यूटर। कठिन कॉन्सेप्ट्स को आसान और मज़ेदार बनाने के लिए मैं यहाँ हूँ। बेझिझक पूछिए!`
        : lessonName
        ? `Hey! I'm Tia, your AI learning companion. I see you're working on ${lessonName}. Ask me anything or tap the mic to speak!`
        : `Hey! I'm Tia, your AI voice tutor. I'm here to help make complex concepts simple and fun. Ask me anything!`;

      const newGreeting: TiaMessage = {
        id: 'welcome-msg',
        sender: 'tia',
        text: greetingText,
        speechText: greetingSpeech,
        mode: 'chat',
        timestamp: Date.now(),
        quickActions: isHi
          ? [
              '💡 यह पाठ समझाइए',
              '😂 मज़ाकिया अंदाज़ में बताओ',
              '🎯 झटपट क्विज़',
              '🗣️ बोलने का अभ्यास',
            ]
          : [
              '💡 Explain This Lesson',
              '😂 Make It Funny',
              '🎯 Quick Quiz',
              '🗣️ Speaking Practice',
            ],
      };

      setMessages((prev) => {
        if (prev.length <= 1) {
          return [newGreeting];
        }
        return prev.map((m) => (m.id === 'welcome-msg' ? newGreeting : m));
      });

      if (activeMode && activeMode !== 'chat' && isOpen) {
        handleTriggerModeAction(activeMode);
      }
    }
  }, [currentLanguage, context, stopSpeaking, activeMode, isOpen]);

  // Handle when mode changes via prop or user selection
  useEffect(() => {
    if (initialMode && initialMode !== 'chat') {
      setActiveMode(initialMode);
      handleTriggerModeAction(initialMode as TiaMode);
    }
  }, [initialMode]);

  // Speech recognition transcript completion
  useEffect(() => {
    if (transcript && !isListening && transcript.trim().length > 2) {
      handleSendUserText(transcript, true);
    }
  }, [isListening]);

  // Core action triggers
  const handleTriggerModeAction = async (mode: TiaMode) => {
    setActiveMode(mode);
    setIsLoading(true);
    setTiaState('thinking');

    try {
      let response: TiaMessage;

      switch (mode) {
        case 'explain':
          response = await tiaService.getLessonExplanation(context, false, currentLanguage);
          break;
        case 'funny':
          response = await tiaService.generateFunnyExplanation(context, currentLanguage);
          break;
        case 'quiz':
          response = await tiaService.generateQuizQuestion(context, currentLanguage);
          break;
        case 'speaking_practice':
          response = await tiaService.getSpeakingPracticePrompt(context, currentLanguage);
          break;
        case 'revision':
          response = await tiaService.generateRevisionQuestions(context, currentLanguage);
          break;
        default:
          response = await tiaService.sendTextMessage(
            currentLanguage === 'hi' ? 'नमस्ते टिया!' : 'Hello Tia!',
            context,
            'chat',
            currentLanguage,
            messages
          );
          break;
      }

      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
      setTiaState('idle');

      if (voiceEnabled) {
        try {
          speakText(response.speechText || response.text);
        } catch (ttsErr) {
          console.warn('[Tia Frontend] TTS error during mode trigger:', ttsErr);
        }
      }
    } catch (e) {
      console.error('Error generating Tia response:', e);
      setTiaState('idle');
    } finally {
      setIsLoading(false);
    }
  };

  // Send user message
  const handleSendUserText = async (textToSend: string, isVoice = false) => {
    const question = (textToSend || '').trim();
    if (!question || isLoading) return;

    const currentRequestId = ++activeRequestIdRef.current;

    const userMsg: TiaMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender: 'user',
      text: question,
      timestamp: Date.now(),
      isVoice,
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputText('');
    setIsLoading(true);
    setTiaState('thinking');

    let response: TiaMessage | null = null;

    try {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.quizData?.question) {
        const evalResult = await tiaService.evaluateQuizAnswer(
          question,
          lastMsg?.quizData?.question || '',
          context,
          currentLanguage
        );

        response = {
          id: `tia-eval-${Date.now()}`,
          sender: 'tia',
          text: `${evalResult.feedback}\n\n${evalResult.explanation}\n\n${
            evalResult.funnyRemark || ''
          }\n\n${evalResult.nextPrompt || ''}`,
          mode: 'quiz',
          timestamp: Date.now(),
          quickActions:
            currentLanguage === 'hi'
              ? [
                  '🎯 एक और सवाल पूछो',
                  '😂 मज़ाकिया अंदाज़ में बताओ',
                  '💡 यह पाठ समझाइए',
                  'वापस पढ़ाई पर चलें',
                ]
              : [
                  '🎯 Another Quiz Question',
                  '😂 Make it funny',
                  '💡 Explain this lesson',
                  'Back to reading',
                ],
        };
      } else if (activeMode === 'speaking_practice') {
        response = await tiaService.evaluateSpeakingAnswer(
          question,
          context,
          currentLanguage
        );
      } else {
        response = await tiaService.sendTextMessage(
          question,
          context,
          activeMode,
          currentLanguage,
          updatedHistory
        );
      }
    } catch (err) {
      console.error('[Tia Frontend] Error during AI response generation/fetch:', err);
    }

    if (currentRequestId !== activeRequestIdRef.current) return;

    if (response) {
      setMessages((prev) => [...prev, response!]);
      setIsLoading(false);
      setTiaState('idle');

      if (voiceEnabled) {
        try {
          speakText(response.speechText || response.text);
        } catch (ttsErr) {
          console.warn('[Tia Frontend] Optional TTS playback failed:', ttsErr);
          setTiaState('idle');
        }
      }
      return;
    }

    setIsLoading(false);
    setTiaState('idle');

    const isHi = currentLanguage === 'hi';
    const fallbackMsg: TiaMessage = {
      id: `tia-err-${Date.now()}`,
      sender: 'tia',
      text: isHi
        ? 'माफ़ कीजिए, टिया का कनेक्शन थोड़ा धीमा हो गया 😅। एक बार फिर पूछिए।'
        : "Oops, Tia's connection hit a slight bump 😅. Please try asking again!",
      speechText: isHi
        ? 'माफ़ कीजिए, टिया का कनेक्शन थोड़ा धीमा हो गया। एक बार फिर पूछिए।'
        : "Oops, Tia's connection hit a slight bump. Please try asking again!",
      timestamp: Date.now(),
      quickActions: isHi
        ? ['फिर से पूछें', '💡 यह पाठ समझाओ', '🎯 क्विज़ खेलें']
        : ['Ask again', '💡 Explain lesson', '🎯 Quiz me'],
    };

    setMessages((prev) => [...prev, fallbackMsg]);

    if (voiceEnabled) {
      try {
        speakText(fallbackMsg.speechText || fallbackMsg.text);
      } catch (ttsErr) {
        console.warn('[Tia Frontend] Optional TTS fallback speech failed:', ttsErr);
      }
    }
  };

  const handleToggleVoice = () => {
    if (voiceEnabled) {
      stopSpeaking();
      setVoiceEnabled(false);
    } else {
      setVoiceEnabled(true);
      const lastTia = [...messages].reverse().find((m) => m.sender === 'tia');
      if (lastTia) {
        speakText(lastTia.speechText || lastTia.text);
      }
    }
  };

  const isHindi = currentLanguage === 'hi';

  const modeTabs: { id: TiaMode; label: string }[] = isHindi
    ? [
        { id: 'chat', label: '💬 टिया से पूछें' },
        { id: 'explain', label: '💡 समझाइए' },
        { id: 'funny', label: '😂 मज़ाकिया बनाएं' },
        { id: 'quiz', label: '🎯 वॉइस क्विज़' },
        { id: 'speaking_practice', label: '🗣️ बोलना सीखें' },
        { id: 'revision', label: '🔄 पुनरीक्षण' },
      ]
    : [
        { id: 'chat', label: '💬 Ask Tia' },
        { id: 'explain', label: '💡 Explain This' },
        { id: 'funny', label: '😂 Make It Funny' },
        { id: 'quiz', label: '🎯 Voice Quiz' },
        { id: 'speaking_practice', label: '🗣️ Speaking' },
        { id: 'revision', label: '🔄 Revision' },
      ];

  const presetPills = isHindi
    ? [
        '💡 आसान भाषा में समझाओ',
        '😂 मज़ाकिया अंदाज़ में बताओ',
        '🎯 क्विज़ पूछो',
        'असली उदाहरण दो',
        '🗣️ बोलने का अभ्यास',
        'रिवीजन कराओ',
      ]
    : [
        '💡 Explain simply',
        '😂 Make it funny',
        '🎯 Quiz me',
        'Give a real-life example',
        '🗣️ Speaking drill',
        'Quick revision',
      ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Container / Sheet */}
      <div className="bg-[#FAFAF8] dark:bg-[#0E131F] w-full sm:max-w-2xl h-[92vh] sm:h-[86vh] rounded-t-[36px] sm:rounded-[36px] border border-black/10 dark:border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden animate-slideUp transition-colors">
        {/* 1. Header */}
        <div className="p-4 sm:p-5 bg-white dark:bg-[#131926] border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <TiaAvatar state={tiaState} size="md" showBadge={true} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif italic font-bold text-lg text-[#121212] dark:text-[#F8FAFC]">
                  {isHindi ? 'टिया' : 'Tia'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-mono">
                  {isHindi ? 'एआई ट्यूटर' : 'AI Tutor'}
                </span>
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/[0.04] dark:bg-white/[0.06] text-black/60 dark:text-slate-300 border border-black/[0.04] dark:border-white/[0.08]">
                  {languageConfig.locale}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-black/50 dark:text-slate-400">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isListening
                      ? 'bg-emerald-500 animate-ping'
                      : isSpeaking
                      ? 'bg-indigo-500 animate-pulse'
                      : isLoading
                      ? 'bg-amber-500 animate-spin'
                      : 'bg-emerald-400'
                  }`}
                />
                <span className="font-mono text-[11px]">
                  {isListening
                    ? isHindi
                      ? 'आपकी बात सुन रही हूँ... बेझिझक बोलिए'
                      : 'Listening to you... Speak freely'
                    : isSpeaking
                    ? isHindi
                      ? `टिया बोल रही है (${languageConfig.ttsLocale})...`
                      : `Tia is speaking (${languageConfig.ttsLocale})...`
                    : isLoading
                    ? isHindi
                      ? 'टिया सोच रही है...'
                      : 'Tia is thinking...'
                    : isHindi
                    ? `तैयार एवं सुन रही हूँ (${languageConfig.locale})`
                    : `Ready & listening (${languageConfig.locale})`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct App Language Toggle */}
            <button
              type="button"
              onClick={() => {
                const nextLang = currentLanguage === 'hi' ? 'en' : 'hi';
                setLanguage(nextLang);
              }}
              className="px-3 py-1 rounded-full text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-700/50 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50 shadow-2xs"
              title={
                isHindi
                  ? 'Switch app & Tia to English (en-IN)'
                  : 'ऐप और टिया को हिन्दी (hi-IN) में बदलें'
              }
            >
              <Languages className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>{isHindi ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleVoice}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                voiceEnabled
                  ? 'bg-[#121212] dark:bg-violet-600 text-white border-[#121212] dark:border-violet-600'
                  : 'bg-white dark:bg-[#1A2234] text-black/40 dark:text-slate-400 border-black/10 dark:border-white/10 hover:text-black dark:hover:text-white'
              }`}
              title={
                voiceEnabled
                  ? isHindi
                    ? 'आवाज़ म्यूट करें'
                    : 'Mute voice audio'
                  : isHindi
                  ? 'आवाज़ चालू करें'
                  : 'Unmute voice audio'
              }
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                onClose();
              }}
              className="p-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A2234] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] text-black/60 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close Tia"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lesson Context Banner */}
        {context && (
          <div className="px-4 py-2.5 bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs text-black/60 dark:text-slate-400 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <BookOpen className="w-3.5 h-3.5 text-black/50 dark:text-slate-400 shrink-0" />
              <span className="font-semibold text-[#121212] dark:text-[#F8FAFC] truncate">
                {isHindi
                  ? `${context.subjectName_hi || context.subjectName}: ${
                      context.lessonTitle_hi || context.lessonTitle
                    }`
                  : `${context.subjectName}: ${context.lessonTitle}`}
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white dark:bg-[#161D2E] border border-black/[0.06] dark:border-white/[0.08] shrink-0 font-bold text-black/60 dark:text-slate-300">
              {isHindi ? 'सक्रिय संदर्भ' : 'Context Active'}
            </span>
          </div>
        )}

        {/* 2. Mode Selector Navigation */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#131926] border-b border-black/[0.06] dark:border-white/[0.08] overflow-x-auto no-scrollbar shrink-0">
          {modeTabs.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleTriggerModeAction(mode.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeMode === mode.id
                  ? 'bg-[#121212] dark:bg-violet-600 text-white shadow-xs'
                  : 'bg-black/[0.03] dark:bg-white/[0.05] text-black/60 dark:text-slate-300 hover:bg-black/[0.07] dark:hover:bg-white/[0.1] hover:text-black dark:hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* 3. Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              } space-y-1.5 animate-fadeIn`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#121212] dark:bg-violet-600 text-white rounded-tr-sm shadow-sm'
                    : 'bg-white dark:bg-[#161D2E] border border-black/[0.06] dark:border-white/[0.08] text-[#121212] dark:text-[#F8FAFC] rounded-tl-sm shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_-2px_rgba(0,0,0,0.4)]'
                }`}
              >
                {/* Voice message tag */}
                {msg.isVoice && (
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono mb-1.5 font-bold">
                    <Mic className="w-3 h-3 text-emerald-400" />
                    <span>{isHindi ? 'वॉइस संदेश' : 'Voice Message'}</span>
                  </div>
                )}

                {/* Body Text */}
                {msg.sender === 'tia' ? (
                  <TiaMarkdownRenderer content={msg.text} />
                ) : (
                  <div className="whitespace-pre-wrap font-light">{msg.text}</div>
                )}

                {/* Quiz options if present */}
                {msg.quizData?.options && (
                  <div className="mt-3.5 space-y-2">
                    {msg.quizData.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSendUserText(opt)}
                        className="w-full text-left p-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-[#FAFAF8] dark:bg-[#131926] hover:bg-white dark:hover:bg-[#1A2234] hover:border-black/20 dark:hover:border-white/20 text-xs font-medium text-[#121212] dark:text-[#F8FAFC] transition-all cursor-pointer shadow-2xs"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Voice Replay on Tia messages */}
                {msg.sender === 'tia' && voiceEnabled && (
                  <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-black/[0.06] dark:border-white/[0.08] text-[11px] text-black/50 dark:text-slate-400">
                    <button
                      onClick={() => speakText(msg.speechText || msg.text)}
                      className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors cursor-pointer font-medium"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{isHindi ? 'दोबारा सुनें (hi-IN)' : 'Listen again (en-IN)'}</span>
                    </button>
                    {isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                      >
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'आवाज़ रोकें' : 'Stop'}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Action Chips attached to Tia reply */}
              {msg.sender === 'tia' && msg.quickActions && msg.quickActions.length > 0 && (
                <div className="flex items-center flex-wrap gap-1.5 pl-2 pt-1 max-w-[90%]">
                  {msg.quickActions.map((qa, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => handleSendUserText(qa)}
                      className="text-[11px] font-semibold text-black/70 dark:text-slate-300 bg-white dark:bg-[#161D2E] hover:bg-[#121212] dark:hover:bg-violet-600 hover:text-white px-3 py-1 rounded-full border border-black/[0.08] dark:border-white/[0.08] shadow-2xs transition-all cursor-pointer"
                    >
                      {qa}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Live transcript bubble while user is speaking */}
          {isListening && (
            <div className="flex flex-col items-end space-y-1 animate-fadeIn">
              <div className="max-w-[80%] rounded-3xl p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/50 text-emerald-950 dark:text-emerald-100 text-xs sm:text-sm shadow-2xs">
                <div className="flex items-center gap-1.5 font-bold text-[10px] text-emerald-800 dark:text-emerald-300 uppercase tracking-widest mb-1 font-mono">
                  <Mic className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-ping" />
                  <span>
                    {isHindi
                      ? '🎙️ लाइव वॉइस ट्रांसक्रिप्ट (hi-IN)'
                      : '🎙️ Live Voice Transcript (en-IN)'}
                  </span>
                </div>
                <p className="italic font-mono text-xs">
                  {transcript || (isHindi ? 'सुन रही हूँ... बोलिए!' : 'Listening... Speak now.')}
                </p>
              </div>
            </div>
          )}

          {/* Thinking indicator */}
          {isLoading && (
            <div className="flex items-center gap-2.5 p-3.5 bg-white dark:bg-[#161D2E] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] w-fit text-xs text-black/60 dark:text-slate-300 animate-fadeIn shadow-2xs">
              <div className="w-4 h-4 border-2 border-indigo-600 dark:border-violet-400 border-t-transparent rounded-full animate-spin" />
              <span>
                {isHindi
                  ? 'टिया सोच रही है...'
                  : 'Tia is thinking of a witty explanation...'}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 4. Active Voice Waveform & Visualizer Strip */}
        <div className="bg-[#FAFAF8] dark:bg-[#0B0F17] border-t border-black/[0.06] dark:border-white/[0.08] px-4 py-2.5 flex items-center justify-between shrink-0 transition-colors">
          <div className="flex items-center gap-3">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white hover:bg-rose-600 animate-pulse'
                  : 'bg-[#121212] dark:bg-violet-600 text-white hover:bg-black dark:hover:bg-violet-500 active:scale-95'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>{isHindi ? 'सुनना बंद करें' : 'Stop Listening'}</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-emerald-400" />
                  <span>{isHindi ? 'बोलने के लिए दबाएँ' : 'Tap to Speak'}</span>
                </>
              )}
            </button>

            {/* Animated Waveform Visualizer */}
            <div className="flex items-center gap-1 h-6">
              {[0.4, 0.8, 1.2, 0.6, 1.0, 0.5, 0.9].map((scale, i) => {
                const height =
                  isListening || isSpeaking
                    ? Math.max(4, Math.min(22, 22 * voiceVolumeLevel * scale))
                    : 4;
                return (
                  <span
                    key={i}
                    style={{ height: `${height}px` }}
                    className={`w-1 rounded-full transition-all duration-100 ${
                      isListening
                        ? 'bg-emerald-500'
                        : isSpeaking
                        ? 'bg-indigo-600 dark:bg-indigo-400'
                        : 'bg-black/15 dark:bg-white/20'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline px-2 py-1 cursor-pointer"
              >
                {isHindi ? 'आवाज़ रोकें' : 'Stop Speech'}
              </button>
            )}
            <button
              onClick={replayLastSpeech}
              className="p-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#1A2234] hover:bg-black/[0.03] dark:hover:bg-white/[0.06] text-black/60 dark:text-slate-300 cursor-pointer shadow-2xs"
              title={isHindi ? 'पिछली आवाज़ दोबारा सुनें' : 'Replay last speech'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. Bottom Text Input Bar */}
        <div className="p-3 sm:p-4 bg-white dark:bg-[#131926] border-t border-black/[0.06] dark:border-white/[0.08] space-y-2.5 shrink-0 transition-colors">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const val = inputText.trim();
              if (!val || isLoading) return;
              handleSendUserText(val);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isHindi
                  ? 'टिया से कुछ भी पूछें या उदाहरण मांगें...'
                  : 'Ask Tia anything or request an example...'
              }
              className="flex-1 bg-black/[0.03] dark:bg-[#0B0F17] border border-black/[0.06] dark:border-white/[0.08] text-[#121212] dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-slate-500 rounded-full px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-violet-500/20 font-light"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-full bg-[#121212] dark:bg-violet-600 hover:bg-black dark:hover:bg-violet-500 disabled:opacity-30 text-white transition-all shadow-sm cursor-pointer shrink-0"
              aria-label={isHindi ? 'संदेश भेजें' : 'Send message'}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick preset suggestion pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px]">
            {presetPills.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendUserText(chip)}
                className="px-2.5 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.07] dark:hover:bg-white/[0.1] text-black/70 dark:text-slate-300 whitespace-nowrap transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
