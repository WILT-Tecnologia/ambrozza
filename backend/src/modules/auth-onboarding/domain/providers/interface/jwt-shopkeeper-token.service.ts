import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenService, TokenPayload } from './token.service.interface';

@Injectable()
export class JwtShopkeeperTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.SHOPKEEPER_ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
    });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.SHOPKEEPER_REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.SHOPKEEPER_ACCESS_TOKEN_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Token de acesso inválido ou expirado.');
    }
  }

  verifyRefreshToken(token: string): TokenPayload {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.SHOPKEEPER_REFRESH_TOKEN_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido ou expirado.');
    }
  }
}
