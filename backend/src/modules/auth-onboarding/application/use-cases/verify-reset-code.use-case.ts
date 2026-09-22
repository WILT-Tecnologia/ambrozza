import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  IHashService,
  IHashServiceToken,
} from '../../domain/providers/interface/hash.service.interface';
import {
  ITokenService,
  ITokenServiceToken,
} from '../../domain/providers/interface/token.service.interface';
import {
  IPasswordResetRepository,
  IPasswordResetRepositoryToken,
} from '../../domain/providers/repositories/password-reset.repository.interface';
import {
  IShopkeeperRepository,
  IShopkeeperRepositoryToken,
} from '../../domain/providers/repositories/shopkeeper.repository.interface';

@Injectable()
export class VerifyResetCodeUseCase {
  constructor(
    @Inject(IShopkeeperRepositoryToken)
    private readonly shopkeeperRepository: IShopkeeperRepository,

    @Inject(IPasswordResetRepositoryToken)
    private readonly passwordResetRepository: IPasswordResetRepository,

    @Inject(IHashServiceToken)
    private readonly hashService: IHashService,

    @Inject(ITokenServiceToken)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(email: string, code: string): Promise<string> {
    const normalizedEmail = email.trim().toLowerCase();

    const shopkeeper =
      await this.shopkeeperRepository.findByEmail(normalizedEmail);

    if (!shopkeeper || !shopkeeper.id) {
      throw new BadRequestException('Código de recuperação inválido.');
    }

    const resetCode =
      await this.passwordResetRepository.findLatestByShopkeeperId(
        shopkeeper.id,
      );

    if (!resetCode) {
      throw new BadRequestException('Código de recuperação inválido.');
    }

    if (resetCode.usedAt) {
      throw new BadRequestException('Código de recuperação já utilizado.');
    }

    if (resetCode.expiresAt < new Date()) {
      throw new BadRequestException('Código de recuperação expirado.');
    }

    const isCodeValid = await this.hashService.compare(
      code,
      resetCode.codeHash,
    );

    if (!isCodeValid) {
      throw new BadRequestException('Código de recuperação inválido.');
    }

    return this.tokenService.generatePasswordResetToken({
      sub: shopkeeper.id,
      email: normalizedEmail,
      resetCodeId: resetCode.id,
    });
  }
}
