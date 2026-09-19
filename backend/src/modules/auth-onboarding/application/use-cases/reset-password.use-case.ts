import { Inject, Injectable } from '@nestjs/common';

import {
  IHashService,
  IHashServiceToken,
} from '../../domain/providers/interface/hash.service.interface';

import {
  IPasswordResetRepository,
  IPasswordResetRepositoryToken,
} from '../../domain/providers/repositories/password-reset.repository.interface';

import {
  IShopkeeperRepository,
  IShopkeeperRepositoryToken,
} from '../../domain/providers/repositories/shopkeeper.repository.interface';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject(IShopkeeperRepositoryToken)
    private readonly shopkeeperRepository: IShopkeeperRepository,

    @Inject(IPasswordResetRepositoryToken)
    private readonly passwordResetRepository: IPasswordResetRepository,

    @Inject(IHashServiceToken)
    private readonly hashService: IHashService,
  ) {}

  async execute(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<void> {
    const normalizedEmail = email.trim().toLowerCase();

    const shopkeeper =
      await this.shopkeeperRepository.findByEmail(normalizedEmail);

    if (!shopkeeper || !shopkeeper.id) {
      throw new Error('Código de recuperação inválido.');
    }

    const resetCode =
      await this.passwordResetRepository.findLatestByShopkeeperId(
        shopkeeper.id,
      );

    if (!resetCode) {
      throw new Error('Código de recuperação inválido.');
    }

    if (resetCode.usedAt) {
      throw new Error('Código de recuperação já utilizado.');
    }

    if (resetCode.expiresAt < new Date()) {
      throw new Error('Código de recuperação expirado.');
    }

    const isCodeValid = await this.hashService.compare(
      code,
      resetCode.codeHash,
    );

    if (!isCodeValid) {
      throw new Error('Código de recuperação inválido.');
    }

    const passwordHash = await this.hashService.hash(newPassword);

    await this.shopkeeperRepository.updatePassword(shopkeeper.id, passwordHash);

    await this.passwordResetRepository.markAsUsed(resetCode.id);
  }
}
