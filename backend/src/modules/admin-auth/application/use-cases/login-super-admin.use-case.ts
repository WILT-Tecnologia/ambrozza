import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { IHashService } from '../../domain/providers/interface/hash.service.interface';
import { IHashServiceToken } from '../../domain/providers/interface/hash.service.interface';

import {
  ITokenService,
  ITokenServiceToken,
} from '../../domain/providers/interface/token.service.interface';
import {
  type ISuperUserRepository,
  ISuperUserRepositoryToken,
} from '../../domain/providers/repositories/super-admin.repository.interface';
import {
  LoginSuperUserInputDto,
  LoginSuperUserOutputDto,
} from '../dtos/login-super-admin.dto';

@Injectable()
export class LoginSuperUserUseCase {
  constructor(
    @Inject(ISuperUserRepositoryToken)
    private readonly superUserRepository: ISuperUserRepository,
    @Inject(IHashServiceToken)
    private readonly hashService: IHashService,

    @Inject(ITokenServiceToken)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(
    input: LoginSuperUserInputDto,
  ): Promise<LoginSuperUserOutputDto> {
    const email = input.email.trim().toLowerCase();

    const superUser = await this.superUserRepository.findByEmail(email);

    const passwordHash =
      superUser?.passwordHash ?? process.env.AUTH_DUMMY_PASSWORD_HASH;

    if (!passwordHash) {
      throw new Error('AUTH_DUMMY_PASSWORD_HASH não configurado.');
    }

    const isPasswordValid = await this.hashService.compare(
      input.password,
      passwordHash,
    );

    if (!superUser || !isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const payload = {
      sub: superUser.id,
      email: superUser.email,
    };

    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      superUser: {
        id: superUser.id,
        email: superUser.email,
      },
      message: 'Login realizado com sucesso!',
    };
  }
}
