import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import {
  type ITokenService,
  ITokenServiceToken,
} from '../../domain/providers/interface/token.service.interface';

import {
  type ISuperUserRepository,
  ISuperUserRepositoryToken,
} from '../../domain/providers/repositories/super-admin.repository.interface';

interface RefreshTokenRequestDto {
  refreshToken: string;
}

interface RefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class RefreshSuperUserTokenUseCase {
  constructor(
    @Inject(ISuperUserRepositoryToken)
    private readonly superUserRepository: ISuperUserRepository,

    @Inject(ITokenServiceToken)
    private readonly tokenService: ITokenService,
  ) {}

  async execute({
    refreshToken,
  }: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      // 1. Valida a assinatura e decodifica o payload do refresh token
      const payload = this.tokenService.verifyRefreshToken(refreshToken);

      // 2. Garante que o super admin ainda existe no banco de dados
      const superUser = await this.superUserRepository.findByEmail(
        payload.email,
      );
      if (!superUser) {
        throw new UnauthorizedException('Invalid session');
      }

      // 3. Gera novos tokens (Token Rotation para maior segurança)
      const tokenPayload = { sub: superUser.id, email: superUser.email };

      const newAccessToken =
        this.tokenService.generateAccessToken(tokenPayload);
      const newRefreshToken =
        this.tokenService.generateRefreshToken(tokenPayload);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
