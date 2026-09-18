import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  type IShopkeeperRepository,
  IShopkeeperRepositoryToken,
} from '../../domain/providers/repositories/shopkeeper.repository.interface';

import {
  ITokenService,
  ITokenServiceToken,
} from '../../domain/providers/interface/token.service.interface';
import type { RefreshShopkeeperOutputDto } from '../dtos/refresh-shopkeeper.dto';

@Injectable()
export class RefreshShopkeeperTokenUseCase {
  constructor(
    @Inject(IShopkeeperRepositoryToken)
    private readonly shopkeeperRepository: IShopkeeperRepository,
    @Inject(ITokenServiceToken)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(refreshToken: string): Promise<RefreshShopkeeperOutputDto> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token não informado.');
    }

    const payload = this.tokenService.verifyRefreshToken(refreshToken);

    const shopkeeper = await this.shopkeeperRepository.findById(payload.sub);
    if (!shopkeeper) {
      throw new UnauthorizedException('Lojista não encontrado.');
    }

    if (!shopkeeper.isApproved()) {
      throw new ForbiddenException(
        'Sua conta não está mais autorizada a acessar o sistema.',
      );
    }

    const accessToken = this.tokenService.generateAccessToken({
      sub: shopkeeper.id!,
      email: shopkeeper.email,
    });

    return { accessToken };
  }
}
