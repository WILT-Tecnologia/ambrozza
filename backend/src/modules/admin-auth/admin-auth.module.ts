import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

import { IHashServiceToken } from './domain/providers/interface/hash.service.interface';
import { ITokenServiceToken } from './domain/providers/interface/token.service.interface';
import { ISuperUserRepositoryToken } from './domain/providers/repositories/super-admin.repository.interface';

import { LoginSuperUserUseCase } from './application/use-cases/login-super-admin.use-case';
import { RefreshSuperUserTokenUseCase } from './application/use-cases/refresh-super-admin.use-case';

import { Argon2HashService } from '../service/argon2-hash.service';
import { JwtTokenAdapter } from './infrastructure/adapters/jwt-token.adapter';
import { SuperAdminAuthController } from './infrastructure/controllers/super-admin-auth.controller';
import { PrismaSuperUserRepository } from './infrastructure/repositories/prisma-super-admin.repository';

@Module({
  imports: [
    PrismaModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-admin-key',
      signOptions: {
        expiresIn: '15m',
      },
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

  exports: [JwtModule],
})
export class AdminAuthModule {}
