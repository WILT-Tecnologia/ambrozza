import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  ApprovalStatus,
  Prisma,
  Shopkeeper as PrismaShopkeeperModel,
} from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import {
  Shopkeeper,
  ShopkeeperApprovalStatus,
} from '../../domain/entities/shopkeeper.entity';
import { IShopkeeperRepository } from '../../domain/providers/repositories/shopkeeper.repository.interface';

@Injectable()
export class PrismaShopkeeperRepository implements IShopkeeperRepository {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService | Prisma.TransactionClient,
  ) {}

  async findByEmail(email: string): Promise<Shopkeeper | null> {
    const record = await this.prisma.shopkeeper.findUnique({
      where: { email },
    });

    if (!record) return null;

    return this.mapToDomain(record);
  }

  async findById(id: string): Promise<Shopkeeper | null> {
    const record = await this.prisma.shopkeeper.findUnique({
      where: { id },
    });

    if (!record) return null;

    return this.mapToDomain(record);
  }

  async create(shopkeeper: Shopkeeper): Promise<Shopkeeper> {
    try {
      const record = await this.prisma.shopkeeper.create({
        data: {
          name: shopkeeper.name,
          email: shopkeeper.email,
          password: shopkeeper.passwordHash,
          approvalStatus:
            shopkeeper.approvalStatus as unknown as ApprovalStatus,
        },
      });

      return this.mapToDomain(record);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Ops! Esse endereço de e-mail já tem uma solicitação de cadastro.',
        );
      }

      throw error;
    }
  }

  async updateApprovalStatus(
    shopkeeperId: string,
    status: string,
  ): Promise<void> {
    await this.prisma.shopkeeper.update({
      where: { id: shopkeeperId },
      data: {
        approvalStatus: status as unknown as ApprovalStatus,
      },
    });
  }

  async hasStore(shopkeeperId: string): Promise<boolean> {
    const store = await this.prisma.store.findUnique({
      where: { shopkeeperId },
    });

    return !!store;
  }

  private mapToDomain(record: PrismaShopkeeperModel): Shopkeeper {
    return new Shopkeeper({
      id: record.id,
      name: record.name,
      email: record.email,
      passwordHash: record.password,
      approvalStatus:
        record.approvalStatus as unknown as ShopkeeperApprovalStatus,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
