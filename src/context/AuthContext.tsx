import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserPreferences } from '../types';
import {
  isSupabaseConfigured,
  supabase,
  getStoredCurrentUserId,
  setStoredCurrentUserId,
  dbGetUserProfile,
  dbGetUserPreferences,
  dbSaveUserPreferences,
  localSignUp,
  localLogIn,
  seedDefaultDemoUser,
  normalizeUsername,
  isValidUsername,
  getSyntheticEmail,
} from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  preferences: UserPreferences | null;
  loading: boolean;
  isConfiguredWithSupabase: boolean;
  signUp: (name: string, username: string, password: string) => Promise<UserProfile>;
  logIn: (username: string, password: string) => Promise<UserProfile>;
  logOut: () => Promise<void>;
  loginAsDemo: () => Promise<UserProfile>;
  refreshUserData: () => Promise<void>;
  updateUserPreferencesState: (prefs: UserPreferences) => void;
  completeOnboarding: (prefsData: Partial<UserPreferences>) => Promise<UserPreferences>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize session on mount
  useEffect(() => {
    async function initAuth() {
      setLoading(true);
      try {
        if (isSupabaseConfigured && supabase) {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            const profile = await dbGetUserProfile(data.session.user.id);
            if (profile) {
              setUser(profile);
              const prefs = await dbGetUserPreferences(profile.id, profile.username);
              setPreferences(prefs);
              setStoredCurrentUserId(profile.id);
              setLoading(false);
              return;
            }
          }
        }

        // Fallback to local active session
        const storedId = getStoredCurrentUserId();
        if (storedId) {
          const profile = await dbGetUserProfile(storedId);
          if (profile) {
            setUser(profile);
            const prefs = await dbGetUserPreferences(profile.id, profile.username);
            setPreferences(prefs);
          } else {
            setStoredCurrentUserId(null);
          }
        }
      } catch (err) {
        console.error('Failed to restore auth session:', err);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  const refreshUserData = async () => {
    if (!user) return;
    try {
      const profile = await dbGetUserProfile(user.id);
      if (profile) setUser(profile);
      const prefs = await dbGetUserPreferences(user.id, user.username);
      if (prefs) setPreferences(prefs);
    } catch (e) {
      console.error('Error refreshing user data:', e);
    }
  };

  const updateUserPreferencesState = (prefs: UserPreferences) => {
    setPreferences(prefs);
  };

  const completeOnboarding = async (prefsData: Partial<UserPreferences>): Promise<UserPreferences> => {
    if (!user) {
      throw new Error('User is not authenticated.');
    }

    const currentBase = preferences || (await dbGetUserPreferences(user.id, user.username));
    const finalPrefs: UserPreferences = {
      user_id: user.id,
      selected_subjects: prefsData.selected_subjects || currentBase.selected_subjects || ['law-rights', 'money-finance', 'economics'],
      level: prefsData.level || currentBase.level || 'Beginner',
      daily_minutes: prefsData.daily_minutes || currentBase.daily_minutes || 10,
      preferred_time: prefsData.preferred_time || currentBase.preferred_time || 'Morning',
      learning_goal: prefsData.learning_goal || currentBase.learning_goal || 'Improve my practical knowledge',
      onboarding_completed: true,
    };

    // 1. Save to persistent storage (Supabase + localStorage under user_id and username)
    await dbSaveUserPreferences(finalPrefs, user.username);

    // 2. Synchronously update AuthContext state so UI immediately leaves Step 5/5
    setPreferences(finalPrefs);

    return finalPrefs;
  };

  const signUp = async (name: string, username: string, password: string): Promise<UserProfile> => {
    try {
      const cleanUsername = normalizeUsername(username);

      if (!isValidUsername(cleanUsername)) {
        throw new Error('Username me sirf letters, numbers aur underscore use karo.');
      }

      if (!password || password.length < 6) {
        throw new Error('Password thoda strong rakho.');
      }

      if (!name.trim()) {
        throw new Error('Please enter your full name.');
      }

      console.log('[Auth Frontend] Calling secure server signup endpoint /api/auth/signup for:', cleanUsername);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name.trim(),
          username: cleanUsername,
          password,
        }),
      });

      let resData: any = null;
      try {
        resData = await response.json();
      } catch {
        resData = null;
      }

      if (!response.ok || !resData?.ok) {
        const errorMsg = resData?.error || 'Oops, kuch technical problem aa gayi. Dobara try karo.';
        throw new Error(errorMsg);
      }

      const createdUser = resData.user;
      const syntheticEmail = getSyntheticEmail(cleanUsername);

      // If Supabase client is configured, establish active session via password authentication
      if (isSupabaseConfigured && supabase) {
        console.log('[Auth Frontend] Establishing active session via Supabase password login');
        try {
          const { data: signRes, error: signErr } = await supabase.auth.signInWithPassword({
            email: syntheticEmail,
            password,
          });

          if (!signErr && signRes.user) {
            console.log('[Auth Frontend] Supabase session established successfully');
            const profile: UserProfile = {
              id: signRes.user.id,
              name: name.trim(),
              full_name: name.trim(),
              username: cleanUsername,
              email: syntheticEmail,
              created_at: createdUser?.created_at || new Date().toISOString(),
            };

            // Mirror in local fallback cache for seamless persistence & offline support
            try {
              await localSignUp(name.trim(), cleanUsername, password);
            } catch {
              // already cached
            }

            setUser(profile);
            setStoredCurrentUserId(profile.id);
            const prefs = await dbGetUserPreferences(profile.id);
            setPreferences(prefs);
            return profile;
          }
        } catch (signInErr) {
          console.warn('[Auth Frontend] Post-signup signInWithPassword note:', signInErr);
        }
      }

      // Fallback session state (e.g. offline, local, or server-managed)
      const fallbackProfile: UserProfile = {
        id: createdUser?.id || ('usr_' + cleanUsername),
        name: name.trim(),
        full_name: name.trim(),
        username: cleanUsername,
        email: syntheticEmail,
        created_at: createdUser?.created_at || new Date().toISOString(),
      };

      try {
        await localSignUp(name.trim(), cleanUsername, password);
      } catch {
        // already present
      }

      setUser(fallbackProfile);
      setStoredCurrentUserId(fallbackProfile.id);
      const initialPrefs = await dbGetUserPreferences(fallbackProfile.id);
      setPreferences(initialPrefs);
      return fallbackProfile;
    } finally {
      // no-op
    }
  };

  const logIn = async (username: string, password: string): Promise<UserProfile> => {
    setLoading(true);
    try {
      const cleanUsername = normalizeUsername(username);
      if (!cleanUsername) {
        throw new Error('Username ya password galat hai.');
      }
      const syntheticEmail = getSyntheticEmail(cleanUsername);

      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: syntheticEmail,
          password,
        });

        if (error) {
          const errMsg = (error.message || '').toLowerCase();
          const status = (error as any)?.status || (error as any)?.code;
          if (
            status === 429 ||
            errMsg.includes('too many') ||
            errMsg.includes('rate limit') ||
            errMsg.includes('security purposes')
          ) {
            throw new Error('Abhi bahut attempts ho gaye hain 😅. Thodi der baad dobara try karo.');
          }

          // Fallback to local store for demo user or local account
          try {
            const localUser = await localLogIn(cleanUsername, password);
            setUser(localUser);
            setStoredCurrentUserId(localUser.id);
            const prefs = await dbGetUserPreferences(localUser.id);
            setPreferences(prefs);
            return localUser;
          } catch {
            throw new Error('Username ya password galat hai.');
          }
        }

        if (data.user) {
          const profile = await dbGetUserProfile(data.user.id);
          const resolvedProfile: UserProfile = profile || {
            id: data.user.id,
            name: (data.user.user_metadata?.name || data.user.user_metadata?.full_name || 'Learner'),
            username: (data.user.user_metadata?.username || cleanUsername),
            email: syntheticEmail,
            created_at: data.user.created_at || new Date().toISOString(),
          };
          setUser(resolvedProfile);
          setStoredCurrentUserId(resolvedProfile.id);
          const prefs = await dbGetUserPreferences(resolvedProfile.id, cleanUsername);
          setPreferences(prefs);
          return resolvedProfile;
        }
      }

      // Local persistent login
      const loggedProfile = await localLogIn(cleanUsername, password);
      setUser(loggedProfile);
      setStoredCurrentUserId(loggedProfile.id);
      const prefs = await dbGetUserPreferences(loggedProfile.id, cleanUsername);
      setPreferences(prefs);
      return loggedProfile;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async (): Promise<void> => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn('Error during Supabase signout:', e);
    }
    setUser(null);
    setPreferences(null);
    setStoredCurrentUserId(null);
  };

  const loginAsDemo = async (): Promise<UserProfile> => {
    setLoading(true);
    try {
      const demoUser = seedDefaultDemoUser();
      setUser(demoUser);
      setStoredCurrentUserId(demoUser.id);
      const prefs = await dbGetUserPreferences(demoUser.id, demoUser.username);
      setPreferences(prefs);
      return demoUser;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        preferences,
        loading,
        isConfiguredWithSupabase: isSupabaseConfigured,
        signUp,
        logIn,
        logOut,
        loginAsDemo,
        refreshUserData,
        updateUserPreferencesState,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
