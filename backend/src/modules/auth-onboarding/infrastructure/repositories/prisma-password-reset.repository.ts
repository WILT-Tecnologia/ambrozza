import { Injectable } from '@nestjs/common';
import { PasswordResetCode } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPasswordResetRepository } from '../../domain/providers/repositories/password-reset.repository.interface';

@Injectable()
export class PrismaPasswordResetRepository implements IPasswordResetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async invalidateByShopkeeperId(shopkeeperId: string): Promise<void> {
    await this.prisma.passwordResetCode.updateMany({
      where: {
        shopkeeperId,
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    });
  }

  async create(data: {
    shopkeeperId: string;
    codeHash: string;
    expiresAt: Date;
  }): Promise<PasswordResetCode> {
    return this.prisma.passwordResetCode.create({
      data,
    });
  }

  async findLatestByShopkeeperId(
    shopkeeperId: string,
  ): Promise<PasswordResetCode | null> {
    return this.prisma.passwordResetCode.findFirst({
      where: {
        shopkeeperId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markAsUsed(id: string): Promise<void> {
    await this.prisma.passwordResetCode.update({
      where: {
        id,
      },
      data: {
        usedAt: new Date(),
      },
    });
  }
}
