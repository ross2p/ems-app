import { GlobalResponse } from './api';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface TokenResponse {
  accessToken: string;
}

export type LoginResponse = GlobalResponse<AuthResponse>;
export type RegisterResponse = GlobalResponse<AuthResponse>;
export type RefreshTokenResponse = GlobalResponse<TokenResponse>;
export type UserResponse = GlobalResponse<User>;
