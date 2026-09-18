import { Injectable } from '@nestjs/common';
import { SuperAdmin as PrismaSuperUserModel } from '@prisma/client';
import { PrismaService } from '../../../../prisma/prisma.service';
import { SuperAdmin } from '../../domain/entities/super-admin.entity';
import { ISuperUserRepository } from '../../domain/providers/repositories/super-admin.repository.interface';

@Injectable()
export class PrismaSuperUserRepository implements ISuperUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<SuperAdmin | null> {
    const record = await this.prisma.superAdmin.findUnique({
      where: { email },
    });

    if (!record) {
      return null;
    }

    return this.mapToDomain(record);
  }

  private mapToDomain(record: PrismaSuperUserModel): SuperAdmin {
    return new SuperAdmin({
      id: record.id,
      email: record.email,
      passwordHash: record.password,
      createdAt: record.createdAt,
    });
  }
}
