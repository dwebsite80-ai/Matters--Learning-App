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

    // Prevent duplicate submits / concurrent clicks synchronously
    if (inFlightRef.current || isSubmitting) {
      console.warn('[Auth Frontend] Submission ignored: another request is already in-flight.');
      return;
    }

    setErrorMsg(null);
    setInfoMsg(null);

    const cleanUsername = normalizeUsername(username);

    // Client-side validations
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
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col justify-center py-12 px-4 sm:px-6 animate-fadeIn">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Icon & Heading */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white shadow-xs">
            <span className="font-serif italic font-black text-2xl">M</span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-serif italic text-[#1A1A1A] tracking-tight">
            Matters
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light max-w-xs mx-auto leading-relaxed">
            “Learn what actually matters — 10–20 minutes a day.”
          </p>
        </div>

        {/* Feature Badges */}
        <div className="mt-5 flex items-center justify-center gap-3 text-[11px] text-gray-500 font-light">
          <span className="flex items-center gap-1.5 bg-[#F5F5F0] px-3 py-1 rounded-full border border-black/5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" /> Practical Competence
          </span>
          <span className="flex items-center gap-1.5 bg-[#F5F5F0] px-3 py-1 rounded-full border border-black/5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1A1A1A]" /> Daily Microlearning
          </span>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-8 border border-black/5 rounded-[32px] sm:rounded-[36px] shadow-sm">
          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-black/5 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg(null);
                setInfoMsg(null);
              }}
              className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold text-center border-b-2 transition-all ${
                mode === 'signup'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
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
              className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold text-center border-b-2 transition-all ${
                mode === 'login'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Log In
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-700" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-[#E6F4EA] border border-emerald-200 text-emerald-950 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-700" />
              <span>{infoMsg}</span>
            </div>
          )}

          {/* Authentication Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Anurag Sharma"
                    autoComplete="name"
                    className="block w-full pl-10 pr-4 py-3 border border-black/10 rounded-2xl text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] bg-[#FDFCFB]"
                  />
                </div>
              </div>
            )}

            {/* Username (Both Sign Up and Log In) */}
            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
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
                  autoComplete={mode === 'signup' ? 'username' : 'username'}
                  className="block w-full pl-10 pr-4 py-3 border border-black/10 rounded-2xl text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] bg-[#FDFCFB] font-mono"
                />
              </div>
            </div>

            {/* Password (Both Sign Up and Log In) */}
            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  className="block w-full pl-10 pr-4 py-3 border border-black/10 rounded-2xl text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] bg-[#FDFCFB]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="auth-submit-btn"
              className={`w-full mt-2 flex items-center justify-center gap-2 py-4 px-6 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black transition-all shadow-md ${
                isSubmitting ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>
                    {mode === 'signup' ? 'SIGN UP & START LEARNING' : 'LOG IN'}
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
                <div className="w-full border-t border-black/5" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-white px-3 text-gray-400 font-medium">Or quick explore</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isSubmitting}
                id="demo-login-btn"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-black/10 bg-[#F5F5F0] hover:bg-[#EBEBE5] text-xs font-medium text-[#1A1A1A] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Explore with Demo Account (Anurag)</span>
              </button>
            </div>
          </div>

          {/* Connection Status Footnote */}
          <div className="mt-5 text-center text-[11px] text-gray-400 font-light">
            {isConfiguredWithSupabase ? (
              <span className="text-emerald-800 font-medium">✓ Connected to live Supabase Backend</span>
            ) : (
              <span>Running with resilient local browser DB + Supabase schema ready</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
