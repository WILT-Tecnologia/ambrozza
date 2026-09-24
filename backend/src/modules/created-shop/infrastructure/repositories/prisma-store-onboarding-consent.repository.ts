import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { IStoreOnboardingConsentRepository } from '../../domain/repositories/store-onboarding-consent.repository.interface';

@Injectable()
export class PrismaStoreOnboardingConsentRepository implements IStoreOnboardingConsentRepository {
  constructor(
    private readonly prisma: PrismaService | Prisma.TransactionClient,
  ) {}

  async create(data: {
    shopkeeperId: string;
    termsAccepted: boolean;
    privacyAccepted: boolean;
  }): Promise<void> {
    await this.prisma.storeOnboardingConsent.create({
      data: {
        shopkeeperId: data.shopkeeperId,
        termsAccepted: data.termsAccepted,
        privacyAccepted: data.privacyAccepted,
      },
    });
  }
}
