export interface TokenPayload {
  sub: string;
  email: string;
  resetCodeId?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenService {
  generateAccessToken(payload: TokenPayload): string;
  generateRefreshToken(payload: TokenPayload): string;
  generatePasswordResetToken(payload: TokenPayload): string;

  verifyAccessToken(token: string): TokenPayload;
  verifyRefreshToken(token: string): TokenPayload;
  verifyPasswordResetToken(token: string): TokenPayload;
}

export const ITokenServiceToken = Symbol('ITokenService');
