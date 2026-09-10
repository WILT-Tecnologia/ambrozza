import { forwardRef, Module } from '@nestjs/common';
import { ApprovalModule } from '../approval-superAdmin/approval.module';
import { RegisterShopkeeperUseCase } from './application/use-cases/register-shopkeeper.use-case';
import { IHashServiceToken } from './domain/providers/hash.service.interface';

import { AuthOnboardingController } from './infrastructure/controllers/auth-onboarding.controller';

import { IShopkeeperRepositoryToken } from './domain/providers/repositories/shopkeeper.repository.interface';
import { IUnitOfWorkToken } from './infrastructure/repositories/interface/unit-of-work.interface';
import { PrismaShopkeeperRepository } from './infrastructure/repositories/prisma-shopkeeper.repository';
import { Argon2HashService } from './infrastructure/repositories/service/argon2-hash.service';
import { PrismaUnitOfWork } from './infrastructure/transactions/prisma-unit-of-work';

@Module({
  imports: [forwardRef(() => ApprovalModule)],
  controllers: [AuthOnboardingController],
  providers: [
    RegisterShopkeeperUseCase,
    {
      provide: IShopkeeperRepositoryToken,
      useClass: PrismaShopkeeperRepository,
    },
    {
      provide: IHashServiceToken,
      useClass: Argon2HashService,
    },
    {
      provide: IUnitOfWorkToken,
      useClass: PrismaUnitOfWork,
    },
  ],
  exports: [RegisterShopkeeperUseCase, IShopkeeperRepositoryToken],
})
export class AuthModule {}
