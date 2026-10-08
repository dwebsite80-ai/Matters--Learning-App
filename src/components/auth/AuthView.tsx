import React, { useState, useRef } from 'react';
import { Sparkles, Lock, User, AtSign, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isValidUsername, normalizeUsername } from '../../lib/supabase';

interface AuthViewProps {
  onSuccessSignup?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccessSignup }) => {
  const { logIn, signUp, loginAsDemo, isConfiguredWithSupabase } = useAuth();
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inFlightRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inFlightRef.current || isSubmitting) {
      console.warn('[Auth Frontend] Submission ignored: another request is already in-flight.');
      return;
    }

    setErrorMsg(null);
    setInfoMsg(null);

    const cleanUsername = normalizeUsername(username);

    if (!cleanUsername) {
      setErrorMsg('Username me sirf letters, numbers aur underscore use karo.');
      return;
    }

    if (!isValidUsername(cleanUsername)) {
      setErrorMsg('Username me sirf letters, numbers aur underscore use karo.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password thoda strong rakho.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    inFlightRef.current = true;
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        console.log('[Auth Frontend] Calling signUp with:', { name: name.trim(), username: cleanUsername });
        await signUp(name.trim(), cleanUsername, password);
        if (onSuccessSignup) onSuccessSignup();
      } else {
        console.log('[Auth Frontend] Calling logIn with:', { username: cleanUsername });
        await logIn(cleanUsername, password);
      }
    } catch (err: unknown) {
      const anyErr = err as any;
      const status = anyErr?.status || anyErr?.code;
      const rawMsg = anyErr?.message || '';
      const msgLower = rawMsg.toLowerCase();

      if (
        status === 429 ||
        msgLower.includes('too many') ||
        msgLower.includes('rate limit') ||
        msgLower.includes('security purposes') ||
        msgLower.includes('over_email_send_rate_limit')
      ) {
        setErrorMsg('Abhi bahut attempts ho gaye hain 😅. Thodi der baad dobara try karo.');
      } else if (
        msgLower.includes('already taken') ||
        msgLower.includes('already registered') ||
        msgLower.includes('already exists') ||
        msgLower.includes('user already')
      ) {
        setErrorMsg('Ye username already taken hai.');
      } else if (
        msgLower.includes('galat') ||
        msgLower.includes('invalid') ||
        msgLower.includes('credentials') ||
        msgLower.includes('not found') ||
        msgLower.includes('incorrect')
      ) {
        setErrorMsg('Username ya password galat hai.');
      } else if (msgLower.includes('strong') || msgLower.includes('weak') || msgLower.includes('password')) {
        setErrorMsg('Password thoda strong rakho.');
      } else if (msgLower.includes('underscore') || msgLower.includes('letters')) {
        setErrorMsg('Username me sirf letters, numbers aur underscore use karo.');
      } else if (rawMsg) {
        setErrorMsg(rawMsg);
      } else {
        setErrorMsg('Oops, kuch technical problem aa gayi. Dobara try karo.');
      }
    } finally {
      inFlightRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await loginAsDemo();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Oops, kuch technical problem aa gayi. Dobara try karo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-center py-12 px-4 sm:px-6 animate-fadeIn">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Icon & Heading */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-[#121212] flex items-center justify-center text-white shadow-sm">
            <span className="font-serif italic font-bold text-2xl">M</span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-serif italic text-[#121212] tracking-tight font-medium">
            Matters
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-black/60 font-light max-w-xs mx-auto leading-relaxed">
            “Learn what actually matters — 10–20 minutes a day.”
          </p>
        </div>

        {/* Feature Badges */}
        <div className="mt-5 flex items-center justify-center gap-2.5 text-[11px] text-black/60 dark:text-slate-400 font-light">
          <span className="flex items-center gap-1.5 bg-white dark:bg-[#131926] px-3 py-1 rounded-full border border-black/[0.06] dark:border-white/[0.08] shadow-2xs font-medium text-[#121212] dark:text-[#F8FAFC]">
            <ShieldCheck className="w-3.5 h-3.5 text-black dark:text-white" /> Practical Competence
          </span>
          <span className="flex items-center gap-1.5 bg-white dark:bg-[#131926] px-3 py-1 rounded-full border border-black/[0.06] dark:border-white/[0.08] shadow-2xs font-medium text-[#121212] dark:text-[#F8FAFC]">
            <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white" /> Daily Microlearning
          </span>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#131926] py-8 px-6 sm:px-8 border border-black/[0.06] dark:border-white/[0.08] rounded-[32px] sm:rounded-[36px] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] transition-colors">
          {/* Mode Switcher Tabs */}
          <div className="flex bg-black/[0.03] dark:bg-white/[0.05] p-1 rounded-full border border-black/[0.04] dark:border-white/[0.08] mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg(null);
                setInfoMsg(null);
              }}
              className={`flex-1 py-2 text-xs uppercase tracking-wider font-bold text-center rounded-full transition-all duration-200 cursor-pointer ${
                mode === 'signup'
                  ? 'bg-[#121212] dark:bg-violet-600 text-white shadow-xs'
                  : 'text-black/50 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
                setInfoMsg(null);
              }}
              className={`flex-1 py-2 text-xs uppercase tracking-wider font-bold text-center rounded-full transition-all duration-200 cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#121212] dark:bg-violet-600 text-white shadow-xs'
                  : 'text-black/50 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Log In
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/50 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2 shadow-2xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-700 dark:text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-700/50 text-emerald-950 dark:text-emerald-100 text-xs flex items-start gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-700 dark:text-emerald-400" />
              <span>{infoMsg}</span>
            </div>
          )}

          {/* Authentication Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] font-bold text-black/50 dark:text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Anurag Sharma"
                    autoComplete="name"
                    className="block w-full pl-10 pr-4 py-3 border border-black/[0.08] dark:border-white/[0.1] rounded-2xl text-xs placeholder-black/35 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-violet-500/20 focus:border-black/20 dark:focus:border-violet-500/40 bg-[#FAFAF8] dark:bg-[#0E131F] text-[#121212] dark:text-[#F8FAFC] transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Username (Both Sign Up and Log In) */}
            <div>
              <label className="block text-[10px] font-bold text-black/50 dark:text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-slate-500">
                  <AtSign className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="anurag123"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="username"
                  className="block w-full pl-10 pr-4 py-3 border border-black/[0.08] dark:border-white/[0.1] rounded-2xl text-xs placeholder-black/35 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-violet-500/20 focus:border-black/20 dark:focus:border-violet-500/40 bg-[#FAFAF8] dark:bg-[#0E131F] text-[#121212] dark:text-[#F8FAFC] font-mono transition-colors"
                />
              </div>
            </div>

            {/* Password (Both Sign Up and Log In) */}
            <div>
              <label className="block text-[10px] font-bold text-black/50 dark:text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  className="block w-full pl-10 pr-4 py-3 border border-black/[0.08] dark:border-white/[0.1] rounded-2xl text-xs placeholder-black/35 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-violet-500/20 focus:border-black/20 dark:focus:border-violet-500/40 bg-[#FAFAF8] dark:bg-[#0E131F] text-[#121212] dark:text-[#F8FAFC] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="auth-submit-btn"
              className={`w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-[#121212] dark:bg-violet-600 hover:bg-black dark:hover:bg-violet-500 transition-all shadow-md ${
                isSubmitting ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>
                    {mode === 'signup' ? 'Sign Up & Start Learning' : 'Log In'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/[0.06] dark:border-white/[0.08]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-mono">
                <span className="bg-white dark:bg-[#131926] px-3 text-black/40 dark:text-slate-400 font-medium">Or explore instantly</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isSubmitting}
                id="demo-login-btn"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-[#FAFAF8] dark:bg-[#1A2234] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] text-xs font-semibold text-[#121212] dark:text-[#F8FAFC] transition-all cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Explore with Demo Account (Anurag)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
