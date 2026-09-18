import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../prisma/prisma.service';

import { PrismaApprovalRequestRepository } from 'src/modules/approval-superAdmin/infrastructure/repositories/prisma-administration-request.repository';
import { PrismaShopkeeperRepository } from 'src/modules/auth-onboarding/infrastructure/repositories/prisma-shopkeeper.repository';
import { IUnitOfWork } from './unit-of-work.interface';

@Injectable()
export class PrismaUnitOfWork implements IUnitOfWork {
  constructor(private readonly prisma: PrismaService) {}

  async execute<T>(
    callback: (
      shopkeeperRepository: PrismaShopkeeperRepository,
      approvalRequestRepository: PrismaApprovalRequestRepository,
    ) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      const shopkeeperRepository = new PrismaShopkeeperRepository(tx);

      const approvalRequestRepository = new PrismaApprovalRequestRepository(tx);

      return callback(shopkeeperRepository, approvalRequestRepository);
    });
  }
}
