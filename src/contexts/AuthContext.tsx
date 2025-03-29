
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { Profile, UserRole } from '@/types/database.types';

export interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  profile: Profile | null; // Added profile property
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  isLoading: true,
  profile: null, // Initialize profile as null
  signIn: async () => ({ error: null, data: null }),
  signUp: async () => ({ error: null, data: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null, data: null }),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Helper function to safely fetch user profile
  const fetchUserProfile = (userId: string) => {
    // Use setTimeout to break potential deadlock
    setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
        } else if (data) {
          setProfile(data as Profile);
        }
      } catch (error) {
        console.error('Unexpected error fetching user profile:', error);
      }
    }, 0);
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log(`Auth state changed: ${event}`);
        setSession(newSession);
        setUser(newSession?.user || null);
        
        // Fetch user profile when auth state changes
        if (newSession?.user) {
          fetchUserProfile(newSession.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
        } else {
          setSession(data.session);
          setUser(data.session?.user || null);
          
          // Fetch user profile if user exists
          if (data.session?.user) {
            fetchUserProfile(data.session.user.id);
          }
        }
      } catch (error) {
        console.error('Unexpected error fetching session:', error);
      } finally {
        setIsLoading(false);
        setAuthChecked(true);
      }
    };

    checkSession();

    // Clean up subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Profile will be fetched via the auth state change listener
      return response;
    } catch (error) {
      console.error('Error signing in:', error);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata: any = {}) => {
    setIsLoading(true);
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      return response;
    } catch (error) {
      console.error('Error signing up:', error);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      // Auth state change listener will update state
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return response;
    } catch (error) {
      console.error('Error resetting password:', error);
      return { error, data: null };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    profile,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
