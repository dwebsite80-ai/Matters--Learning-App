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

  // Initial welcome greeting whenever modal opens (silent text greeting until user interacts)
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

  // Language change is strictly SILENT:
  // - Halts any ongoing speech immediately
  // - Does NOT speak anything
  // - Does NOT generate an AI response
  // - Does NOT push any language switch announcement message to the chat
  // The new language becomes active for the NEXT user interaction.
  useEffect(() => {
    if (prevLangRef.current !== currentLanguage) {
      stopSpeaking();
      prevLangRef.current = currentLanguage;
    }
  }, [currentLanguage, stopSpeaking]);

  // Handle when mode changes via prop or user selection
  useEffect(() => {
    if (initialMode && initialMode !== 'chat') {
      setActiveMode(initialMode);
      handleTriggerModeAction(initialMode as TiaMode);
    }
  }, [initialMode]);

  // When speech recognition produces a final transcript, automatically process it!
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
      if (voiceEnabled) {
        speakText(response.speechText || response.text);
      } else {
        setTiaState('idle');
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

    // Increment request ID to guard against out-of-order responses overwriting state
    const currentRequestId = ++activeRequestIdRef.current;

    const userMsg: TiaMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender: 'user',
      text: question,
      timestamp: Date.now(),
      isVoice,
    };

    // Calculate immediate history so AI request receives the current user message directly
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputText('');
    setIsLoading(true);
    setTiaState('thinking');

    try {
      // Check if last message was a quiz question and evaluate answer
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.quizData || activeMode === 'quiz') {
        const evalResult = await tiaService.evaluateQuizAnswer(
          question,
          lastMsg?.quizData?.question || '',
          context,
          currentLanguage
        );

        if (currentRequestId !== activeRequestIdRef.current) return;

        const tiaReply: TiaMessage = {
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

        setMessages((prev) => [...prev, tiaReply]);
        if (voiceEnabled) {
          speakText(tiaReply.speechText || tiaReply.text);
        } else {
          setTiaState('idle');
        }
        return;
      }

      // Check if in speaking practice
      if (activeMode === 'speaking_practice') {
        const speakingEval = await tiaService.evaluateSpeakingAnswer(
          question,
          context,
          currentLanguage
        );

        if (currentRequestId !== activeRequestIdRef.current) return;

        setMessages((prev) => [...prev, speakingEval]);
        if (voiceEnabled) {
          speakText(speakingEval.speechText || speakingEval.text);
        } else {
          setTiaState('idle');
        }
        return;
      }

      // Default contextual message routing with currentLanguage and conversation history
      const response = await tiaService.sendTextMessage(
        question,
        context,
        activeMode,
        currentLanguage,
        updatedHistory
      );

      // Race condition check
      if (currentRequestId !== activeRequestIdRef.current) return;

      setMessages((prev) => [...prev, response]);

      if (voiceEnabled) {
        speakText(response.speechText || response.text);
      } else {
        setTiaState('idle');
      }
    } catch (err) {
      console.error('Tia error', err);
      if (currentRequestId === activeRequestIdRef.current) {
        const isHi = currentLanguage === 'hi';
        const fallbackMsg: TiaMessage = {
          id: `tia-err-${Date.now()}`,
          sender: 'tia',
          text: isHi
            ? 'Oops, Tia ka connection thoda slow ho gaya 😅. Ek baar phir try karo.'
            : "Oops, Tia's connection hit a slight bump 😅. Please try asking again!",
          speechText: isHi
            ? 'Oops, Tia ka connection thoda slow ho gaya. Ek baar phir try karo.'
            : "Oops, Tia's connection hit a slight bump. Please try asking again!",
          timestamp: Date.now(),
          quickActions: isHi
            ? ['फिर से पूछें', '💡 यह पाठ समझाओ', '🎯 क्विज़ खेलें']
            : ['Ask again', '💡 Explain lesson', '🎯 Quiz me'],
        };
        setMessages((prev) => [...prev, fallbackMsg]);
        if (voiceEnabled) {
          speakText(fallbackMsg.speechText || fallbackMsg.text);
        } else {
          setTiaState('idle');
        }
      }
    } finally {
      if (currentRequestId === activeRequestIdRef.current) {
        setIsLoading(false);
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Container / Sheet */}
      <div className="bg-[#FDFCFB] w-full sm:max-w-2xl h-[92vh] sm:h-[86vh] rounded-t-[36px] sm:rounded-[36px] border border-black/10 shadow-2xl flex flex-col overflow-hidden animate-slideUp">
        {/* 1. Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-black/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <TiaAvatar state={tiaState} size="md" showBadge={true} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif italic font-bold text-lg text-[#1A1A1A]">
                  {isHindi ? 'टिया' : 'Tia'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FFE66D]/40 text-[#8C5E1A]">
                  {isHindi ? 'एआई ट्यूटर' : 'AI Tutor'}
                </span>
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-gray-100 text-gray-700 border border-gray-200">
                  {languageConfig.locale}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
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
            {/* Direct App Language Toggle (Single source of truth) */}
            <button
              type="button"
              onClick={() => {
                const nextLang = currentLanguage === 'hi' ? 'en' : 'hi';
                setLanguage(nextLang);
              }}
              className="px-2.5 py-1 rounded-full text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100 shadow-2xs"
              title={
                isHindi
                  ? 'Switch app & Tia to English (en-IN)'
                  : 'ऐप और टिया को हिन्दी (hi-IN) में बदलें'
              }
            >
              <Languages className="w-3.5 h-3.5 text-amber-700" />
              <span>{isHindi ? '🇮🇳 हिन्दी' : '🌐 English'}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleVoice}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                voiceEnabled
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-gray-400 border-black/10 hover:text-black'
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
              className="p-2 rounded-full border border-black/10 bg-white hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
              aria-label="Close Tia"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lesson Context Pill */}
        {context && (
          <div className="px-4 py-2 bg-[#F5F5F0] border-b border-black/5 flex items-center justify-between text-xs text-gray-600 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <BookOpen className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <span className="font-semibold text-[#1A1A1A] truncate">
                {isHindi
                  ? `${context.subjectName_hi || context.subjectName}: ${
                      context.lessonTitle_hi || context.lessonTitle
                    }`
                  : `${context.subjectName}: ${context.lessonTitle}`}
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white border border-black/5 shrink-0">
              {isHindi ? 'सक्रिय संदर्भ' : 'Context Active'}
            </span>
          </div>
        )}

        {/* 2. Mode Selector Navigation */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 bg-white border-b border-black/5 overflow-x-auto no-scrollbar shrink-0">
          {modeTabs.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleTriggerModeAction(mode.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeMode === mode.id
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-[#F5F5F0] text-gray-600 hover:bg-gray-200'
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
                className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 shadow-xs text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#1A1A1A] text-white rounded-tr-sm'
                    : 'bg-white border border-black/5 text-[#1A1A1A] rounded-tl-sm'
                }`}
              >
                {/* Voice message tag */}
                {msg.isVoice && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono mb-1.5">
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
                  <div className="mt-3 space-y-2">
                    {msg.quizData.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSendUserText(opt)}
                        className="w-full text-left p-2.5 rounded-xl border border-black/10 bg-[#FDFCFB] hover:bg-[#F5F5F0] hover:border-black/20 text-xs font-medium text-[#1A1A1A] transition-all cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Voice Replay on Tia messages */}
                {msg.sender === 'tia' && voiceEnabled && (
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/5 text-[11px] text-gray-500">
                    <button
                      onClick={() => speakText(msg.speechText || msg.text)}
                      className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer font-medium"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{isHindi ? 'टिया को सुनें (hi-IN)' : 'Listen to Tia (en-IN)'}</span>
                    </button>
                    {isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="flex items-center gap-1 text-rose-600 hover:underline cursor-pointer"
                      >
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'आवाज़ रोकें' : 'Stop Voice'}</span>
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
                      className="text-[11px] font-semibold text-gray-700 bg-white hover:bg-black hover:text-white px-3 py-1 rounded-full border border-black/10 shadow-2xs transition-all cursor-pointer"
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
              <div className="max-w-[80%] rounded-3xl p-4 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 font-bold text-[10px] text-emerald-800 uppercase tracking-widest mb-1">
                  <Mic className="w-3 h-3 text-emerald-600 animate-ping" />
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
            <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-black/5 w-fit text-xs text-gray-500 animate-fadeIn">
              <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
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
        <div className="bg-[#F5F5F0] border-t border-black/5 px-4 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white hover:bg-rose-600 animate-pulse'
                  : 'bg-[#1A1A1A] text-white hover:bg-black active:scale-95'
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
                        ? 'bg-indigo-600'
                        : 'bg-gray-300'
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
                className="text-[11px] font-semibold text-rose-600 hover:underline px-2 py-1 cursor-pointer"
              >
                {isHindi ? 'आवाज़ रोकें' : 'Stop Speech'}
              </button>
            )}
            <button
              onClick={replayLastSpeech}
              className="p-1.5 rounded-full border border-black/10 bg-white hover:bg-gray-100 text-gray-600 cursor-pointer"
              title={isHindi ? 'पिछली आवाज़ दोबारा सुनें' : 'Replay last speech'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. Bottom Text Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-black/5 space-y-2.5 shrink-0">
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
                  : 'Ask Tia anything or ask for an example...'
              }
              className="flex-1 bg-[#F5F5F0] border border-black/5 rounded-full px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black/10 font-light"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-full bg-[#1A1A1A] hover:bg-black disabled:opacity-30 text-white transition-all shadow-sm cursor-pointer shrink-0"
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
                className="px-2.5 py-1 rounded-full bg-[#F5F5F0] hover:bg-gray-200 text-gray-600 whitespace-nowrap transition-colors cursor-pointer"
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
