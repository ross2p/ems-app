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

  getMe: async (): Promise<User> => {
    const response = await apiClient.get<GlobalResponse<User>>(API_ROUTES.USER.ME);
    
    if (!response.data.data) {
      throw new Error('No user data in response');
    }
    
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(API_ROUTES.AUTH.LOGOUT);
    } catch (error) {
      console.warn('[Auth] Logout error:', error);
    }
  },
};
