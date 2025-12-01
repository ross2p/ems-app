import { z } from 'zod';
import { AUTH, REGEX } from '../config';

/**
 * Email validation schema
 */
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .toLowerCase()
  .trim();

/**
 * Password validation schema
 */
const passwordSchema = z
  .string()
  .min(AUTH.PASSWORD_MIN_LENGTH, `Password must be at least ${AUTH.PASSWORD_MIN_LENGTH} characters`)
  .max(AUTH.PASSWORD_MAX_LENGTH, `Password must be less than ${AUTH.PASSWORD_MAX_LENGTH} characters`)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain uppercase, lowercase, and numbers',
  );

/**
 * Name validation schema
 */
const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(AUTH.NAME_MIN_LENGTH, `Name must be at least ${AUTH.NAME_MIN_LENGTH} characters`)
  .max(AUTH.NAME_MAX_LENGTH, `Name must be less than ${AUTH.NAME_MAX_LENGTH} characters`)
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
  .trim();

/**
 * Login form validation
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register form validation
 */
export const registerSchema = z
  .object({
    email: emailSchema,
    firstName: nameSchema,
    lastName: nameSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Password reset validation
 */
export const passwordResetSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
