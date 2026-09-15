import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth-onboarding/auth.module';

import { DecideApprovalUseCase } from './application/use-cases/decide-approval.use-case';

import { IApprovalRequestRepositoryToken } from './domain/repositories/approval-request.repository.interface';

import { PrismaApprovalRequestRepository } from './infrastructure/repositories/prisma-administration-request.repository';

import { PrismaUnitOfWork } from 'src/shared/infrastructure/database/unit-of-work/prisma-unit-of-work';
import { IUnitOfWorkToken } from 'src/shared/infrastructure/database/unit-of-work/unit-of-work.interface';
import { GetPendingApprovalsUseCase } from './application/use-cases/get-pending-approvals.use-case';
import { ApprovalController } from './infrastructure/controller/approval-superAdmin.controller';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [ApprovalController],
  providers: [
    DecideApprovalUseCase,
    GetPendingApprovalsUseCase,
    {
      provide: IApprovalRequestRepositoryToken,
      useClass: PrismaApprovalRequestRepository,
    },

    {
      provide: IUnitOfWorkToken,
      useClass: PrismaUnitOfWork,
    },
  ],

  exports: [DecideApprovalUseCase, IApprovalRequestRepositoryToken],
})
export class ApprovalModule {}
