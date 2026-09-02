import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth-onboarding/auth.module';
import { DecideApprovalUseCase } from './application/use-cases/decide-approval.use-case';
import { IApprovalRequestRepositoryToken } from './domain/repositories/approval-request.repository.interface';
import { PrismaApprovalRequestRepository } from './infrastructure/repositories/prisma-approval-request.repository';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [
    DecideApprovalUseCase,
    {
      provide: IApprovalRequestRepositoryToken,
      useClass: PrismaApprovalRequestRepository,
    },
  ],
  exports: [DecideApprovalUseCase, IApprovalRequestRepositoryToken],
})
export class ApprovalModule {}
