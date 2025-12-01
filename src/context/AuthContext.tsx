'use client';

import { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { tokenStorage } from '@/lib/storage';
import { authService } from '@/lib/api';
import type { User } from '@/types';

/**
 * Auth Context Type Definition
 */
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  error: string | null;
  clearError: () => void;
}

/**
 * Auth Context
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialize auth state from storage
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const hasToken = tokenStorage.hasValidAccessToken();
        
        if (hasToken) {
          // Try to restore user from storage
          const storedUser = tokenStorage.getUser<User>();
          if (storedUser) {
            setUserState(storedUser);
          } else {
            // Try to fetch fresh user data
            try {
              const currentUser = await authService.getMe();
              setUserState(currentUser);
              tokenStorage.setUser(currentUser);
            } catch (fetchError) {
              // If we can't fetch user, clear tokens
              console.warn('[Auth] Failed to fetch user data:', fetchError);
              tokenStorage.clearAll();
              setUserState(null);
            }
          }
        }
      } catch (err) {
        console.error('[Auth] Initialization error:', err);
        tokenStorage.clearAll();
        setUserState(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Update user state and persist to storage
   */
  const setUser = useCallback((user: User | null) => {
    setUserState(user);
    const success = tokenStorage.setUser(user);
    if (!success && user) {
      console.warn('[Auth] Failed to persist user to storage');
    }
  }, []);

  /**
   * Set both access and refresh tokens
   */
  const setTokens = useCallback((accessToken: string, refreshToken: string) => {
    const success = tokenStorage.setTokens(accessToken, refreshToken);
    if (!success) {
      console.warn('[Auth] Failed to persist tokens to storage');
      setError('Failed to save authentication credentials');
    }
  }, []);

  /**
   * Logout current user
   */
  const logout = useCallback(async () => {
    try {
      // Try to notify server about logout
      await authService.logout();
    } catch (err) {
      console.warn('[Auth] Server logout failed:', err);
      // Continue with local logout
    } finally {
      // Always clear local state
      setUserState(null);
      tokenStorage.clearAll();
      setError(null);
    }
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    setUser,
    setTokens,
    logout,
    setLoading,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
