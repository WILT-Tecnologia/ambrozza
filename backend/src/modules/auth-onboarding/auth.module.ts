import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApprovalModule } from '../approval-superAdmin/approval.module';
import { RegisterShopkeeperUseCase } from './application/use-cases/register-shopkeeper.use-case';
import { IHashServiceToken } from './domain/providers/interface/hash.service.interface';

import { AuthOnboardingController } from './infrastructure/controllers/auth-onboarding.controller';

import { PrismaUnitOfWork } from 'src/shared/infrastructure/database/unit-of-work/prisma-unit-of-work';
import { IUnitOfWorkToken } from 'src/shared/infrastructure/database/unit-of-work/unit-of-work.interface';
import { Argon2HashService } from '../service/argon2-hash.service';
import { ForgotPasswordUseCase } from './application/use-cases/forgot-password.use-case';
import { LoginShopkeeperUseCase } from './application/use-cases/login-shopkeeper.use-case';
import { RefreshShopkeeperTokenUseCase } from './application/use-cases/refresh-shopkeeper-token.use-case';
import { ResendResetCodeUseCase } from './application/use-cases/resend-reset-code.use-case';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.use-case';
import { VerifyResetCodeUseCase } from './application/use-cases/verify-reset-code.use-case';
import { IEmailServiceToken } from './domain/providers/interface/email.service.interface';
import { JwtShopkeeperTokenService } from './domain/providers/interface/jwt-shopkeeper-token.service';
import { ITokenServiceToken } from './domain/providers/interface/token.service.interface';
import { IPasswordResetRepositoryToken } from './domain/providers/repositories/password-reset.repository.interface';
import { IShopkeeperRepositoryToken } from './domain/providers/repositories/shopkeeper.repository.interface';
import { EmailService } from './infrastructure/providers/email.service';
import { PrismaPasswordResetRepository } from './infrastructure/repositories/prisma-password-reset.repository';
import { PrismaShopkeeperRepository } from './infrastructure/repositories/prisma-shopkeeper.repository';
@Module({
  imports: [forwardRef(() => ApprovalModule), JwtModule.register({})],
  controllers: [AuthOnboardingController],
  providers: [
    RegisterShopkeeperUseCase,
    LoginShopkeeperUseCase,
    RefreshShopkeeperTokenUseCase,
    ForgotPasswordUseCase,
    ResendResetCodeUseCase,
    ResetPasswordUseCase,
    VerifyResetCodeUseCase,
    {
      provide: IShopkeeperRepositoryToken,
      useClass: PrismaShopkeeperRepository,
    },
    {
      provide: IHashServiceToken,
      useClass: Argon2HashService,
    },
    {
      provide: ITokenServiceToken,
      useClass: JwtShopkeeperTokenService,
    },
    {
      provide: IUnitOfWorkToken,
      useClass: PrismaUnitOfWork,
    },
    {
      provide: IPasswordResetRepositoryToken,
      useClass: PrismaPasswordResetRepository,
    },
    {
      provide: IEmailServiceToken,
      useClass: EmailService,
    },
  ],
  exports: [RegisterShopkeeperUseCase, IShopkeeperRepositoryToken],
})
export class AuthModule {}
