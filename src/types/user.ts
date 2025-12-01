import { GlobalResponse } from './api';

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateUserResponse = GlobalResponse<UserProfile>;
export type UserProfileResponse = GlobalResponse<UserProfile>;
