import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserPreferences } from '../types';
import {
  isSupabaseConfigured,
  supabase,
  getStoredCurrentUserId,
  setStoredCurrentUserId,
  dbGetUserProfile,
  dbGetUserPreferences,
  localSignUp,
  localLogIn,
  seedDefaultDemoUser,
} from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  preferences: UserPreferences | null;
  loading: boolean;
  isConfiguredWithSupabase: boolean;
  signUp: (name: string, email: string, password: string) => Promise<UserProfile>;
  logIn: (email: string, password: string) => Promise<UserProfile>;
  logOut: () => Promise<void>;
  loginAsDemo: () => Promise<UserProfile>;
  refreshUserData: () => Promise<void>;
  updateUserPreferencesState: (prefs: UserPreferences) => void;
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
              const prefs = await dbGetUserPreferences(profile.id);
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
            const prefs = await dbGetUserPreferences(profile.id);
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
      const prefs = await dbGetUserPreferences(user.id);
      if (prefs) setPreferences(prefs);
    } catch (e) {
      console.error('Error refreshing user data:', e);
    }
  };

  const updateUserPreferencesState = (prefs: UserPreferences) => {
    setPreferences(prefs);
  };

  const signUp = async (name: string, email: string, password: string): Promise<UserProfile> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
          },
        });
        if (error) throw error;
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            name,
            email,
            created_at: new Date().toISOString(),
          };
          // Insert profile record
          await supabase.from('profiles').upsert(profile);
          setUser(profile);
          setStoredCurrentUserId(profile.id);
          const initialPrefs: UserPreferences = {
            user_id: profile.id,
            selected_subjects: ['law-rights', 'money-finance', 'economics'],
            level: 'Beginner',
            daily_minutes: 10,
            preferred_time: 'Morning',
            learning_goal: 'Improve my practical knowledge',
            onboarding_completed: false,
          };
          setPreferences(initialPrefs);
          return profile;
        }
      }

      // Local persistent registration
      const newProfile = await localSignUp(name, email, password);
      setUser(newProfile);
      setStoredCurrentUserId(newProfile.id);
      const prefs = await dbGetUserPreferences(newProfile.id);
      setPreferences(prefs);
      return newProfile;
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (email: string, password: string): Promise<UserProfile> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          const profile = await dbGetUserProfile(data.user.id);
          if (profile) {
            setUser(profile);
            setStoredCurrentUserId(profile.id);
            const prefs = await dbGetUserPreferences(profile.id);
            setPreferences(prefs);
            return profile;
          }
        }
      }

      // Local persistent login
      const loggedProfile = await localLogIn(email, password);
      setUser(loggedProfile);
      setStoredCurrentUserId(loggedProfile.id);
      const prefs = await dbGetUserPreferences(loggedProfile.id);
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
      const prefs = await dbGetUserPreferences(demoUser.id);
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
