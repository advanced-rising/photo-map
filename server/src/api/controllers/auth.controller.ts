import { Request, Response } from 'express';
import { google } from 'googleapis';
import { UserService } from '@services/user.service';
import { GoogleUserInfo } from '@shared/google.types';
import { AuthStatus } from '@shared/auth.types';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

const SCOPES = [
  'https://www.googleapis.com/auth/photoslibrary.readonly',
  'https://www.googleapis.com/auth/maps',
] as const;

export const googleLogin = (req: Request, res: Response): void => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES as unknown as string[],
  });
  res.redirect(authUrl);
};

export const googleCallback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code;
  if (!code || typeof code !== 'string') {
    res.status(400).json({ error: 'Invalid authorization code' });
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();
    const userInfo = data as GoogleUserInfo;

    // 사용자 정보를 세션에 저장
    req.session.user = {
      email: userInfo.email,
      googleId: userInfo.id,
      accessToken: tokens.access_token!,
      refreshToken: tokens.refresh_token || undefined,
    };

    // DB에 사용자 저장 또는 업데이트
    const existingUser = await UserService.findUserByGoogleId(userInfo.id);
    if (existingUser) {
      await UserService.updateUserTokens(existingUser.id, tokens.access_token!, tokens.refresh_token || '');
    } else {
      await UserService.createUser(userInfo.email, userInfo.id, tokens.access_token!, tokens.refresh_token || '');
    }

    res.redirect(process.env.CLIENT_URL || 'http://localhost:3001');
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).json({ error: 'Failed to get tokens' });
  }
};

export const getAuthStatus = (req: Request, res: Response): void => {
  const authStatus: AuthStatus = req.session.user
    ? {
        isLoggedIn: true,
        email: req.session.user.email,
      }
    : {
        isLoggedIn: false,
      };

  res.json(authStatus);
};

export const logout = (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to logout' });
    } else {
      res.json({ success: true });
    }
  });
};
