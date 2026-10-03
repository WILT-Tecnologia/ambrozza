import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth-onboarding/auth.module';

import { PrismaUnitOfWork } from 'src/shared/infrastructure/database/unit-of-work/prisma-unit-of-work';
import { IUnitOfWorkToken } from 'src/shared/infrastructure/database/unit-of-work/unit-of-work.interface';
import { CreateStoreUseCase } from './application/use-cases/create-store.use-case';
import { IStoreRepositoryToken } from './domain/repositories/store.repository.interface';
import { StoreController } from './infrastructure/controllers/create-store.controller';
import { JwtShopkeeperAuthGuard } from './infrastructure/guards/jwt-shopkeeper-auth.guard';
import { PrismaStoreRepository } from './infrastructure/repositories/prisma-store.repository';
@Module({
  imports: [PrismaModule, AuthModule, JwtModule.register({})],
  controllers: [StoreController],
  providers: [
    CreateStoreUseCase,
    JwtShopkeeperAuthGuard,

    {
      provide: IStoreRepositoryToken,
      useClass: PrismaStoreRepository,
    },
    {
      provide: IUnitOfWorkToken,
      useClass: PrismaUnitOfWork,
    },
  ],
})
export class CreatedStoreModule {}
