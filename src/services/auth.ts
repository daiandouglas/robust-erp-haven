
import { supabase } from "@/integrations/supabase/client";
import React from 'react';

type User = {
  id: string;
  email: string;
  name: string;
  role: 'requester' | 'approver' | 'admin';
  avatar?: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
};

// Initial state
let authState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

// Event listeners
const listeners = new Set<(state: AuthState) => void>();

// Function to update state and notify listeners
const updateState = (newState: Partial<AuthState>) => {
  authState = { ...authState, ...newState };
  listeners.forEach((listener) => listener(authState));
};

// Initialize auth state
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    updateState({
      isAuthenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.user_metadata.name || 'User',
        role: 'requester',
        avatar: `https://ui-avatars.com/api/?name=${session.user.email}&background=0D8ABC&color=fff`,
      },
      loading: false,
    });
  } else {
    updateState({ loading: false });
  }
});

// Subscribe to auth changes
supabase.auth.onAuthStateChange(async (event, session) => {
  if (session?.user) {
    updateState({
      isAuthenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.user_metadata.name || 'User',
        role: 'requester',
        avatar: `https://ui-avatars.com/api/?name=${session.user.email}&background=0D8ABC&color=fff`,
      },
      loading: false,
    });
  } else {
    updateState({ isAuthenticated: false, user: null, loading: false });
  }
});

export const auth = {
  subscribe: (callback: (state: AuthState) => void) => {
    listeners.add(callback);
    callback(authState);
    return () => {
      listeners.delete(callback);
    };
  },

  getCurrentUser: () => authState.user,

  getAuthState: () => authState,

  signIn: async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      updateState({ loading: true });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { 
        success: false, 
        error: error.message || 'An error occurred during sign in' 
      };
    } finally {
      updateState({ loading: false });
    }
  },

  signUp: async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      updateState({ loading: true });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      return { 
        success: true,
        error: 'Please check your email to confirm your account.' 
      };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { 
        success: false, 
        error: error.message || 'An error occurred during sign up' 
      };
    } finally {
      updateState({ loading: false });
    }
  },

  signOut: async (): Promise<void> => {
    try {
      updateState({ loading: true });
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      updateState({ loading: false });
    }
  },

  hasPermission: (permission: string): boolean => {
    if (!authState.isAuthenticated || !authState.user) {
      return false;
    }

    const role = authState.user.role;
    
    if (role === 'admin') {
      return true;
    }
    
    if (role === 'approver' && ['approve', 'request'].includes(permission)) {
      return true;
    }
    
    if (role === 'requester' && permission === 'request') {
      return true;
    }
    
    return false;
  },
};

export const useAuth = () => {
  const [state, setState] = React.useState<AuthState>(authState);
  
  React.useEffect(() => {
    return auth.subscribe(setState);
  }, []);
  
  return state;
};
