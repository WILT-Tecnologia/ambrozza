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

  generatePasswordResetToken(payload: TokenPayload): string {
    console.log('PAYLOAD DENTRO DO JWT SERVICE:', payload);

    const token = this.jwtService.sign(payload, {
      secret: process.env.SHOPKEEPER_PASSWORD_RESET_TOKEN_SECRET,
      expiresIn: '10m',
    });

    console.log('PAYLOAD DECODIFICADO:', this.jwtService.decode(token));

    return token;
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

  verifyPasswordResetToken(token: string): TokenPayload {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.SHOPKEEPER_PASSWORD_RESET_TOKEN_SECRET,
      });
    } catch {
      throw new UnauthorizedException(
        'Token de recuperação inválido ou expirado.',
      );
    }
  }
}
