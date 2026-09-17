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
  IHashService,
  IHashServiceToken,
} from '../../domain/providers/interface/hash.service.interface';
import {
  ITokenService,
  ITokenServiceToken,
} from '../../domain/providers/interface/token.service.interface';
import type {
  LoginShopkeeperInputDto,
  LoginShopkeeperOutputDto,
} from '../dtos/login-shopkeeper.dto';

@Injectable()
export class LoginShopkeeperUseCase {
  constructor(
    @Inject(IShopkeeperRepositoryToken)
    private readonly shopkeeperRepository: IShopkeeperRepository,
    @Inject(IHashServiceToken)
    private readonly hashService: IHashService,
    @Inject(ITokenServiceToken)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(
    input: LoginShopkeeperInputDto,
  ): Promise<LoginShopkeeperOutputDto> {
    const email = input.email.trim().toLowerCase();

    const shopkeeper = await this.shopkeeperRepository.findByEmail(email);

    const passwordHash =
      shopkeeper?.passwordHash ?? process.env.AUTH_DUMMY_PASSWORD_HASH;

    if (!passwordHash) {
      throw new Error('AUTH_DUMMY_PASSWORD_HASH não configurado.');
    }

    const isPasswordValid = await this.hashService.compare(
      input.password,
      passwordHash,
    );

    if (!shopkeeper || !isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    if (!shopkeeper.isApproved()) {
      if (shopkeeper.isRejected()) {
        throw new ForbiddenException(
          'Sua solicitação de cadastro foi rejeitada.',
        );
      }
      throw new ForbiddenException(
        'Sua conta ainda está aguardando aprovação do administrador.',
      );
    }

    if (!shopkeeper.id) {
      throw new Error('Shopkeeper sem ID ao gerar tokens.');
    }

    const payload = { sub: shopkeeper.id, email: shopkeeper.email };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      shopkeeper: {
        id: shopkeeper.id,
        name: shopkeeper.name,
        email: shopkeeper.email,
      },
    };
  }
}
