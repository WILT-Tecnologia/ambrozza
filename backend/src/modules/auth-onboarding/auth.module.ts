import { forwardRef, Module } from '@nestjs/common';
import { ApprovalModule } from '../approval/approval.module';
import { RegisterAccountUseCase } from './application/use-cases/register-account.use-case';
import { IHashServiceToken } from './domain/providers/hash.service.interface';

import { IAccountRepositoryToken } from './domain/providers/repositories/account.repository.interface';
import { AuthOnboardingController } from './infrastructure/controllers/auth-onboarding.controller';
import { Argon2HashService } from './infrastructure/repositories/argon2-hash.service';
import { PrismaAccountRepository } from './infrastructure/repositories/prisma-account.repository';

@Module({
  imports: [forwardRef(() => ApprovalModule)],
  controllers: [AuthOnboardingController],
  providers: [
    RegisterAccountUseCase,
    {
      provide: IAccountRepositoryToken,
      useClass: PrismaAccountRepository,
    },
    {
      provide: IHashServiceToken,
      useClass: Argon2HashService,
    },
  ],
  exports: [RegisterAccountUseCase, IAccountRepositoryToken],
})
export class AuthModule {}
