import { apiClient } from './client';
import { API_ROUTES } from '../config';
import type { User, GlobalResponse } from '@/types';

export const userService = {
  getProfile: async (id: string): Promise<User> => {
    const response = await apiClient.get<GlobalResponse<User>>(
      API_ROUTES.USER.PROFILE(id),
    );
    
    if (!response.data.data) {
      throw new Error('No user data in response');
    }
    
    return response.data.data;
  },

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

  deleteAccount: async (id: string): Promise<void> => {
    await apiClient.delete(API_ROUTES.USER.DELETE(id));
  },
};
