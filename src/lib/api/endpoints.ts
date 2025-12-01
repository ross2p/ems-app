/**
 * Auth API Service
 * Handles all authentication-related API calls
 */

import { apiClient } from './client';
import { API_ROUTES } from '../config';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  GlobalResponse,
} from '@/types';

export const authService = {
  /**
   * Login with email and password
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<GlobalResponse<AuthResponse>>(
      API_ROUTES.AUTH.LOGIN,
      data,
    );
    
    if (!response.data.data) {
      throw new Error('No auth data in response');
    }
    
    return response.data.data;
  },

  /**
   * Register new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<GlobalResponse<AuthResponse>>(
      API_ROUTES.AUTH.REGISTER,
      data,
    );
    
    if (!response.data.data) {
      throw new Error('No auth data in response');
    }
    
    return response.data.data;
  },

  /**
   * Refresh access token using refresh token
   */
  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await apiClient.post<GlobalResponse<{ accessToken: string }>>(
      API_ROUTES.AUTH.REFRESH,
      { refreshToken },
    );
    
    if (!response.data.data) {
      throw new Error('No token in refresh response');
    }
    
    return response.data.data;
  },

  /**
   * Get current authenticated user
   */
  getMe: async (): Promise<User> => {
    const response = await apiClient.get<GlobalResponse<User>>(API_ROUTES.USER.ME);
    
    if (!response.data.data) {
      throw new Error('No user data in response');
    }
    
    return response.data.data;
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post(API_ROUTES.AUTH.LOGOUT);
    } catch (error) {
      // Logout errors are not critical - user will be cleared locally
      console.warn('[Auth] Logout error:', error);
    }
  },
};

/**
 * User API Service
 */
export const userService = {
  /**
   * Get user profile by ID
   */
  getProfile: async (id: string): Promise<User> => {
    const response = await apiClient.get<GlobalResponse<User>>(
      API_ROUTES.USER.PROFILE(id),
    );
    
    if (!response.data.data) {
      throw new Error('No user data in response');
    }
    
    return response.data.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<GlobalResponse<User>>(
      API_ROUTES.USER.UPDATE,
      data,
    );
    
    if (!response.data.data) {
      throw new Error('No user data in response');
    }
    
    return response.data.data;
  },

  /**
   * Delete user account
   */
  deleteAccount: async (id: string): Promise<void> => {
    await apiClient.delete(API_ROUTES.USER.DELETE(id));
  },
};
