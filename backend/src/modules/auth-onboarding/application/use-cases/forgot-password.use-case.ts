import { Inject, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import {
  IEmailService,
  IEmailServiceToken,
} from '../../domain/providers/interface/email.service.interface';
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
export class ForgotPasswordUseCase {
  constructor(
    @Inject(IShopkeeperRepositoryToken)
    private readonly shopkeeperRepository: IShopkeeperRepository,

    @Inject(IHashServiceToken)
    private readonly hashService: IHashService,

    @Inject(IPasswordResetRepositoryToken)
    private readonly passwordResetRepository: IPasswordResetRepository,

    @Inject(IEmailServiceToken)
    private readonly emailService: IEmailService,
  ) {}

  async execute(email: string): Promise<void> {
    const normalizedEmail = email.trim().toLowerCase();

    const shopkeeper =
      await this.shopkeeperRepository.findByEmail(normalizedEmail);

    if (!shopkeeper) {
      return;
    }

    if (!shopkeeper.id) {
      throw new Error('Shopkeeper sem ID.');
    }

    await this.passwordResetRepository.invalidateByShopkeeperId(shopkeeper.id);

    const code = randomInt(100000, 1000000).toString();

    const codeHash = await this.hashService.hash(code);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.passwordResetRepository.create({
      shopkeeperId: shopkeeper.id,
      codeHash,
      expiresAt,
    });

    await this.emailService.sendPasswordResetCode(normalizedEmail, code);
  }
}
