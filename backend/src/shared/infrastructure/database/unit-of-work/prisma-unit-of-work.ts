import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../prisma/prisma.service';

import { PrismaApprovalRequestRepository } from 'src/modules/approval-superAdmin/infrastructure/repositories/prisma-administration-request.repository';
import { PrismaShopkeeperRepository } from 'src/modules/auth-onboarding/infrastructure/repositories/prisma-shopkeeper.repository';
import { PrismaStoreOnboardingConsentRepository } from 'src/modules/created-shop/infrastructure/repositories/prisma-store-onboarding-consent.repository';
import { PrismaStoreRepository } from 'src/modules/created-shop/infrastructure/repositories/prisma-store.repository';
import { IUnitOfWork } from './unit-of-work.interface';

@Injectable()
export class PrismaUnitOfWork implements IUnitOfWork {
  constructor(private readonly prisma: PrismaService) {}

  async execute<T>(
    callback: (
      shopkeeperRepository: PrismaShopkeeperRepository,
      approvalRequestRepository: PrismaApprovalRequestRepository,
      storeRepository: PrismaStoreRepository,
      storeOnboardingConsentRepository: PrismaStoreOnboardingConsentRepository,
    ) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      const shopkeeperRepository = new PrismaShopkeeperRepository(tx);
      const approvalRequestRepository = new PrismaApprovalRequestRepository(tx);
      const storeRepository = new PrismaStoreRepository(tx);
      const storeOnboardingConsentRepository =
        new PrismaStoreOnboardingConsentRepository(tx);

      return callback(
        shopkeeperRepository,
        approvalRequestRepository,
        storeRepository,
        storeOnboardingConsentRepository,
      );
    });
  }
}
