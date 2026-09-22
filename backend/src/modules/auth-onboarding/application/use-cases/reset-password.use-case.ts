import { Inject, Injectable } from '@nestjs/common';
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
export class ResetPasswordUseCase {
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

  async execute(resetToken: string, newPassword: string): Promise<void> {
    const payload = this.tokenService.verifyPasswordResetToken(resetToken);

    if (!payload.resetCodeId) {
      throw new Error('Token de recuperação inválido.');
    }

    const shopkeeper = await this.shopkeeperRepository.findByEmail(
      payload.email,
    );

    if (!shopkeeper || !shopkeeper.id) {
      throw new Error('Token de recuperação inválido.');
    }

    if (shopkeeper.id !== payload.sub) {
      throw new Error('Token de recuperação inválido.');
    }

    const resetCode = await this.passwordResetRepository.findById(
      payload.resetCodeId,
    );

    if (!resetCode) {
      throw new Error('Código de recuperação inválido.');
    }

    if (resetCode.shopkeeperId !== shopkeeper.id) {
      throw new Error('Token de recuperação inválido.');
    }

    if (resetCode.usedAt) {
      throw new Error('Código de recuperação já utilizado.');
    }

    if (resetCode.expiresAt < new Date()) {
      throw new Error('Código de recuperação expirado.');
    }

    const passwordHash = await this.hashService.hash(newPassword);

    await this.shopkeeperRepository.updatePassword(shopkeeper.id, passwordHash);

    await this.passwordResetRepository.markAsUsed(resetCode.id);
  }
}
