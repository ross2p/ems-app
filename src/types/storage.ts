export type SafeStorageValue = string | null;

export interface ITokenStorage {
  getAccessToken(): string | null;
  setAccessToken(token: string): boolean;
  getRefreshToken(): string | null;
  setRefreshToken(token: string): boolean;
  setTokens(accessToken: string, refreshToken: string): boolean;
  clearTokens(): boolean;
  hasValidAccessToken(): boolean;
  getUser<T>(): T | null;
  setUser<T>(user: T | null): boolean;
  clearAll(): boolean;
}
