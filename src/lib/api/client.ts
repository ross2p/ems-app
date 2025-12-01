/**
 * Axios API Client with comprehensive interceptors
 * Handles:
 * - Authentication (Authorization header with Bearer token)
 * - Token refresh on 401 responses
 * - Error normalization
 * - Request/Response logging (dev only)
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { API_CONFIG, HTTP_STATUS } from '../config';
import { tokenStorage } from '../storage';
import type { GlobalResponse, ApiErrorResponse } from '@/types';

/**
 * Create and configure axios client instance
 */
const createAxiosClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Request interceptor: Add authorization header
   */
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

  /**
   * Response interceptor: Handle token refresh on 401
   */
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // Handle 401 with token refresh
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

          // Use a new instance to avoid infinite loop
          const response = await axios.post<GlobalResponse<{ accessToken: string }>>(
            `${API_CONFIG.BASE_URL}/auth/refresh`,
            { refreshToken },
          );

          const newAccessToken = response.data.data?.accessToken;
          if (!newAccessToken) {
            throw new Error('No access token in refresh response');
          }

          // Update token and retry original request
          tokenStorage.setAccessToken(newAccessToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return client(originalRequest);
        } catch (refreshError) {
          // Clear tokens on refresh failure
          tokenStorage.clearAll();
          console.error('[Auth] Token refresh failed:', refreshError);
          // Redirect to login will be handled by auth guard
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};

/**
 * Singleton API client instance
 */
export const apiClient = createAxiosClient();

/**
 * Helper to create configured axios instance
 */
export function getApiClient(): AxiosInstance {
  return apiClient;
}
