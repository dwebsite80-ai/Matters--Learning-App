import React, { useState } from 'react';
import {
  User,
  Mail,
  Calendar,
  Clock,
  Award,
  Sun,
  LogOut,
  Sparkles,
  Database,
  CheckCircle2,
  Save,
  Flame,
  Brain,
  Shield,
  Layers,
  Languages,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { LearningLevel, DailyMinutes, PreferredTime, SubjectId } from '../../types';

interface ProfileViewProps {
  onOpenSchemaModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenSchemaModal }) => {
  const { user, preferences, logOut, isConfiguredWithSupabase } = useAuth();
  const { stats, savePreferences, streakStatus, currentStreak: ctxStreak, longestStreak: ctxLongest } = useLearning();
  const { language, setLanguage, t } = useLanguage();

  const currentStreak = ctxStreak ?? stats?.current_streak ?? 0;
  const longestStreak = ctxLongest ?? stats?.longest_streak ?? 0;

  const [dailyMinutes, setDailyMinutes] = useState<DailyMinutes>(
    preferences?.daily_minutes || 10
  );
  const [level, setLevel] = useState<LearningLevel>(
    preferences?.level || 'Beginner'
  );
  const [preferredTime, setPreferredTime] = useState<PreferredTime>(
    preferences?.preferred_time || 'Morning'
  );
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>(
    preferences?.selected_subjects || [
      'law-rights',
      'money-finance',
      'economics',
      'bihar-gk',
      'polity-constitution',
      'history-movement',
      'personality-development',
      'dressing-sense',
      'case-studies',
      'time-management',
    ]
  );

  const [saving, setSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const toggleSubject = (subId: SubjectId) => {
    if (selectedSubjects.includes(subId)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== subId));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subId]);
    }
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      await savePreferences({
        daily_minutes: dailyMinutes,
        level,
        preferred_time: preferredTime,
        selected_subjects: selectedSubjects,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error('Error saving profile settings', e);
    } finally {
      setSaving(false);
    }
  };

  const formattedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Recently';

  const SUBJECT_OPTIONS = [
    {
      id: 'law-rights' as SubjectId,
      label_en: '⚖️ Law & Rights',
      label_hi: '⚖️ कानून एवं अधिकार',
      desc_en: 'FIR, arrest protections, cyber laws, tenancy & consumer remedies',
      desc_hi: 'एफआईआर, गिरफ्तारी के अधिकार, साइबर अपराध 1930, उपभोक्ता संरक्षण',
    },
    {
      id: 'money-finance' as SubjectId,
      label_en: '💰 Money & Finance',
      label_hi: '💰 धन और वित्त',
      desc_en: '50/30/20 budgeting, compound growth, tax slabs, credit scores & SIPs',
      desc_hi: 'बजट निर्माण, चक्रवृद्धि ब्याज, ईएमआई, क्रेडिट स्कोर व म्यूचुअल फंड एसआईपी',
    },
    {
      id: 'economics' as SubjectId,
      label_en: '📊 Economics',
      label_hi: '📊 अर्थशास्त्र',
      desc_en: 'Supply & demand, inflation, RBI repo rates, GDP & market cycles',
      desc_hi: 'मांग और आपूर्ति, मुद्रास्फीति, आरबीआई रेपो दर, जीडीपी व मंदी के प्रभाव',
    },
    {
      id: 'bihar-gk' as SubjectId,
      label_en: '🏛️ Bihar Special GK',
      label_hi: '🏛️ बिहार सामान्य ज्ञान',
      desc_en: 'History, geography, census, tourism, climate & Bihar administration',
      desc_hi: 'बिहार का इतिहास, भूगोल, 2011 जनगणना, पर्यटन, जलवायु व प्रशासनिक ढांचा',
    },
    {
      id: 'polity-constitution' as SubjectId,
      label_en: '📜 Indian Polity & Constitution',
      label_hi: '📜 भारतीय राजव्यवस्था एवं संविधान',
      desc_en: 'Preamble, Fundamental Rights, Parliament, Supreme Court & Amendments',
      desc_hi: 'प्रस्तावना, मौलिक अधिकार व कर्तव्य, संसद, सर्वोच्च न्यायालय व संशोधन',
    },
    {
      id: 'history-movement' as SubjectId,
      label_en: '🏺 Indian History & National Movement',
      label_hi: '🏺 भारतीय इतिहास एवं राष्ट्रीय आंदोलन',
      desc_en: 'Ancient India, Buddhism, 1857 Revolt, Champaran Satyagraha & 1947 Freedom',
      desc_hi: 'सिंधु सभ्यता, मौर्य व गुप्त काल, 1857 क्रांति, चंपारण सत्याग्रह व स्वतंत्रता संग्राम',
    },
    {
      id: 'personality-development' as SubjectId,
      label_en: '✨ Personality Development',
      label_hi: '✨ व्यक्तित्व विकास',
      desc_en: 'First impressions, body language, EQ, public speaking & leadership presence',
      desc_hi: 'पहला प्रभाव, शारीरिक भाषा, भावनात्मक संतुलन, मंच वक्तृत्व व नेतृत्व उपस्थिति',
    },
    {
      id: 'dressing-sense' as SubjectId,
      label_en: '👔 Dressing Sense',
      label_hi: '👔 ड्रेसिंग सेंस एवं सलीका',
      desc_en: 'Proportions, color harmony, capsule wardrobe, fabric care & smart dressing',
      desc_hi: 'शारीरिक अनुपात, रंगों का सामंजस्य, कैप्सूल वॉर्डरोब, कपड़ों की देखभाल व सलीका',
    },
    {
      id: 'case-studies' as SubjectId,
      label_en: '💡 Case Studies: Real-World Business Stories',
      label_hi: '💡 केस स्टडीज़: बिज़नेस और सफलता की कहानियां',
      desc_en: 'Airbnb, Zerodha, Amul, Canva, OYO, Dhirubhai Ambani, Spanx & Patagonia',
      desc_hi: 'Airbnb, Zerodha, Amul, Canva, OYO, धीरूभाई अंबानी, Spanx व Patagonia',
    },
    {
      id: 'time-management' as SubjectId,
      label_en: '⏱️ Time Management',
      label_hi: '⏱️ समय प्रबंधन एवं कार्यकुशलता',
      desc_en: 'Eisenhower matrix, Pomodoro, calendar blocking, saying no & GTD weekly review',
      desc_hi: 'आइजनहावर मैट्रिक्स, पोमोडोरो, टाइम-ब्लॉकिंग, ना कहने की कला व GTD वीकली रिव्यू',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      <div className="border-b border-black/5 pb-5">
        <span className="text-[10px] uppercase tracking-widest text-[#888] font-semibold block mb-1">
          {language === 'hi' ? 'खाता एवं प्राथमिकताएँ' : 'Account & Preferences'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif italic text-[#1A1A1A] tracking-tight">
          {language === 'hi' ? 'प्रोफ़ाइल एवं अध्ययन सेटिंग्स' : 'Profile & Habits'}
        </h1>
        <p className="text-xs text-gray-500 mt-1 max-w-xl font-light">
          {language === 'hi'
            ? 'अपनी अध्ययन भाषा, दैनिक सीखने का लक्ष्य और सक्रिय विषयों का प्रबंधन करें।'
            : 'Manage your language preference, daily learning goals, pacing level, and active subject pool.'}
        </p>
      </div>

      {/* User Card */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-black/5 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#1A1A1A] text-white font-serif italic font-bold text-2xl flex items-center justify-center shadow-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-serif italic text-[#1A1A1A] truncate">
              {user?.name || 'Knowledge Seeker'}
            </h2>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5 truncate font-light">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span>{user?.email || 'user@example.com'}</span>
            </p>
            <p className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>{language === 'hi' ? 'सदस्यता:' : 'Member since'} {formattedDate}</span>
            </p>
          </div>
        </div>

        {/* Mini stats row */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-black/5 text-center">
          <div className={`p-4 rounded-2xl border ${
            streakStatus === 'broken'
              ? 'bg-[#FDF2F2] border-[#F8B4B4]'
              : 'bg-[#FEF2E0] border-[#F5D7A1]'
          }`}>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${
              streakStatus === 'broken' ? 'text-[#9B1C1C]' : 'text-[#8C5E1A]'
            }`}>
              {language === 'hi' ? 'दैनिक स्ट्रीक' : 'Streak'}
            </span>
            <p className={`text-2xl font-serif italic mt-0.5 ${
              streakStatus === 'broken' ? 'text-[#9B1C1C]' : 'text-[#8C5E1A]'
            }`}>
              {streakStatus === 'broken'
                ? (language === 'hi' ? '0 दिन (टूटी)' : '0 Days (Broken)')
                : `${currentStreak} ${language === 'hi' ? 'दिन' : 'Days'}`}
            </p>
            {longestStreak > 0 && (
              <span className="text-[10px] text-gray-500 font-mono block mt-1">
                {language === 'hi' ? `सर्वश्रेष्ठ: ${longestStreak} दिन` : `Best: ${longestStreak}d`}
              </span>
            )}
          </div>
          <div className="p-4 rounded-2xl bg-[#E0F2FE] border border-[#A1D7F5]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A5E8C]">
              {language === 'hi' ? 'नॉलेज XP' : 'Knowledge'}
            </span>
            <p className="text-2xl font-serif italic text-[#1A5E8C] mt-0.5">
              {stats?.total_xp || 0} XP
            </p>
          </div>
        </div>
      </div>

      {/* Language Preference Selector */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-black/5 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center">
            <Languages className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h3 className="font-serif italic text-lg sm:text-xl text-[#1A1A1A]">
              {language === 'hi' ? 'भाषा चयन (Language Preference)' : 'Learning Language (भाषा चयन)'}
            </h3>
            <p className="text-xs text-gray-500 font-light">
              {language === 'hi'
                ? 'सभी 60 पाठ, सारांश, मुख्य बिंदु और 300 प्रश्न हिन्दी और अंग्रेजी दोनों में उपलब्ध हैं।'
                : 'All 60 lessons, case studies, takeaways, and 300 MCQs are seamlessly available in English and Hindi.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`py-3.5 px-4 rounded-2xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
              language === 'en'
                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                : 'border-black/10 hover:border-black/20 bg-white text-gray-700'
            }`}
          >
            <div>
              <p className="font-serif italic text-sm">English</p>
              <p className={`text-[10px] ${language === 'en' ? 'text-gray-300' : 'text-gray-400'}`}>
                Standard Exam & Life Guide
              </p>
            </div>
            {language === 'en' && <CheckCircle2 className="w-4 h-4 text-white" />}
          </button>

          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`py-3.5 px-4 rounded-2xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
              language === 'hi'
                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                : 'border-black/10 hover:border-black/20 bg-white text-gray-700'
            }`}
          >
            <div>
              <p className="font-serif italic text-sm">हिन्दी (Hindi)</p>
              <p className={`text-[10px] ${language === 'hi' ? 'text-gray-300' : 'text-gray-400'}`}>
                पूर्ण हिन्दी अनुवाद एवं परीक्षा सामग्री
              </p>
            </div>
            {language === 'hi' && <CheckCircle2 className="w-4 h-4 text-white" />}
          </button>
        </div>
      </div>

      {/* Learning Preferences Editor */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-black/5 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif italic text-xl text-[#1A1A1A]">
            {language === 'hi' ? 'दैनिक अध्ययन लक्ष्य एवं योजना' : 'Learning Preferences'}
          </h3>
          {savedSuccess && (
            <span className="text-xs font-medium text-emerald-800 flex items-center gap-1 bg-[#E6F4EA] px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'hi' ? 'सहेजा गया!' : 'Saved!'}
            </span>
          )}
        </div>

        {/* 1. Daily Learning Commitment */}
        <div>
          <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-2">
            {language === 'hi' ? 'दैनिक समय प्रतिबद्धता' : 'Daily Commitment'}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[10, 20].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setDailyMinutes(mins as DailyMinutes)}
                className={`py-3 px-4 rounded-2xl text-xs font-bold border transition-all ${
                  dailyMinutes === mins
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                    : 'border-black/10 hover:border-black/20 bg-white text-gray-700'
                }`}
              >
                {mins} {language === 'hi' ? 'मिनट / प्रतिदिन' : 'Minutes / day'}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Baseline Level */}
        <div>
          <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-2">
            {language === 'hi' ? 'अध्ययन स्तर' : 'Pacing Level'}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['Beginner', 'Intermediate', 'Advanced'] as LearningLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevel(lvl)}
                className={`py-3 px-3 rounded-2xl text-xs font-bold border transition-all ${
                  level === lvl
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                    : 'border-black/10 hover:border-black/20 bg-white text-gray-700'
                }`}
              >
                {lvl === 'Beginner'
                  ? language === 'hi'
                    ? 'आरंभिक'
                    : 'Beginner'
                  : lvl === 'Intermediate'
                  ? language === 'hi'
                    ? 'मध्यम'
                    : 'Intermediate'
                  : language === 'hi'
                  ? 'उन्नत'
                  : 'Advanced'}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Preferred Time */}
        <div>
          <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-2">
            {language === 'hi' ? 'पसंदीदा अध्ययन समय' : 'Preferred Learning Time'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(['Morning', 'Afternoon', 'Evening', 'Custom'] as PreferredTime[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setPreferredTime(t)}
                className={`py-3 px-3 rounded-2xl text-xs font-bold border transition-all ${
                  preferredTime === t
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                    : 'border-black/10 hover:border-black/20 bg-white text-gray-700'
                }`}
              >
                {t === 'Morning'
                  ? language === 'hi'
                    ? 'सुबह'
                    : 'Morning'
                  : t === 'Afternoon'
                  ? language === 'hi'
                    ? 'दोपहर'
                    : 'Afternoon'
                  : t === 'Evening'
                  ? language === 'hi'
                    ? 'शाम'
                    : 'Evening'
                  : language === 'hi'
                  ? 'कस्टम'
                  : 'Custom'}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Active Subjects */}
        <div>
          <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-2">
            {language === 'hi'
              ? 'दैनिक मिशन पूल में सक्रिय विषय (सभी 6 विषय उपलब्ध)'
              : 'Active Subjects In Daily Mission Pool (All 6 Available)'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SUBJECT_OPTIONS.map((s) => {
              const active = selectedSubjects.includes(s.id);
              return (
                <div
                  key={s.id}
                  onClick={() => toggleSubject(s.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between text-xs font-medium ${
                    active
                      ? 'border-[#1A1A1A] bg-[#F5F5F0] text-[#1A1A1A]'
                      : 'border-black/5 text-gray-400 bg-white hover:border-black/20'
                  }`}
                >
                  <div className="pr-2">
                    <span className="font-serif italic text-sm block font-bold text-[#1A1A1A]">
                      {language === 'hi' ? s.label_hi : s.label_en}
                    </span>
                    <p className="text-[11px] text-gray-500 mt-1 font-light leading-relaxed">
                      {language === 'hi' ? s.desc_hi : s.desc_en}
                    </p>
                  </div>
                  {active && <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />}
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSavePreferences}
          disabled={saving}
          id="save-preferences-btn"
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black transition-all shadow-md disabled:opacity-50 cursor-pointer"
        >
          {saving ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{language === 'hi' ? 'प्राथमिकताएँ सहेजें' : 'Update Preferences'}</span>
            </>
          )}
        </button>
      </div>

      {/* Supabase Schema & Database Integration Tooling */}
      <div className="bg-[#1A1A1A] text-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif italic text-lg text-white">
              {language === 'hi' ? 'स्थानीय MVP एवं स्कीमा संरचना' : 'Frontend MVP & Storage Mode'}
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            {language === 'hi' ? 'लोकल स्टोरेज सक्रिय' : 'Frontend MVP Active'}
          </span>
        </div>

        <p className="text-xs text-white/70 leading-relaxed font-light">
          {language === 'hi'
            ? 'यह संस्करण सभी 6 पाठ्यक्रमों (60 पाठ, 300 प्रश्न) के साथ पूरी तरह से फ्रंटएंड पर काम करता है। किसी डेटाबेस या सर्वर क्रेडेंशियल की आवश्यकता नहीं है।'
            : 'This version runs completely frontend-only with local storage persistence across all 6 courses (60 lessons, 300 MCQs) and bilingual English/Hindi support.'}
        </p>

        <button
          onClick={onOpenSchemaModal}
          id="view-supabase-sql-btn"
          className="w-full py-3.5 px-6 rounded-full text-xs font-bold bg-white text-[#1A1A1A] hover:bg-gray-100 transition-all uppercase tracking-widest"
        >
          {language === 'hi' ? 'डेटा संरचना एवं विवरण देखें' : 'View Data Architecture & SQL Schema'}
        </button>
      </div>

      {/* Log Out Button */}
      <div className="pt-2">
        <button
          onClick={logOut}
          id="logout-btn"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{language === 'hi' ? 'लॉग आउट' : 'Log Out of Matters'}</span>
        </button>
      </div>
    </div>
  );
};
