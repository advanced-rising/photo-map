export interface User {
  id?: number;
  email: string;
  name?: string;
  googleId: string;
  accessToken: string;
  refreshToken?: string;
}

export interface UserCreate {
  email: string;
  googleId: string;
  accessToken: string;
  refreshToken?: string;
  name?: string;
}

export interface UserUpdate {
  name?: string;
  accessToken?: string;
  refreshToken?: string;
}
