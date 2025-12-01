export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  name: string;
  data: null;
}

export interface AppError {
  statusCode: number;
  message: string;
  name: string;
  timestamp?: string;
  path?: string;
}


export interface ErrorState {
  hasError: boolean;
  error: AppError | null;
}

export interface FieldError {
  field: string;
  message: string;
}

export type FormErrors = Record<string, string>;
