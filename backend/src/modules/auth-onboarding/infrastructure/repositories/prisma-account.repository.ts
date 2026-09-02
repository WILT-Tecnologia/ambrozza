import { Injectable } from '@nestjs/common';
import { ApprovalStatus, Account as PrismaAccountModel } from '@prisma/client';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  Account,
  AccountApprovalStatus,
} from '../../domain/entities/account.entity';
import { IAccountRepository } from '../../domain/providers/repositories/account.repository.interface';

@Injectable()
export class PrismaAccountRepository implements IAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Account | null> {
    const record = await this.prisma.account.findUnique({ where: { email } });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  async findById(id: string): Promise<Account | null> {
    const record = await this.prisma.account.findUnique({ where: { id } });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  async create(account: Account): Promise<Account> {
    const record = await this.prisma.account.create({
      data: {
        name: account.name,
        email: account.email,
        password: account.passwordHash,
        approvalStatus: account.approvalStatus as unknown as ApprovalStatus,
      },
    });
    return this.mapToDomain(record);
  }

  async updateApprovalStatus(accountId: string, status: string): Promise<void> {
    await this.prisma.account.update({
      where: { id: accountId },
      data: { approvalStatus: status as unknown as ApprovalStatus },
    });
  }

  async hasStore(accountId: string): Promise<boolean> {
    const store = await this.prisma.store.findUnique({ where: { accountId } });
    return !!store;
  }

  private mapToDomain(record: PrismaAccountModel): Account {
    return new Account({
      id: record.id,
      name: record.name,
      email: record.email,
      passwordHash: record.password,
      approvalStatus: record.approvalStatus as unknown as AccountApprovalStatus,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
