/**
 * Security utilities
 * Content Security, Input Validation, XSS Prevention, etc.
 */

/**
 * Sanitize string to prevent XSS attacks
 * Removes or escapes potentially dangerous characters
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return '';

  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Sanitize object properties to prevent XSS
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj } as Record<string, any>;

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeString(sanitized[key]);
    }
  }

  return sanitized as T;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * Requires: at least one uppercase, one lowercase, one digit, 6+ characters
 */
export function isStrongPassword(password: string): boolean {
  if (!password || password.length < 6) return false;

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);

  return hasUppercase && hasLowercase && hasDigit;
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate a cryptographically secure random string
 */
export function generateRandomString(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * Check if a token is expired (basic JWT validation)
 */
export function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;

    const payload = JSON.parse(atob(parts[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds

    return Date.now() > expirationTime;
  } catch {
    return true;
  }
}

/**
 * Rate limit function call
 * Prevents calling function more than N times per second
 */
export function createRateLimiter(maxCalls: number = 3, windowMs: number = 1000) {
  let calls: number[] = [];

  return function (fn: (...args: any[]) => any, ...args: any[]) {
    const now = Date.now();
    calls = calls.filter(time => now - time < windowMs);

    if (calls.length < maxCalls) {
      calls.push(now);
      return fn(...args);
    }

    console.warn(`Rate limit exceeded: ${maxCalls} calls per ${windowMs}ms`);
    return null;
  };
}
