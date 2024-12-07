import { API_BASE_URL } from '@/utils/axios';

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/google`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  STATUS: `${API_BASE_URL}/auth/status`,
} as const;
