export interface ITokenService {
  generateAccessToken(payload: { sub: string; email: string }): string;
  generateRefreshToken(payload: { sub: string; email: string }): string;
  verifyRefreshToken(token: string): { sub: string; email: string };
}
export const ITokenServiceToken = Symbol('ITokenService');
