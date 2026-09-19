import { PasswordResetCode } from '@prisma/client';

export const IPasswordResetRepositoryToken = Symbol('IPasswordResetRepository');

export interface IPasswordResetRepository {
  invalidateByShopkeeperId(shopkeeperId: string): Promise<void>;

  create(data: {
    shopkeeperId: string;
    codeHash: string;
    expiresAt: Date;
  }): Promise<PasswordResetCode>;

  findLatestByShopkeeperId(
    shopkeeperId: string,
  ): Promise<PasswordResetCode | null>;

  markAsUsed(id: string): Promise<void>;
}
