import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from 'src/prisma/prisma.module';

import { IHashServiceToken } from './domain/providers/interface/hash.service.interface';

import { LoginSuperUserUseCase } from './application/use-cases/login-super-admin.use-case';

import { ITokenServiceToken } from './domain/providers/interface/token.service.interface';
import { ISuperUserRepositoryToken } from './domain/providers/repositories/super-admin.repository.interface';

import { SuperAdminAuthController } from './infrastructure/controllers/super-admin-auth.controller';
import { PrismaSuperUserRepository } from './infrastructure/repositories/prisma-super-admin.repository';

import { Argon2HashService } from '../auth-onboarding/infrastructure/repositories/service/argon2-hash.service';
import { RefreshSuperUserTokenUseCase } from './application/use-cases/refresh-super-admin.use-case';
import { JwtTokenAdapter } from './infrastructure/adapters/jwt-token.adapter';
@Module({
  imports: [
    PrismaModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-admin-key',
      signOptions: { expiresIn: '8h' },
    }),
  ],

  controllers: [SuperAdminAuthController],

  providers: [
    LoginSuperUserUseCase,
    RefreshSuperUserTokenUseCase,

    {
      provide: ISuperUserRepositoryToken,
      useClass: PrismaSuperUserRepository,
    },

    {
      provide: IHashServiceToken,
      useClass: Argon2HashService,
    },

    {
      provide: ITokenServiceToken,
      useClass: JwtTokenAdapter,
    },
  ],
})
export class AdminAuthModule {}
