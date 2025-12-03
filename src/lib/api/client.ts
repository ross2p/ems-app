import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { API_CONFIG, HTTP_STATUS } from '../config';
import { tokenStorage } from '../storage';
import type { GlobalResponse, ApiErrorResponse } from '@/types';

let authServiceImported: any = null;

const getAuthService = async () => {
  if (!authServiceImported) {
    const module = await import('./authService');
    authServiceImported = module.authService;
  }
  return authServiceImported;
};

const createAxiosClient = (baseUrl: string): AxiosInstance => {
  const client = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(
    (config) => {
      const token = tokenStorage.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('[API Request Error]', error);
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      if (
        error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
        !originalRequest._retry &&
        originalRequest.url?.includes('/auth/refresh') === false
      ) {
        originalRequest._retry = true;

        try {
          const refreshToken = tokenStorage.getRefreshToken();
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const authService = await getAuthService();
          const response = await authService.refreshToken(refreshToken);

          tokenStorage.setAccessToken(response.accessToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
          }
          return client(originalRequest);
        } catch (refreshError) {
          tokenStorage.clearAll();
          console.error('[Auth] Token refresh failed:', refreshError);
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};

export const apiClient = createAxiosClient(API_CONFIG.BASE_URL);

