import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenService } from '../../domain/providers/interface/token.service.interface';

@Injectable()
export class JwtTokenAdapter implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: { sub: string; email: string }): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m', // 15 minutos conforme combinamos
    });
  }

  generateRefreshToken(payload: { sub: string; email: string }): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // 7 dias conforme combinamos
    });
  }

  verifyRefreshToken(token: string): { sub: string; email: string } {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
