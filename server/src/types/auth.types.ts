import { User } from './user.types';

export interface AuthResponse {
  success: boolean;
  error?: string;
}

export interface LoginResponse extends AuthResponse {
  user?: User;
}

export interface AuthStatus {
  isLoggedIn: boolean;
  email?: string;
}

// express-session 타입 확장
declare module 'express-session' {
  interface Session {
    user?: {
      email: string;
      googleId: string;
      accessToken: string;
      refreshToken?: string;
    };
  }
}
