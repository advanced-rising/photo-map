export interface AuthStatus {
  isLoggedIn: boolean;
  email?: string;
}

export interface LogoutResponse {
  success: boolean;
  error?: string;
}
